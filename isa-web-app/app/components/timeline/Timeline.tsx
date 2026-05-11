"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import PillTag from "@/app/components/ui/PillTag";
import styles from "./Timeline.module.css";

interface TimelineEntry {
  title: string;
  date: string;
  blurb: string;
  details: string;
  tags?: { label: string; color: string }[];
  photos?: { src: string; alt: string }[];
}

const ENTRIES: TimelineEntry[] = [
  {
    title: "Georgia Tech",
    date: "Aug 2023 – May 2025",
    blurb: "Master's in Computer Science. Focused on machine learning and interactive intelligence.",
    details:
      "Graduated May 2025 with an MSCS specializing in machine learning. Courses spanned deep learning, computer vision, NLP, and human-computer interaction. Worked on research at the intersection of ML and HCI — how do you make AI actually feel human?",
    tags: [
      { label: "ML", color: "var(--color-bubblegum)" },
      { label: "Python", color: "var(--color-olive-yellow)" },
      { label: "Research", color: "var(--color-peach)" },
    ],
  },
  {
    title: "Mastercard",
    date: "Jul 2021 – Aug 2023",
    blurb: "Software engineer on the identity & access platform. Built internal tools used across global teams.",
    details:
      "Part of the NYC engineering hub, building and maintaining the identity & access management platform used by 30,000+ employees globally. Worked across Java Spring Boot microservices, designed REST APIs, and contributed to AWS cloud infrastructure. Learned a lot about scale, code review culture, and shipping with confidence.",
    tags: [
      { label: "Java", color: "var(--color-peach)" },
      { label: "Spring Boot", color: "var(--color-sky-blue)" },
      { label: "AWS", color: "var(--color-bubblegum)" },
    ],
  },
  {
    title: "Miss Chat",
    date: "Jan 2024 – present",
    blurb: "Co-building an AI-powered social companion app from scratch. Full-stack, fast-moving, and fun.",
    details:
      "Co-founder and full-stack engineer on a social AI companion app. Built the React Native mobile app, Next.js web platform, and backend services entirely from scratch. Integrates the Claude API for conversational AI — the kind of app I'd actually want to use.",
    tags: [
      { label: "Next.js", color: "var(--color-bubblegum)" },
      { label: "React Native", color: "var(--color-olive-yellow)" },
      { label: "Claude API", color: "var(--color-sky-blue)" },
    ],
  },
  {
    title: "isaweb",
    date: "May 2025",
    blurb: "This very site — a whimsical corner of the internet that's actually mine.",
    details:
      "The site you're on right now. Built with Next.js, TypeScript, Tailwind, and Framer Motion. Designed to feel like a Ghibli scrapbook — colorful, personal, and a little bit alive. Also the reason I now know way too much about CSS 3D transforms.",
    tags: [
      { label: "Next.js", color: "var(--color-bubblegum)" },
      { label: "Framer Motion", color: "var(--color-peach)" },
    ],
  },
];

const NODE_COLORS = [
  "var(--color-bubblegum)",
  "var(--color-olive-yellow)",
  "var(--color-peach)",
  "var(--color-sky-blue)",
];

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

function ExpandedCardOverlay({
  entry,
  onClose,
}: {
  entry: TimelineEntry;
  onClose: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={styles.expandedOverlay}>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.expandedCardWrapper}
        initial={{ scale: 0.55, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.55, opacity: 0, y: 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.flipContainer}>
          <motion.div
            className={styles.flipInner}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div className={styles.cardFront} onClick={() => setIsFlipped(true)}>
              <div className={styles.expandedHeader}>
                <span className={styles.expandedTitle}>{entry.title}</span>
                <span className={styles.expandedDate}>{entry.date}</span>
              </div>
              <p className={styles.expandedBlurb}>{entry.blurb}</p>
              {entry.photos && entry.photos.length > 0 && (
                <div className={styles.photos}>
                  {entry.photos.map((photo) => (
                    <Image
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      width={100}
                      height={100}
                      className={styles.photo}
                    />
                  ))}
                </div>
              )}
              {entry.tags && entry.tags.length > 0 && (
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <PillTag key={tag.label} label={tag.label} color={tag.color} />
                  ))}
                </div>
              )}
              <span className={styles.flipHint}>click to flip ↻</span>
            </div>

            <div className={styles.cardBack} onClick={() => setIsFlipped(false)}>
              <p className={styles.expandedDetails}>{entry.details}</p>
              <span className={styles.flipHint}>← click to flip back</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineCard({
  entry,
  onOpen,
}: {
  entry: TimelineEntry;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 28,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 28,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.04, y: -10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{entry.title}</span>
        <span className={styles.cardDate}>{entry.date}</span>
      </div>
      <p className={styles.cardBlurb}>{entry.blurb}</p>
      {entry.tags && entry.tags.length > 0 && (
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <PillTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TimelineEntryRow({
  entry,
  index,
  onOpen,
}: {
  entry: TimelineEntry;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 2.4, 2.4, 0.3]);
  const flowerScale = useSpring(rawScale, { stiffness: 260, damping: 10 });

  const isLeft = index % 2 === 0;
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    isLeft ? [-28, 0, 0] : [28, 0, 0]
  );

  const flowerColor = NODE_COLORS[index % NODE_COLORS.length];

  const cardMotion = (
    <motion.div style={{ opacity: cardOpacity, x: cardX }}>
      <TimelineCard entry={entry} onOpen={onOpen} />
    </motion.div>
  );

  const flowerNode = (
    <div className={styles.node}>
      <motion.div style={{ scale: flowerScale }}>
        <FlowerSvg color={flowerColor} size={32} />
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} className={styles.entry}>
      {isLeft ? (
        <>
          <div className={styles.cardLeft}>{cardMotion}</div>
          {flowerNode}
          <div />
        </>
      ) : (
        <>
          <div />
          {flowerNode}
          <div className={styles.cardRight}>{cardMotion}</div>
        </>
      )}
    </div>
  );
}

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const { scrollYProgress: stemProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });
  const stemScaleY = useSpring(stemProgress, { stiffness: 80, damping: 24 });

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.pixelLabel}>{"> experience_"}</span>
        <h2 className={styles.sectionTitle}>the journey</h2>
      </div>

      <div ref={timelineRef} className={styles.timeline}>
        <motion.div
          className={styles.stem}
          style={{ scaleY: stemScaleY, transformOrigin: "top" }}
        />

        <div className={styles.topFlower}>
          <FlowerSvg color="var(--color-hot-pink)" size={56} />
        </div>

        {ENTRIES.map((entry, i) => (
          <TimelineEntryRow
            key={entry.title}
            entry={entry}
            index={i}
            onOpen={() => setExpandedIndex(i)}
          />
        ))}

        <div className={styles.bottomFlower}>
          <FlowerSvg color="var(--color-olive-yellow)" size={28} />
        </div>
      </div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <ExpandedCardOverlay
            key={expandedIndex}
            entry={ENTRIES[expandedIndex]}
            onClose={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
