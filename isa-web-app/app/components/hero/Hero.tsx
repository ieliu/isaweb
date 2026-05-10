"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Doodle from "@/app/components/ui/Doodle";
import PillTag from "@/app/components/ui/PillTag";
import { fadeUp, scaleIn, staggerContainer } from "@/app/lib/animations";
import styles from "./Hero.module.css";
import Image from "next/image";
import irl_me from "@/public/irl_me_compressed.jpeg";

const TYPING_MS  = 80;
const ERASING_MS = 45;
const PAUSE_MS   = 2400;

type Checkpoint = { text: string; pause: number };
type RoleEntry  = Checkpoint[];

const ROLES: RoleEntry[] = [
  [{ text: "software engineer",   pause: PAUSE_MS }],
  [
    { text: "cookie creator",     pause: 520 },   // types it… hesitates
    { text: "cookie",             pause: 160 },   // backtracks
    { text: "cookie destroyer",   pause: PAUSE_MS },
  ],
  [{ text: "aspiring nail artist",         pause: PAUSE_MS }],
  [{ text: "volleyball player",   pause: PAUSE_MS }],
  [{ text: "creative thinker",    pause: PAUSE_MS }],
  [{ text: "adventurer",          pause: PAUSE_MS }],
];

type Phase = "running" | "pausing" | "end_erase";

function useTypewriter(): string {
  const prefersReducedMotion = useReducedMotion();
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [checkIdx, setCheckIdx] = useState(0);
  const [text,     setText]     = useState("");
  const [phase,    setPhase]    = useState<Phase>("running");

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Erase to "" at end of a role, then advance
    if (phase === "end_erase") {
      if (text.length > 0) {
        const t = setTimeout(() => setText((s) => s.slice(0, -1)), ERASING_MS);
        return () => clearTimeout(t);
      }
      setRoleIdx((i) => (i + 1) % ROLES.length);
      setCheckIdx(0);
      setPhase("running");
      return;
    }

    const role       = ROLES[roleIdx];
    const checkpoint = role[checkIdx];
    const target     = checkpoint.text;

    if (phase === "running") {
      if (text === target) {
        setPhase("pausing");
        return;
      }
      // Type if target starts with current text; erase otherwise
      if (target.startsWith(text)) {
        const t = setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          TYPING_MS
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText((s) => s.slice(0, -1)), ERASING_MS);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => {
        if (checkIdx < role.length - 1) {
          setCheckIdx((i) => i + 1);
          setPhase("running");
        } else {
          setPhase("end_erase");
        }
      }, checkpoint.pause);
      return () => clearTimeout(t);
    }
  }, [text, phase, roleIdx, checkIdx, prefersReducedMotion]);

  return prefersReducedMotion ? ROLES[0][0].text : text;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const initial  = prefersReducedMotion ? false : "hidden";
  const roleText = useTypewriter();

  return (
    <section className={styles.hero}>
      <Doodle shape="star"    color="var(--color-bubblegum)"    size={32} style={{ top: "11%", left: "6%" }} />
      <Doodle shape="flower"  color="var(--color-peach)"        size={44} style={{ top: "18%", right: "7%" }} />
      <Doodle shape="sparkle" color="var(--color-golden-orange)" size={28} style={{ bottom: "32%", left: "9%" }} />
      <Doodle shape="dot"     color="var(--color-sky-blue)"     size={16} style={{ top: "40%", right: "14%" }} />
      <Doodle shape="star"    color="var(--color-olive-yellow)"  size={22} style={{ bottom: "18%", right: "11%" }} />
      <Doodle shape="flower"  color="var(--color-hot-pink)"     size={36} style={{ bottom: "24%", left: "4%" }} />
      <Doodle shape="dot"     color="var(--color-bubblegum)"    size={12} style={{ top: "14%", left: "28%" }} />
      <Doodle shape="sparkle" color="var(--color-olive-yellow)"  size={20} style={{ bottom: "44%", right: "5%" }} />
      <Doodle shape="dot"     color="var(--color-hot-pink)"     size={10} style={{ top: "62%", right: "22%" }} />

      <motion.div
        className={styles.content}
        variants={staggerContainer}
        initial={initial}
        animate="visible"
      >
        <motion.div className={styles.heroLayout} variants={staggerContainer}>

          {/* Left column: "hello, i'm" + cycling pixel label */}
          <motion.div className={styles.leftCol} variants={staggerContainer}>
            <motion.h1 className={styles.helloIm} variants={fadeUp}>
              hello,<br />i&apos;m
            </motion.h1>
            <motion.p className={styles.label} variants={fadeUp}>
              {`> ${roleText}`}<span className={styles.cursor} aria-hidden="true">_</span>
            </motion.p>
          </motion.div>

          {/* Center: flip card — swap .photoImg divs for <Image fill> when ready */}
          <motion.div className={styles.photoCard} variants={scaleIn}>
            <div className={styles.photoInner}>
              <div className={styles.photoFront}>
                <div className={styles.photoImg}>
                  <Image src={irl_me} alt="isa" fill style={{ objectFit: "cover" }} />
                </div>
              </div>
              <div className={styles.photoBack}>
                <div className={`${styles.photoImg} ${styles.photoImgBack}`} />
              </div>
            </div>
          </motion.div>

          {/* Right column: "isa." overlapping photo + bio + contacts */}
          <motion.div className={styles.rightCol} variants={staggerContainer}>
            <motion.p className={styles.nameWord} variants={fadeUp}>
              isa.
            </motion.p>
            <motion.p className={styles.bio} variants={fadeUp}>
              software engineer &amp; creative human. georgia tech mscs.
              previously mastercard. based in nyc.
            </motion.p>
            <motion.div className={styles.contactRow} variants={fadeUp}>
              <PillTag label="GitHub"   color="var(--color-olive-yellow)" href="https://github.com/ieliu"             external />
              <PillTag label="LinkedIn" color="var(--color-sky-blue)"     href="https://linkedin.com/in/isabelleeliu" external />
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}
