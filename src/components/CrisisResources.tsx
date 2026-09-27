import { CRISIS_LINES, EMERGENCY } from "@/lib/safety/resources";
import styles from "./CrisisResources.module.css";

/** The list of people to call. Used on /support and when text suggests risk. */
export function CrisisResources() {
  return (
    <div className={styles.list}>
      {CRISIS_LINES.map((line) => (
        <section key={line.name} className={styles.line} aria-label={line.name}>
          <h3 className={styles.name}>{line.name}</h3>
          <p className={styles.desc}>{line.description}</p>
          <ul className={styles.numbers}>
            {line.numbers.map((n) => (
              <li key={n.tel}>
                <a href={`tel:${n.tel}`} className={styles.number}>
                  <span className={styles.label}>{n.label}</span>
                  <span>{n.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className={styles.emergency}>
        If you are in immediate danger, call{" "}
        <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.display}</a>.
      </p>
    </div>
  );
}
