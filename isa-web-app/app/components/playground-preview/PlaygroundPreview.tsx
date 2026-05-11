"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/app/lib/animations";
import styles from "./PlaygroundPreview.module.css";

const NOTEBOOKS = [
  {
    route: "/playground/media",
    pixelLabel: "> media_",
    title: "media ratings",
    blurb: "movies, shows, and books — rated and remembered.",
    accentColor: "var(--color-bubblegum)",
    rotate: "-2deg",
    preview: "media",
  },
  {
    route: "/playground/travel",
    pixelLabel: "> travel_",
    title: "travel",
    blurb: "places i've been. click around the map.",
    accentColor: "var(--color-sky-blue)",
    rotate: "0.5deg",
    preview: "travel",
  },
  {
    route: "/playground/creative",
    pixelLabel: "> creative_",
    title: "creative",
    blurb: "nail art, baking, painting, and more.",
    accentColor: "var(--color-olive-yellow)",
    rotate: "2deg",
    preview: "creative",
  },
] as const;

function MediaPreview() {
  return (
    <div className={styles.previewSketch}>
      {[0.9, 0.7, 1, 0.5, 0.8].map((w, i) => (
        <div
          key={i}
          className={styles.ratingBar}
          style={{ "--bar-width": w } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function TravelPreview() {
  return (
    <div className={styles.previewSketch}>
      <svg viewBox="0 0 120 80" className={styles.mapSvg}>
        <path d="M10 40 Q30 15 55 30 Q75 45 95 20 Q110 10 115 25" stroke="var(--color-sky-blue)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="55" cy="30" r="5" fill="var(--color-hot-pink)" />
        <circle cx="30" cy="22" r="4" fill="var(--color-bubblegum)" />
        <circle cx="95" cy="20" r="4" fill="var(--color-olive-yellow)" />
        <circle cx="115" cy="25" r="3.5" fill="var(--color-peach)" />
      </svg>
    </div>
  );
}

function CreativePreview() {
  const cells = [
    "var(--color-bubblegum)",
    "var(--color-peach)",
    "var(--color-olive-yellow)",
    "var(--color-sky-blue)",
    "var(--color-hot-pink)",
    "var(--color-bubblegum)",
  ];
  return (
    <div className={styles.previewSketch}>
      <div className={styles.creativeGrid}>
        {cells.map((color, i) => (
          <div key={i} className={styles.creativeCell} style={{ background: color }} />
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = { media: MediaPreview, travel: TravelPreview, creative: CreativePreview };

export default function PlaygroundPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionPixelLabel}>{"> playground_"}</span>
        <h2 className={styles.sectionTitle}>explore</h2>
      </div>

      <motion.div
        className={styles.notebookRow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        {NOTEBOOKS.map((nb) => {
          const Preview = PREVIEWS[nb.preview];
          return (
            <motion.div
              key={nb.route}
              className={styles.notebook}
              style={{ "--rotate": nb.rotate, "--accent": nb.accentColor } as React.CSSProperties}
              variants={fadeUp}
              whileHover={{ y: -8, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className={styles.spiralRow}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={styles.spiralRing} />
                ))}
              </div>

              <div className={styles.page}>
                <div className={styles.marginLine} />
                <div className={styles.pageContent}>
                  <span className={styles.pixelLabel}>{nb.pixelLabel}</span>
                  <Link href={nb.route} className={styles.notebookTitle}>
                    {nb.title}
                  </Link>
                  <p className={styles.notebookBlurb}>{nb.blurb}</p>
                  <Preview />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
