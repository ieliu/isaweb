import styles from "./playground.module.css";

export default function Playground() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <span className={styles.pixelLabel}>{"> playground_"}</span>
        <h1 className={styles.title}>the playground</h1>
      </div>
    </main>
  );
}
