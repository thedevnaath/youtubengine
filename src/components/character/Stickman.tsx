import React from 'react';

export type StickmanPose =
  | 'idle'
  | 'walk'
  | 'point'
  | 'sit'
  | 'slump'
  | 'push'
  | 'lift'
  | 'celebrate'
  | 'shrug'
  | 'hammer'
  | 'toss_turn';

export interface StickmanProps {
  pose?: StickmanPose;
  color?: string;
  strokeWidth?: number;
  scale?: number;
  flip?: boolean;
  frame?: number;
  walkProgress?: number; // 0 to 1 cycle
  pointTarget?: { x: number; y: number }; // screen coordinates or relative
  headTilt?: number; // degrees
  leanAngle?: number; // degrees
  style?: React.CSSProperties;
  className?: string;
}

export const Stickman: React.FC<StickmanProps> = ({
  pose = 'idle',
  color = '#FF6B00',
  strokeWidth = 34,
  scale = 1,
  flip = false,
  frame = 0,
  walkProgress,
  pointTarget,
  headTilt = 0,
  leanAngle = 0,
  style = {},
  className,
}) => {
  // Proportions matching the reference image:
  // Total height: ~380px in local coordinates
  // Head: radius 46 (diameter 92)
  // Stroke: 34px (chunky, bold, cartoon-grade)
  const headRadius = 46;

  // Base anchor in local coordinates:
  // Pelvis is at (150, 220)
  // Head center is at (150, 60)
  // Feet ground level is at Y = 370
  let pelvisX = 150;
  let pelvisY = 220;
  let neckX = 150;
  let neckY = 115;
  let headX = 150;
  let headY = 60;
  let spineCtrlX = 150;
  let spineCtrlY = 168;

  // Limbs default (idle)
  // Left Arm (behind)
  let lShoulderX = 150;
  let lShoulderY = 125;
  let lElbowX = 115;
  let lElbowY = 180;
  let lHandX = 100;
  let lHandY = 230;

  // Right Arm (front)
  let rShoulderX = 150;
  let rShoulderY = 125;
  let rElbowX = 185;
  let rElbowY = 180;
  let rHandX = 200;
  let rHandY = 230;

  // Left Leg
  let lHipX = 145;
  let lHipY = 220;
  let lKneeX = 135;
  let lKneeY = 295;
  let lFootX = 125;
  let lFootY = 370;

  // Right Leg
  let rHipX = 155;
  let rHipY = 220;
  let rKneeX = 165;
  let rKneeY = 295;
  let rFootX = 175;
  let rFootY = 370;

  // Subtle breathing oscillation
  const breath = Math.sin((frame * 2 * Math.PI) / 45) * 2;

  // Apply Poses
  switch (pose) {
    case 'walk': {
      // Natural, brisk cartoon walk cycle (16 frames per complete double-step)
      const cycle = (frame * 2 * Math.PI) / 16;
      const stride = Math.sin(cycle);
      const verticalBob = -Math.abs(Math.sin(cycle)) * 14;

      pelvisY += verticalBob;
      neckY += verticalBob;
      headY += verticalBob;
      spineCtrlY += verticalBob;

      // Arms swing in opposite phase with clear bent elbows
      lShoulderY += verticalBob;
      rShoulderY += verticalBob;

      lElbowX = 150 - stride * 45;
      lElbowY = 175 + verticalBob + (stride > 0 ? -12 : 10);
      lHandX = 150 - stride * 75;
      lHandY = 220 + verticalBob + (stride > 0 ? -22 : 15);

      rElbowX = 150 + stride * 45;
      rElbowY = 175 + verticalBob + (stride < 0 ? -12 : 10);
      rHandX = 150 + stride * 75;
      rHandY = 220 + verticalBob + (stride < 0 ? -22 : 15);

      // Leg stride kinematics: wide, athletic cartoon stride
      const lStride = Math.sin(cycle);
      const rStride = Math.sin(cycle + Math.PI);

      // Left leg
      lKneeX = 145 + lStride * 46;
      lKneeY = 290 + (lStride < 0 ? -24 : 8); // clear knee lift on swing
      lFootX = 145 + lStride * 76;
      lFootY = 370 + (lStride < 0 ? -18 : 0);

      // Right leg
      rKneeX = 155 + rStride * 46;
      rKneeY = 290 + (rStride < 0 ? -24 : 8);
      rFootX = 155 + rStride * 76;
      rFootY = 370 + (rStride < 0 ? -18 : 0);

      // Forward lean during walking
      neckX += 18;
      headX += 22;
      spineCtrlX += 12;
      break;
    }

    case 'point': {
      // Confident, decisive pointing stance
      headX = 152;
      headY = 58;
      neckX = 150;
      neckY = 115;
      spineCtrlX = 145;

      // Determine pointing arm based on target position
      let isLeftTarget = false;
      let angle = 0;

      if (pointTarget) {
        const anchorX = typeof style?.left === 'number' ? style.left : 960;
        const anchorY = typeof style?.top === 'number' ? style.top : 540;
        const dx = pointTarget.x - anchorX;
        const dy = pointTarget.y - anchorY;
        isLeftTarget = dx < 0;
        angle = Math.atan2(dy, dx);
      }

      if (isLeftTarget) {
        // Point with LEFT arm towards left target
        lElbowX = 150 + Math.cos(angle) * 55;
        lElbowY = 125 + Math.sin(angle) * 55;
        lHandX = 150 + Math.cos(angle) * 115;
        lHandY = 125 + Math.sin(angle) * 115;

        // Right arm resting on right hip
        rElbowX = 195;
        rElbowY = 170;
        rHandX = 165;
        rHandY = 210;
      } else {
        // Point with RIGHT arm towards right/forward target
        if (pointTarget) {
          rElbowX = 150 + Math.cos(angle) * 55;
          rElbowY = 125 + Math.sin(angle) * 55;
          rHandX = 150 + Math.cos(angle) * 115;
          rHandY = 125 + Math.sin(angle) * 115;
        } else {
          // Standard forward point
          rElbowX = 210;
          rElbowY = 120;
          rHandX = 275;
          rHandY = 115;
        }

        // Left arm resting on left hip
        lElbowX = 105;
        lElbowY = 170;
        lHandX = 135;
        lHandY = 210;
      }

      // Athletic grounded legs
      lHipX = 142;
      lKneeX = 125;
      lFootX = 105;
      lFootY = 370;

      rHipX = 158;
      rKneeX = 175;
      rFootX = 195;
      rFootY = 370;
      break;
    }

    case 'sit': {
      // Seated comfortably at desk (90 degree leg bend)
      headX = 165;
      headY = 95 + breath;
      neckX = 158;
      neckY = 145 + breath;
      pelvisX = 130;
      pelvisY = 260;
      spineCtrlX = 140;
      spineCtrlY = 205;

      // Thighs horizontal, calves vertical to floor
      lHipX = 130;
      lHipY = 260;
      lKneeX = 195;
      lKneeY = 265;
      lFootX = 195;
      lFootY = 370;

      rHipX = 135;
      rHipY = 260;
      rKneeX = 205;
      rKneeY = 265;
      rFootX = 205;
      rFootY = 370;

      // Typing / working hands on desk
      const type1 = Math.sin((frame * 2 * Math.PI) / 8) * 6;
      const type2 = Math.cos((frame * 2 * Math.PI) / 8) * 6;
      lElbowX = 175;
      lElbowY = 200;
      lHandX = 215;
      lHandY = 220 + type1;

      rElbowX = 185;
      rElbowY = 200;
      rHandX = 230;
      rHandY = 220 + type2;
      break;
    }

    case 'slump': {
      // Depressed, curved posture, heavy head
      headX = 175;
      headY = 105 + breath;
      neckX = 160;
      neckY = 155;
      spineCtrlX = 135;
      spineCtrlY = 190;
      pelvisX = 145;
      pelvisY = 230;

      lElbowX = 135;
      lElbowY = 205;
      lHandX = 130;
      lHandY = 265;

      rElbowX = 165;
      rElbowY = 205;
      rHandX = 160;
      rHandY = 265;

      lKneeX = 135;
      lFootX = 130;
      rKneeX = 165;
      rFootX = 165;
      break;
    }

    case 'push': {
      // Heroic effort pushing against heavy wind/rain, 35 deg lean
      headX = 195;
      headY = 115;
      neckX = 175;
      neckY = 160;
      pelvisX = 125;
      pelvisY = 230;
      spineCtrlX = 150;
      spineCtrlY = 195;

      // Arms outstretched pushing
      lElbowX = 215;
      lElbowY = 150;
      lHandX = 260;
      lHandY = 145;

      rElbowX = 225;
      rElbowY = 160;
      rHandX = 270;
      rHandY = 155;

      // Front leg bent deep, back leg stretched back
      lHipX = 120;
      lKneeX = 85;
      lFootX = 60;
      lFootY = 370;

      rHipX = 135;
      rKneeX = 175;
      rFootX = 195;
      rFootY = 370;
      break;
    }

    case 'lift': {
      // Athletic bicep curl / workout stance
      const curl = (Math.sin((frame * 2 * Math.PI) / 24) + 1) / 2; // 0 to 1
      const handY = 225 - curl * 80;

      headX = 150;
      headY = 60 - curl * 3;
      neckY = 115 - curl * 2;

      lElbowX = 110;
      lElbowY = 185;
      lHandX = 118;
      lHandY = handY;

      rElbowX = 190;
      rElbowY = 185;
      rHandX = 182;
      rHandY = handY;

      // Wide stable stance
      lKneeX = 120;
      lFootX = 95;
      rKneeX = 180;
      rFootX = 205;
      break;
    }

    case 'celebrate': {
      // Both arms raised high in triumphant V shape with jumping energy
      const jump = Math.abs(Math.sin((frame * 2 * Math.PI) / 16)) * 14;
      headY = 50 - jump;
      neckY = 105 - jump;
      pelvisY = 210 - jump;
      spineCtrlY = 155 - jump;

      lElbowX = 95;
      lElbowY = 85 - jump;
      lHandX = 65;
      lHandY = 35 - jump;

      rElbowX = 205;
      rElbowY = 85 - jump;
      rHandX = 235;
      rHandY = 35 - jump;

      lHipY = 210 - jump;
      lKneeX = 125;
      lKneeY = 280 - jump;
      lFootX = 115;
      lFootY = 360 - jump;

      rHipY = 210 - jump;
      rKneeX = 175;
      rKneeY = 280 - jump;
      rFootX = 185;
      rFootY = 360 - jump;
      break;
    }

    case 'shrug': {
      // Shrugging / questioning gesture
      headX = 155;
      headY = 62;
      neckY = 110; // raised shoulders
      lShoulderY = 110;
      rShoulderY = 110;

      lElbowX = 105;
      lElbowY = 160;
      lHandX = 85;
      lHandY = 145;

      rElbowX = 195;
      rElbowY = 160;
      rHandX = 215;
      rHandY = 145;
      break;
    }

    case 'hammer': {
      // Building / crafting action swinging down
      const swing = Math.sin((frame * 2 * Math.PI) / 14);
      headX = 160;
      headY = 68;
      neckX = 155;
      spineCtrlX = 148;

      // Left hand steadying workpiece
      lElbowX = 140;
      lElbowY = 190;
      lHandX = 180;
      lHandY = 225;

      // Right arm hammering
      rElbowX = 190 + swing * 20;
      rElbowY = 140 - swing * 25;
      rHandX = 220 + swing * 35;
      rHandY = 180 - swing * 50;

      lKneeX = 130;
      lFootX = 115;
      rKneeX = 170;
      rFootX = 185;
      break;
    }

    case 'toss_turn': {
      // Lying down horizontally (bed scene)
      const toss = Math.sin((frame * 2 * Math.PI) / 30) * 8;
      headX = 80;
      headY = 280 + toss;
      neckX = 130;
      neckY = 285;
      spineCtrlX = 190;
      spineCtrlY = 288;
      pelvisX = 250;
      pelvisY = 290;

      lElbowX = 120;
      lElbowY = 240;
      lHandX = 90;
      lHandY = 260 + toss;

      rElbowX = 160;
      rElbowY = 250;
      rHandX = 130;
      rHandY = 270;

      lHipX = 250;
      lHipY = 290;
      lKneeX = 300;
      lKneeY = 300;
      lFootX = 350;
      lFootY = 305;

      rHipX = 250;
      rHipY = 290;
      rKneeX = 305;
      rKneeY = 310;
      rFootX = 355;
      rFootY = 315;
      break;
    }

    case 'idle':
    default: {
      // Breathing bob
      headY += breath;
      neckY += breath * 0.7;
      spineCtrlY += breath * 0.4;
      lElbowX += breath * 0.5;
      rElbowX -= breath * 0.5;
      break;
    }
  }

  // Apply custom head tilt or lean angle if provided
  if (headTilt !== 0) {
    const rad = (headTilt * Math.PI) / 180;
    headX = neckX + Math.sin(rad) * 55;
    headY = neckY - Math.cos(rad) * 55;
  }
  if (leanAngle !== 0) {
    const rad = (leanAngle * Math.PI) / 180;
    neckX += Math.sin(rad) * 40;
    headX += Math.sin(rad) * 40;
    spineCtrlX += Math.sin(rad) * 20;
  }

  // Helper to ensure safe coordinates
  const safe = (n: number) => (Number.isFinite(n) ? Math.round(n * 10) / 10 : 0);

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg
        width={320}
        height={400}
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Head: Solid flat matte circle - strictly NO face or eyes */}
        <circle
          cx={safe(headX)}
          cy={safe(headY)}
          r={headRadius}
          fill={color}
          stroke="none"
        />

        {/* Torso: Continuous smooth quadratic path from neck to pelvis */}
        <path
          d={`M ${safe(neckX)} ${safe(neckY)} Q ${safe(spineCtrlX)} ${safe(spineCtrlY)} ${safe(pelvisX)} ${safe(pelvisY)}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Arm: Continuous path (shoulder -> elbow -> hand) */}
        <path
          d={`M ${safe(neckX)} ${safe(neckY + 10)} L ${safe(lElbowX)} ${safe(lElbowY)} L ${safe(lHandX)} ${safe(lHandY)}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Arm: Continuous path (shoulder -> elbow -> hand) */}
        <path
          d={`M ${safe(neckX)} ${safe(neckY + 10)} L ${safe(rElbowX)} ${safe(rElbowY)} L ${safe(rHandX)} ${safe(rHandY)}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Leg: Continuous path (hip -> knee -> foot) */}
        <path
          d={`M ${safe(pelvisX - 5)} ${safe(pelvisY)} L ${safe(lKneeX)} ${safe(lKneeY)} L ${safe(lFootX)} ${safe(lFootY)}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Leg: Continuous path (hip -> knee -> foot) */}
        <path
          d={`M ${safe(pelvisX + 5)} ${safe(pelvisY)} L ${safe(rKneeX)} ${safe(rKneeY)} L ${safe(rFootX)} ${safe(rFootY)}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
