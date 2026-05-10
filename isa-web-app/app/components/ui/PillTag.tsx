import Link from "next/link";
import { CSSProperties, ReactNode } from "react";
import styles from "./PillTag.module.css";

interface PillTagProps {
  label: string;
  color: string;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
}

export default function PillTag({ label, color, icon, href, external }: PillTagProps) {
  const pillStyle = { "--pill-color": color } as CSSProperties;

  const inner = (
    <span className={styles.pill} style={pillStyle}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </span>
  );

  if (!href) return inner;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.link}>
      {inner}
    </Link>
  );
}
