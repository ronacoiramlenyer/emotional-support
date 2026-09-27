"use client";

import { useRouter } from "next/navigation";
import { getStorage, type Need } from "@/lib/storage";
import { useCheckIn } from "@/hooks/useCheckIn";
import { MissingCheckIn } from "./MissingCheckIn";
import styles from "./NeedChoice.module.css";

const NEEDS: { need: Need; path: string; title: string; hint: string }[] = [
  {
    need: "heard",
    path: "/heard",
    title: "To be heard",
    hint: "Isulat o sabihin lang. No fixing, no judgment.",
  },
  {
    need: "body",
    path: "/calm",
    title: "To calm my body",
    hint: "Sixty seconds of slow breathing, together.",
  },
  {
    need: "close",
    path: "/bridge",
    title: "To feel close to someone",
    hint: "One small, easy step toward a real person.",
  },
];

export function NeedChoice() {
  const router = useRouter();
  const state = useCheckIn();
  if (state.status === "loading") return <div className="screen" aria-busy="true" />;
  if (state.status === "missing") return <MissingCheckIn />;

  const { checkIn } = state;

  async function choose(need: Need, path: string) {
    await getStorage().checkIns.update(checkIn.id, { need });
    router.push(`${path}?c=${encodeURIComponent(checkIn.id)}`);
  }

  return (
    <div className="screen">
      <p className="eyebrow">Dahan-dahan lang</p>
      <h1 className="display">
        What would help most <em>right now?</em>
      </h1>
      <p className="subtitle">Pick what feels closest. Walang maling sagot.</p>
      <ul className={styles.list}>
        {NEEDS.map((n) => (
          <li key={n.need}>
            <button type="button" className={styles.option} onClick={() => choose(n.need, n.path)}>
              <span className={styles.title}>{n.title}</span>
              <span className={styles.hint}>{n.hint}</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
