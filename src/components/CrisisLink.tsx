import Link from "next/link";
import styles from "./CrisisLink.module.css";

/** Always visible, on every screen. Quiet, never alarming. */
export function CrisisLink() {
  return (
    <Link href="/support" className={styles.link}>
      Need someone now?
    </Link>
  );
}
