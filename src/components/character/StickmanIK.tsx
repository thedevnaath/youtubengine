import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export type StickmanAction =
    | 'idle'
    | 'walk'
    | 'run'
    | 'walk-sad'
    | 'think'
    | 'idea'
    | 'explain'
    | 'wave'
    | 'shrug'
    | 'stressed'
    | 'slump'
    | 'sit'
    | 'work'
    | 'push'
    | 'lift'
    | 'celebrate'
    | 'sleep';

export interface StickmanProps {
    /** World X coordinate (horizontal center of character's feet) */
    x?: number;
    /** World Y coordinate (ground contact level for feet) */
    y?: number;
    /** Uniform scale multiplier (default 1 = ~280px tall) */
    scale?: number;
    /** false = facing right (default), true = facing left */
    flipX?: boolean;
    /** Base animation action from the reusable library */
    action?: StickmanAction;
    /** Dynamic Modifier 1: Smoothly aim primary arm (and gaze) at world coordinates {x, y} */
    pointAt?: { x: number; y: number } | null;
    /** Dynamic Modifier 2: Smoothly aim secondary arm at world coordinates {x, y} */
    secondaryPointAt?: { x: number; y: number } | null;
    /** Dynamic Modifier 3: Aim head tilt & black circular eyes at world coordinates {x, y} */
    lookAt?: { x: number; y: number } | null;
    /** Dynamic Modifier 4: Playback speed multiplier (default 1.0) */
    speed?: number;
    /** Dynamic Modifier 5: Gesture & bounce amplitude multiplier (default 1.0) */
    intensity?: number;
    /** Dynamic Modifier 6: Additional torso lean offset (-25 to +25) */
    lean?: number;
    /** Flat matte color (default Tangerine Orange #FF6B00) */
    color?: string;
}

/**
 * Pure 2-Bone Analytic Inverse Kinematics Solver (Law of Cosines)
 * Guarantees limbs never stretch, shrink, detach, or produce NaN coordinates.
 */
function solveTwoBoneIK(
    rootX: number,
    rootY: number,
    targetX: number,
    targetY: number,
    len1: number,
    len2: number,
    bendDirection: 1 | -1
): { midX: number; midY: number; endX: number; endY: number } {
    const dx = (Number.isFinite(targetX) ? targetX : rootX) - rootX;
    const dy = (Number.isFinite(targetY) ? targetY : rootY + len1) - rootY;
    const rawDist = Math.hypot(dx, dy);

    const maxReach = len1 + len2 - 0.05;
    const minReach = Math.abs(len1 - len2) + 0.05;
    const dist = Math.max(minReach, Math.min(maxReach, rawDist));

    const baseAngle = Math.atan2(dy, dx);
    const cosAngle1 =
        (len1 * len1 + dist * dist - len2 * len2) / (2 * len1 * dist);
    const clampedCos = Math.max(-1, Math.min(1, cosAngle1));
    const angle1 = baseAngle + bendDirection * Math.acos(clampedCos);

    const midX = rootX + Math.cos(angle1) * len1;
    const midY = rootY + Math.sin(angle1) * len1;

    const safeRaw = rawDist > 0.0001 ? rawDist : 1;
    const endX = rootX + (dx / safeRaw) * dist;
    const endY = rootY + (dy / safeRaw) * dist;

    return { midX, midY, endX, endY };
}

/**
 * 8-Keyframe Biomechanical Walk Cycle Table
 */
const WALK_CYCLE_FRAMES = [
    { footX: 36, footY: 0, hipBob: 2 },
    { footX: 18, footY: 0, hipBob: 6 },
    { footX: 0, footY: 0, hipBob: 2 },
    { footX: -20, footY: -3, hipBob: -3 },
    { footX: -36, footY: -14, hipBob: 1 },
    { footX: -10, footY: -26, hipBob: 6 },
    { footX: 18, footY: -16, hipBob: 2 },
    { footX: 32, footY: -4, hipBob: -2 },
];

/**
 * 8-Keyframe Energetic Run / Jog Cycle Table
 */
const RUN_CYCLE_FRAMES = [
    { footX: 46, footY: -2, hipBob: 4 },
    { footX: 20, footY: 0, hipBob: 10 },
    { footX: -8, footY: 0, hipBob: 2 },
    { footX: -38, footY: -10, hipBob: -8 },
    { footX: -48, footY: -28, hipBob: -4 },
    { footX: -14, footY: -38, hipBob: 6 },
    { footX: 24, footY: -24, hipBob: 4 },
    { footX: 42, footY: -8, hipBob: -4 },
];

function sampleCycle(
    table: typeof WALK_CYCLE_FRAMES,
    phase: number,
    amp: number
) {
    const norm = ((phase % 1) + 1) % 1;
    const scaled = norm * table.length;
    const i0 = Math.floor(scaled) % table.length;
    const i1 = (i0 + 1) % table.length;
    const frac = scaled - Math.floor(scaled);
    // Cosine ease between keyframes so motion is never robotic or linear
    const smoothT = (1 - Math.cos(frac * Math.PI)) / 2;

    const a = table[i0];
    const b = table[i1];
    return {
        footX: (a.footX + (b.footX - a.footX) * smoothT) * amp,
        footY: (a.footY + (b.footY - a.footY) * smoothT) * amp,
        hipBob: (a.hipBob + (b.hipBob - a.hipBob) * smoothT) * amp,
    };
}

export const StickmanIK: React.FC<StickmanProps> = ({
    x = 960,
    y = 820,
    scale = 1,
    flipX = false,
    action = 'idle',
    pointAt = null,
    secondaryPointAt = null,
    lookAt = null,
    speed = 1,
    intensity = 1,
    lean = 0,
    color = '#FF6B00',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const t = (frame / fps) * speed;

    // Fixed Cartoon Proportions
    const THIGH = 58;
    const SHIN = 58;
    const TORSO = 88;
    const NECK = 16;
    const UPPER_ARM = 46;
    const FOREARM = 44;
    const HEAD_RADIUS = 27;
    const LIMB_STROKE = 14;
    const TORSO_STROKE = 18; // Slightly wider so limb roots vanish completely inside torso

    const dir = flipX ? -1 : 1;
    const amp = Math.max(0.2, Math.min(2.0, intensity));

    // Local Rig State (Relative to ground origin 0,0)
    let pelvisX = 0;
    let pelvisY = -(THIGH + SHIN) + 6;
    let spineLean = lean * dir;
    let spineCurve = 0;
    let headTiltX = 0;
    let headTiltY = 0;
    let bodyRotationDeg = 0; // Used for horizontal actions like 'sleep'

    let leftFootTarget = { x: -16 * dir, y: 0 };
    let rightFootTarget = { x: 18 * dir, y: 0 };
    // Hand targets are relative to the SHOULDER origin (shoulderX, shoulderY)
    let leftHandRel = { x: -22 * dir, y: 66 };
    let rightHandRel = { x: 24 * dir, y: 66 };

    // =========================================================================
    // 1. REUSABLE ACTION VOCABULARY
    // =========================================================================
    switch (action) {
        case 'walk': {
            const cycleHz = 1.25;
            const phaseR = t * cycleHz;
            const phaseL = phaseR + 0.5;
            const rStep = sampleCycle(WALK_CYCLE_FRAMES, phaseR, amp);
            const lStep = sampleCycle(WALK_CYCLE_FRAMES, phaseL, amp);

            pelvisY = -(THIGH + SHIN) + 8 + rStep.hipBob;
            spineLean += dir * 6;
            rightFootTarget = { x: rStep.footX * dir, y: rStep.footY };
            leftFootTarget = { x: lStep.footX * dir, y: lStep.footY };

            const swing = Math.sin(phaseR * Math.PI * 2) * amp;
            rightHandRel = { x: -swing * 32 * dir, y: 58 - Math.abs(swing) * 10 };
            leftHandRel = { x: swing * 32 * dir, y: 58 - Math.abs(swing) * 10 };
            break;
        }

        case 'run': {
            const cycleHz = 1.95;
            const phaseR = t * cycleHz;
            const phaseL = phaseR + 0.5;
            const rStep = sampleCycle(RUN_CYCLE_FRAMES, phaseR, amp);
            const lStep = sampleCycle(RUN_CYCLE_FRAMES, phaseL, amp);

            pelvisY = -(THIGH + SHIN) + 12 + rStep.hipBob;
            spineLean += dir * 14;
            rightFootTarget = { x: rStep.footX * dir, y: rStep.footY };
            leftFootTarget = { x: lStep.footX * dir, y: lStep.footY };

            const swing = Math.sin(phaseR * Math.PI * 2) * amp;
            rightHandRel = { x: (10 - swing * 38) * dir, y: 34 - Math.abs(swing) * 14 };
            leftHandRel = { x: (10 + swing * 38) * dir, y: 34 - Math.abs(swing) * 14 };
            break;
        }

        case 'walk-sad': {
            const cycleHz = 0.8;
            const phaseR = t * cycleHz;
            const phaseL = phaseR + 0.5;
            const rStep = sampleCycle(WALK_CYCLE_FRAMES, phaseR, 0.65 * amp);
            const lStep = sampleCycle(WALK_CYCLE_FRAMES, phaseL, 0.65 * amp);

            pelvisY = -(THIGH + SHIN) + 12 + rStep.hipBob * 0.5;
            spineLean += dir * 16;
            spineCurve = -12 * dir; // Forward hunched back
            headTiltX = dir * 8;
            headTiltY = 10; // Head drooping down

            rightFootTarget = { x: rStep.footX * dir, y: Math.min(0, rStep.footY * 0.6) };
            leftFootTarget = { x: lStep.footX * dir, y: Math.min(0, lStep.footY * 0.6) };

            const sway = Math.sin(phaseR * Math.PI * 2) * 8;
            rightHandRel = { x: (12 + sway) * dir, y: 74 };
            leftHandRel = { x: (6 - sway) * dir, y: 74 };
            break;
        }

        case 'think': {
            const breathe = Math.sin(t * 2.2) * 2.5 * amp;
            pelvisY = -(THIGH + SHIN) + 5 + breathe;
            spineLean += dir * 3;
            headTiltX = dir * 4;
            headTiltY = -2;
            // Right hand raised thoughtfully to chin, left hand on hip
            rightHandRel = { x: 22 * dir, y: -14 + Math.sin(t * 3) * 2 };
            leftHandRel = { x: -24 * dir, y: 48 };
            break;
        }

        case 'idea': {
            const pop = Math.sin(t * 5) * 4 * amp;
            pelvisY = -(THIGH + SHIN) + 4 - Math.abs(pop);
            spineLean += dir * 2;
            headTiltY = -4;
            // Primary hand raised high near head ("Eureka!"), secondary hand at waist
            rightHandRel = { x: 34 * dir, y: -48 + pop };
            leftHandRel = { x: -24 * dir, y: 52 };
            break;
        }

        case 'explain': {
            const breathe = Math.sin(t * 2.6) * 2.5;
            const gestureA = Math.sin(t * 4.2) * 14 * amp;
            const gestureB = Math.cos(t * 3.5) * 10 * amp;
            pelvisY = -(THIGH + SHIN) + 5 + breathe;
            spineLean += dir * 4;
            rightHandRel = { x: (48 + gestureA) * dir, y: 18 + gestureB };
            leftHandRel = { x: (-18 + gestureB * 0.6) * dir, y: 36 - gestureA * 0.4 };
            break;
        }

        case 'wave': {
            const breathe = Math.sin(t * 2.5) * 2.5;
            const waveArc = Math.sin(t * 9) * 18 * amp;
            pelvisY = -(THIGH + SHIN) + 5 + breathe;
            rightHandRel = { x: (42 + waveArc) * dir, y: -46 };
            leftHandRel = { x: -22 * dir, y: 64 };
            break;
        }

        case 'shrug': {
            const lift = (Math.sin(t * 3.2) * 0.5 + 0.5) * amp;
            pelvisY = -(THIGH + SHIN) + 6 - lift * 3;
            headTiltX = -dir * 4 * lift;
            headTiltY = 3 * lift;
            // Both forearms raised outward to the sides
            rightHandRel = { x: (52 + lift * 8) * dir, y: 12 - lift * 14 };
            leftHandRel = { x: -(52 + lift * 8) * dir, y: 12 - lift * 14 };
            break;
        }

        case 'stressed': {
            const shake = Math.sin(t * 18) * 2.5 * amp;
            pelvisY = -(THIGH + SHIN) + 14;
            spineLean += dir * 8;
            spineCurve = -8 * dir;
            headTiltY = 6;
            // Both hands clutching the sides of the head
            rightHandRel = { x: (18 + shake) * dir, y: -22 };
            leftHandRel = { x: (-16 - shake) * dir, y: -22 };
            break;
        }

        case 'slump': {
            const heavyBreathe = Math.sin(t * 1.8) * 3 * amp;
            pelvisY = -(THIGH + SHIN) + 14 + heavyBreathe;
            spineLean += dir * 18;
            spineCurve = -14 * dir;
            headTiltX = dir * 10;
            headTiltY = 12;
            rightHandRel = { x: 14 * dir, y: 76 + heavyBreathe };
            leftHandRel = { x: 4 * dir, y: 76 + heavyBreathe };
            break;
        }

        case 'sit': {
            const breathe = Math.sin(t * 2.2) * 2;
            pelvisX = -14 * dir;
            pelvisY = -58;
            spineLean += dir * 3;
            rightFootTarget = { x: 36 * dir, y: 0 };
            leftFootTarget = { x: 44 * dir, y: 0 };
            rightHandRel = { x: 26 * dir, y: 48 + breathe };
            leftHandRel = { x: 18 * dir, y: 50 + breathe };
            break;
        }

        case 'work': {
            const typeA = Math.sin(t * 15) * 4 * amp;
            const typeB = Math.cos(t * 15) * 4 * amp;
            pelvisX = -14 * dir;
            pelvisY = -58;
            spineLean += dir * 6;
            headTiltY = 3;
            rightFootTarget = { x: 36 * dir, y: 0 };
            leftFootTarget = { x: 44 * dir, y: 0 };
            rightHandRel = { x: 48 * dir, y: 38 + typeA };
            leftHandRel = { x: 40 * dir, y: 42 + typeB };
            break;
        }

        case 'push': {
            const strain = Math.sin(t * 6) * 3 * amp;
            pelvisY = -(THIGH + SHIN) + 18;
            spineLean += dir * (24 + strain);
            rightFootTarget = { x: 34 * dir, y: 0 };
            leftFootTarget = { x: -42 * dir, y: 0 };
            rightHandRel = { x: (58 + strain) * dir, y: 14 };
            leftHandRel = { x: (52 + strain) * dir, y: 20 };
            break;
        }

        case 'lift': {
            // Smooth rhythmic lifting/curling cycle
            const curl = (Math.sin(t * 3.5) * 0.5 + 0.5) * amp;
            pelvisY = -(THIGH + SHIN) + 12 - curl * 6;
            spineLean += dir * (4 - curl * 6);
            rightFootTarget = { x: 24 * dir, y: 0 };
            leftFootTarget = { x: -24 * dir, y: 0 };
            rightHandRel = { x: 38 * dir, y: 52 - curl * 62 };
            leftHandRel = { x: -30 * dir, y: 52 - curl * 62 };
            break;
        }

        case 'celebrate': {
            const bounce = Math.abs(Math.sin(t * 7)) * -16 * amp;
            const wave = Math.sin(t * 7) * 12 * amp;
            pelvisY = -(THIGH + SHIN) + 4 + bounce;
            rightFootTarget = { x: 22 * dir, y: bounce * 0.35 };
            leftFootTarget = { x: -22 * dir, y: bounce * 0.35 };
            rightHandRel = { x: 48 + wave, y: -56 };
            leftHandRel = { x: -48 - wave, y: -56 };
            break;
        }

        case 'sleep': {
            // Character lies horizontally on the ground plane with slow chest breathing
            const slowBreathe = Math.sin(t * 1.6) * 3 * amp;
            bodyRotationDeg = dir === 1 ? -90 : 90;
            pelvisX = 0;
            pelvisY = -(THIGH + SHIN) + 6;
            spineCurve = slowBreathe;
            rightFootTarget = { x: 10 * dir, y: 0 };
            leftFootTarget = { x: -8 * dir, y: 0 };
            rightHandRel = { x: 18 * dir, y: 28 + slowBreathe };
            leftHandRel = { x: -12 * dir, y: 34 };
            break;
        }

        case 'idle':
        default: {
            const breathe = Math.sin(t * 2.4) * 3 * amp;
            const sway = Math.cos(t * 1.8) * 3 * amp;
            pelvisY = -(THIGH + SHIN) + 5 + breathe;
            rightHandRel = { x: (22 + sway) * dir, y: 64 + breathe * 0.5 };
            leftHandRel = { x: (-20 - sway) * dir, y: 64 + breathe * 0.5 };
            break;
        }
    }

    // =========================================================================
    // 2. COMPUTE EXACT SHOULDER, NECK & HEAD COORDINATES
    // =========================================================================
    const shoulderX = pelvisX + spineLean;
    const shoulderY = pelvisY - TORSO;

    // Dynamic gaze target (lookAt takes priority, otherwise pointAt)
    const activeGazeTarget = lookAt || pointAt;
    if (activeGazeTarget && action !== 'sleep') {
        const worldHeadX = x + (shoulderX + spineLean * 0.2) * scale;
        const worldHeadY = y + (shoulderY - NECK - HEAD_RADIUS) * scale;
        const gazeDx = activeGazeTarget.x - worldHeadX;
        const gazeDy = activeGazeTarget.y - worldHeadY;
        const gazeDist = Math.hypot(gazeDx, gazeDy) || 1;
        headTiltX += (gazeDx / gazeDist) * 6;
        headTiltY += (gazeDy / gazeDist) * 5;
    }

    const headX = shoulderX + spineLean * 0.22 + headTiltX;
    const headY = shoulderY - NECK - HEAD_RADIUS + headTiltY;

    // =========================================================================
    // 3. APPLY DYNAMIC ARM MODIFIERS (pointAt & secondaryPointAt)
    // =========================================================================
    let rightHandTargetX = shoulderX + rightHandRel.x;
    let rightHandTargetY = shoulderY + rightHandRel.y;

    let leftHandTargetX = shoulderX + leftHandRel.x;
    let leftHandTargetY = shoulderY + leftHandRel.y;

    if (pointAt && action !== 'sleep') {
        rightHandTargetX = (pointAt.x - x) / scale;
        rightHandTargetY = (pointAt.y - y) / scale;
    }

    if (secondaryPointAt && action !== 'sleep') {
        leftHandTargetX = (secondaryPointAt.x - x) / scale;
        leftHandTargetY = (secondaryPointAt.y - y) / scale;
    }

    // =========================================================================
    // 4. SOLVE 2-BONE INVERSE KINEMATICS FROM EXACT TORSO ENDPOINTS
    // =========================================================================
    const kneeBendDir = (dir === 1 ? -1 : 1) as 1 | -1;
    const leftLeg = solveTwoBoneIK(
        pelvisX,
        pelvisY,
        leftFootTarget.x,
        leftFootTarget.y,
        THIGH,
        SHIN,
        kneeBendDir
    );
    const rightLeg = solveTwoBoneIK(
        pelvisX,
        pelvisY,
        rightFootTarget.x,
        rightFootTarget.y,
        THIGH,
        SHIN,
        kneeBendDir
    );

    const elbowBendDir = (dir === 1 ? 1 : -1) as 1 | -1;
    const leftArm = solveTwoBoneIK(
        shoulderX,
        shoulderY, // Exact shoulder vertex so root cap is 100% enclosed inside torso
        leftHandTargetX,
        leftHandTargetY,
        UPPER_ARM,
        FOREARM,
        elbowBendDir
    );
    const rightArm = solveTwoBoneIK(
        shoulderX,
        shoulderY, // Exact shoulder vertex so root cap is 100% enclosed inside torso
        rightHandTargetX,
        rightHandTargetY,
        UPPER_ARM,
        FOREARM,
        elbowBendDir
    );

    const spineCtrlX = (pelvisX + shoulderX) / 2 + spineCurve - spineLean * 0.18;
    const spineCtrlY = (pelvisY + shoulderY) / 2;

    // =========================================================================
    // 5. COMPUTE TWO BLACK CIRCULAR EYES POSITION ON HEAD
    // =========================================================================
    // Positioned in expressive 3/4 view toward facing direction + subtle gaze shift
    let eyeShiftX = dir * 6;
    let eyeShiftY = -2;

    if (activeGazeTarget && action !== 'sleep') {
        const worldHeadX = x + headX * scale;
        const worldHeadY = y + headY * scale;
        const gDx = activeGazeTarget.x - worldHeadX;
        const gDy = activeGazeTarget.y - worldHeadY;
        const gDist = Math.hypot(gDx, gDy) || 1;
        eyeShiftX = (gDx / gDist) * 7;
        eyeShiftY = (gDy / gDist) * 5;
    }

    const eyeSpacing = 5.5;
    const leftEyeX = headX + eyeShiftX - eyeSpacing;
    const rightEyeX = headX + eyeShiftX + eyeSpacing;
    const eyesY = headY + eyeShiftY;
    const EYE_RADIUS = 3.6;

    // Pivot around pelvis when lying horizontally for 'sleep'
    const rotationTransform =
        bodyRotationDeg !== 0
            ? `translate(0, -22) rotate(${bodyRotationDeg}, ${pelvisX}, ${pelvisY})`
            : '';

    return (
        <g transform={`translate(${x}, ${y}) scale(${scale}) ${rotationTransform}`}>
            {/* UNIFIED TANGERINE BODY SILHOUETTE — Zero seams, zero robot joints */}
            <g
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Back Leg & Back Arm (originating at exact pelvis/shoulder vertices) */}
                <path
                    d={`M ${pelvisX} ${pelvisY} L ${leftLeg.midX} ${leftLeg.midY} L ${leftLeg.endX} ${leftLeg.endY}`}
                    strokeWidth={LIMB_STROKE}
                />
                <path
                    d={`M ${shoulderX} ${shoulderY} L ${leftArm.midX} ${leftArm.midY} L ${leftArm.endX} ${leftArm.endY}`}
                    strokeWidth={LIMB_STROKE}
                />

                {/* Continuous Neck & Torso Spine (wider stroke encloses all limb origins) */}
                <path
                    d={`M ${headX} ${headY} L ${shoulderX} ${shoulderY}`}
                    strokeWidth={LIMB_STROKE}
                />
                <path
                    d={`M ${shoulderX} ${shoulderY} Q ${spineCtrlX} ${spineCtrlY} ${pelvisX} ${pelvisY}`}
                    strokeWidth={TORSO_STROKE}
                />

                {/* Front Leg & Front Arm (originating at exact pelvis/shoulder vertices) */}
                <path
                    d={`M ${pelvisX} ${pelvisY} L ${rightLeg.midX} ${rightLeg.midY} L ${rightLeg.endX} ${rightLeg.endY}`}
                    strokeWidth={LIMB_STROKE}
                />
                <path
                    d={`M ${shoulderX} ${shoulderY} L ${rightArm.midX} ${rightArm.midY} L ${rightArm.endX} ${rightArm.endY}`}
                    strokeWidth={LIMB_STROKE}
                />
            </g>

            {/* Solid Matte Tangerine Head */}
            <circle cx={headX} cy={headY} r={HEAD_RADIUS} fill={color} />

            {/* Two Circular Black Eyes */}
            <circle cx={leftEyeX} cy={eyesY} r={EYE_RADIUS} fill="#000000" />
            <circle cx={rightEyeX} cy={eyesY} r={EYE_RADIUS} fill="#000000" />
        </g>
    );
};