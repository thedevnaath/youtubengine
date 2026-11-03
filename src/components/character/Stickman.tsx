import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type StickmanPose =
  | 'idle'
  | 'thinking'
  | 'working'
  | 'lifting'
  | 'pointing'
  | 'celebrating'
  | 'slumped'
  | 'pushing'
  | 'walking';

interface StickmanProps {
  pose?: StickmanPose;
  color?: string;
  glowColor?: string;
  strokeWidth?: number;
  scale?: number;
  flip?: boolean;
  style?: React.CSSProperties;
  speed?: number;
}

export const Stickman: React.FC<StickmanProps> = ({
  pose = 'idle',
  color = '#FF6B00',
  glowColor = '#FF8533',
  strokeWidth = 12,
  scale = 1,
  flip = false,
  style = {},
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle rhythmic breathing and bounce
  const breath = Math.sin((frame * speed * 2 * Math.PI) / 45);
  const quickBounce = Math.sin((frame * speed * 2 * Math.PI) / 15);
  const walkCycle = (frame * speed * 2 * Math.PI) / 20;

  // Base coordinates for character (anchor at pelvis: 150, 240)
  const pelvisX = 150;
  const pelvisY = 240 + (pose === 'idle' ? breath * 2 : 0);

  let headX = 150;
  let headY = 90;
  let chestX = 150;
  let chestY = 160;

  // Arm positions: [shoulderX, shoulderY, elbowX, elbowY, handX, handY]
  let leftArm = { sx: 140, sy: 155, ex: 110, ey: 195, hx: 95, hy: 240 };
  let rightArm = { sx: 160, sy: 155, ex: 190, ey: 195, hx: 205, hy: 240 };

  // Leg positions: [hipX, hipY, kneeX, kneeY, footX, footY]
  let leftLeg = { hx: 142, hy: 240, kx: 135, ky: 300, fx: 125, fy: 360 };
  let rightLeg = { hx: 158, hy: 240, kx: 165, ky: 300, fx: 175, fy: 360 };

  // Spine curvature control point
  let spineCtrlX = 150;
  let spineCtrlY = 200;

  switch (pose) {
    case 'thinking': {
      headX = 155 + breath * 1.5;
      headY = 94;
      chestX = 150;
      chestY = 160;
      spineCtrlX = 148;
      // Right hand touches chin (head is at 155, 94)
      rightArm = {
        sx: 160,
        sy: 155,
        ex: 185,
        ey: 140,
        hx: 160 + breath * 1.5,
        hy: 115,
      };
      // Left arm folded across torso supporting right elbow
      leftArm = {
        sx: 140,
        sy: 155,
        ex: 125,
        ey: 185,
        hx: 165,
        hy: 175,
      };
      // Weight shifted on right leg
      leftLeg = { hx: 142, hy: 240, kx: 130, ky: 298, fx: 115, fy: 360 };
      rightLeg = { hx: 158, hy: 240, kx: 162, ky: 300, fx: 165, fy: 360 };
      break;
    }

    case 'working': {
      // Leaned over desk/keyboard, rapid typing hands
      const typeLeft = Math.sin((frame * 2 * Math.PI) / 8) * 8;
      const typeRight = Math.cos((frame * 2 * Math.PI) / 8) * 8;
      headX = 170;
      headY = 110 + quickBounce * 1.5;
      chestX = 160;
      chestY = 170;
      spineCtrlX = 155;
      spineCtrlY = 205;

      leftArm = {
        sx: 150,
        sy: 165,
        ex: 175,
        ey: 200,
        hx: 195,
        hy: 215 + typeLeft,
      };
      rightArm = {
        sx: 170,
        sy: 165,
        ex: 195,
        ey: 200,
        hx: 215,
        hy: 215 + typeRight,
      };
      // Seated or active stance
      leftLeg = { hx: 142, hy: 240, kx: 120, ky: 285, fx: 120, fy: 360 };
      rightLeg = { hx: 158, hy: 240, kx: 180, ky: 295, fx: 190, fy: 360 };
      break;
    }

    case 'lifting': {
      // Bicep curl / barbell lift
      const liftProgress = (Math.sin((frame * speed * 2 * Math.PI) / 25) + 1) / 2;
      const armCurledY = interpolate(liftProgress, [0, 1], [230, 145]);
      headY = 92 + liftProgress * 4;
      leftArm = {
        sx: 138,
        sy: 155,
        ex: 115 - liftProgress * 10,
        ey: 190,
        hx: 125,
        hy: armCurledY,
      };
      rightArm = {
        sx: 162,
        sy: 155,
        ex: 185 + liftProgress * 10,
        ey: 190,
        hx: 175,
        hy: armCurledY,
      };
      // Solid athletic wide base
      leftLeg = { hx: 140, hy: 240, kx: 120, ky: 300, fx: 105, fy: 360 };
      rightLeg = { hx: 160, hy: 240, kx: 180, ky: 300, fx: 195, fy: 360 };
      break;
    }

    case 'pointing': {
      // Confident stance, right arm extended straight out
      headX = 148;
      headY = 88;
      rightArm = {
        sx: 160,
        sy: 155,
        ex: 210,
        ey: 145,
        hx: 260,
        hy: 135,
      };
      // Left arm akimbo (hand on hip)
      leftArm = {
        sx: 140,
        sy: 155,
        ex: 110,
        ey: 185,
        hx: 138,
        hy: 220,
      };
      // Power stance
      leftLeg = { hx: 142, hy: 240, kx: 125, ky: 300, fx: 110, fy: 360 };
      rightLeg = { hx: 158, hy: 240, kx: 170, ky: 300, fx: 185, fy: 360 };
      break;
    }

    case 'celebrating': {
      // Both arms raised high in triumphant V shape, jumping bounce
      const jumpY = Math.abs(quickBounce) * 12;
      headY = 80 - jumpY;
      chestY = 150 - jumpY;
      leftArm = {
        sx: 140,
        sy: 150 - jumpY,
        ex: 105,
        ey: 105 - jumpY,
        hx: 80,
        hy: 60 - jumpY,
      };
      rightArm = {
        sx: 160,
        sy: 150 - jumpY,
        ex: 195,
        ey: 105 - jumpY,
        hx: 220,
        hy: 60 - jumpY,
      };
      leftLeg = { hx: 142, hy: 240 - jumpY, kx: 120, ky: 290 - jumpY, fx: 110, fy: 350 - jumpY };
      rightLeg = { hx: 158, hy: 240 - jumpY, kx: 180, ky: 290 - jumpY, fx: 190, fy: 350 - jumpY };
      break;
    }

    case 'slumped': {
      // Depressed, slouching, heavy head
      headX = 165;
      headY = 120 + breath * 2;
      chestX = 155;
      chestY = 175;
      spineCtrlX = 140;
      spineCtrlY = 205;
      leftArm = {
        sx: 145,
        sy: 170,
        ex: 135,
        ey: 220,
        hx: 130,
        hy: 270,
      };
      rightArm = {
        sx: 165,
        sy: 170,
        ex: 175,
        ey: 220,
        hx: 170,
        hy: 270,
      };
      leftLeg = { hx: 142, hy: 240, kx: 135, ky: 300, fx: 130, fy: 360 };
      rightLeg = { hx: 158, hy: 240, kx: 165, ky: 300, fx: 170, fy: 360 };
      break;
    }

    case 'pushing': {
      // Heavy effort pushing against wind/heavy block, leaned forward 30 deg
      headX = 185;
      headY = 125;
      chestX = 170;
      chestY = 170;
      spineCtrlX = 155;
      spineCtrlY = 210;
      leftArm = {
        sx: 160,
        sy: 165,
        ex: 210,
        ey: 165,
        hx: 250,
        hy: 160,
      };
      rightArm = {
        sx: 175,
        sy: 165,
        ex: 225,
        ey: 175,
        hx: 265,
        hy: 170,
      };
      // Stretched back rear leg, bent front leg
      leftLeg = { hx: 142, hy: 240, kx: 110, ky: 295, fx: 85, fy: 360 };
      rightLeg = { hx: 158, hy: 240, kx: 185, ky: 295, fx: 210, fy: 360 };
      break;
    }

    case 'walking': {
      // Natural stride kinematics
      const stride = Math.sin(walkCycle);
      const verticalBob = Math.abs(Math.sin(walkCycle * 2)) * 8;
      headY = 90 - verticalBob;
      chestY = 160 - verticalBob;
      leftArm = {
        sx: 140,
        sy: 155 - verticalBob,
        ex: 140 - stride * 25,
        ey: 195 - verticalBob,
        hx: 140 - stride * 45,
        hy: 235 - verticalBob,
      };
      rightArm = {
        sx: 160,
        sy: 155 - verticalBob,
        ex: 160 + stride * 25,
        ey: 195 - verticalBob,
        hx: 160 + stride * 45,
        hy: 235 - verticalBob,
      };
      leftLeg = {
        hx: 142,
        hy: 240 - verticalBob,
        kx: 142 + stride * 30,
        ky: 295,
        fx: 142 + stride * 50,
        fy: 360,
      };
      rightLeg = {
        hx: 158,
        hy: 240 - verticalBob,
        kx: 158 - stride * 30,
        ky: 295,
        fx: 158 - stride * 50,
        fy: 360,
      };
      break;
    }

    case 'idle':
    default: {
      leftArm = {
        sx: 140,
        sy: 155,
        ex: 118,
        ey: 195,
        hx: 108 + breath * 3,
        hy: 240,
      };
      rightArm = {
        sx: 160,
        sy: 155,
        ex: 182,
        ey: 195,
        hx: 192 - breath * 3,
        hy: 240,
      };
      break;
    }
  }

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom center',
        filter: `drop-shadow(0 10px 25px rgba(249, 115, 22, 0.45)) drop-shadow(0 0 15px rgba(255, 107, 0, 0.3))`,
        ...style,
      }}
    >
      <svg
        width={300}
        height={400}
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="tangerineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA040" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#E05500" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow on ground */}
        <ellipse
          cx={150}
          cy={365}
          rx={pose === 'celebrating' ? 35 : 55}
          ry={10}
          fill="rgba(0, 0, 0, 0.25)"
          filter="blur(4px)"
        />

        {/* Legs: Left Leg (behind) */}
        <path
          d={`M ${leftLeg.hx} ${leftLeg.hy} L ${leftLeg.kx} ${leftLeg.ky} L ${leftLeg.fx} ${leftLeg.fy}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.88}
        />
        {/* Foot Left */}
        <path
          d={`M ${leftLeg.fx} ${leftLeg.fy} L ${leftLeg.fx + 16} ${leftLeg.fy}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Legs: Right Leg (front) */}
        <path
          d={`M ${rightLeg.hx} ${rightLeg.hy} L ${rightLeg.kx} ${rightLeg.ky} L ${rightLeg.fx} ${rightLeg.fy}`}
          stroke="url(#tangerineGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Foot Right */}
        <path
          d={`M ${rightLeg.fx} ${rightLeg.fy} L ${rightLeg.fx + 18} ${rightLeg.fy}`}
          stroke="url(#tangerineGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Torso / Spine */}
        <path
          d={`M ${headX} ${headY + 30} Q ${spineCtrlX} ${spineCtrlY} ${pelvisX} ${pelvisY}`}
          stroke="url(#tangerineGradient)"
          strokeWidth={strokeWidth + 2}
          strokeLinecap="round"
        />

        {/* Left Arm (behind body) */}
        <path
          d={`M ${leftArm.sx} ${leftArm.sy} L ${leftArm.ex} ${leftArm.ey} L ${leftArm.hx} ${leftArm.hy}`}
          stroke={color}
          strokeWidth={strokeWidth - 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
        />

        {/* Right Arm (in front) */}
        <path
          d={`M ${rightArm.sx} ${rightArm.sy} L ${rightArm.ex} ${rightArm.ey} L ${rightArm.hx} ${rightArm.hy}`}
          stroke="url(#tangerineGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Head: Iconic sleek tangerine sphere - strictly NO face or eyes */}
        <circle
          cx={headX}
          cy={headY}
          r={28}
          fill="url(#tangerineGradient)"
          stroke="#FFA040"
          strokeWidth={3}
          filter="url(#softGlow)"
        />

        {/* Head highlight for 3D depth */}
        <ellipse
          cx={headX - 8}
          cy={headY - 8}
          rx={8}
          ry={5}
          fill="rgba(255, 255, 255, 0.45)"
          transform={`rotate(-25 ${headX - 8} ${headY - 8})`}
        />
      </svg>
    </div>
  );
};

