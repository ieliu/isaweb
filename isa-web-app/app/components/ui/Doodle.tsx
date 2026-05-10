import { CSSProperties } from "react";
import styles from "./Doodle.module.css";

type DoodleShape = "star" | "flower" | "dot" | "sparkle";

interface DoodleProps {
  shape: DoodleShape;
  color: string;
  size?: number;
  style?: CSSProperties;
}

function StarSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={color}
      />
    </svg>
  );
}

function FlowerSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="7" r="5" fill={color} />
      <circle cx="16" cy="25" r="5" fill={color} />
      <circle cx="7" cy="16" r="5" fill={color} />
      <circle cx="25" cy="16" r="5" fill={color} />
      <circle cx="9.5" cy="9.5" r="4" fill={color} />
      <circle cx="22.5" cy="9.5" r="4" fill={color} />
      <circle cx="9.5" cy="22.5" r="4" fill={color} />
      <circle cx="22.5" cy="22.5" r="4" fill={color} />
      <circle cx="16" cy="16" r="5.5" fill="white" />
      <circle cx="16" cy="16" r="2.5" fill={color} />
    </svg>
  );
}

function DotSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill={color} />
    </svg>
  );
}

function SparkleSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1L13.8 10.2L23 12L13.8 13.8L12 23L10.2 13.8L1 12L10.2 10.2L12 1Z"
        fill={color}
      />
    </svg>
  );
}

const svgMap = { star: StarSvg, flower: FlowerSvg, dot: DotSvg, sparkle: SparkleSvg };

export default function Doodle({ shape, color, size = 24, style }: DoodleProps) {
  const SvgComponent = svgMap[shape];
  return (
    <div className={styles.doodle} style={style}>
      <SvgComponent color={color} size={size} />
    </div>
  );
}
