import {
  CRISIS_LINES,
  EMERGENCY,
  OPERATOR_LABEL,
  SAFETY_LINES,
  type CrisisLine,
} from "@/lib/safety/resources";
import styles from "./CrisisResources.module.css";

function Line({ line }: { line: CrisisLine }) {
  return (
    <section className={styles.line} aria-labelledby={`line-${line.id}`}>
      <p className={styles.meta}>
        <span>{OPERATOR_LABEL[line.operator]}</span>
        <span aria-hidden="true">·</span>
        <span>{line.hours}</span>
        {line.region && (
          <>
            <span aria-hidden="true">·</span>
            <span>{line.region}</span>
          </>
        )}
      </p>
      <h3 id={`line-${line.id}`} className={styles.name}>
        {line.name}
      </h3>
      <p className={styles.desc}>
        {line.description} <span className={styles.runBy}>{line.runBy}.</span>
      </p>
      <ul className={styles.numbers}>
        {line.numbers.map((n) => (
          <li key={n.tel}>
            <a
              href={`tel:${n.tel}`}
              className={styles.number}
              aria-label={`Call ${line.name}, ${n.label}: ${n.display}`}
            >
              <span className={styles.label}>{n.label}</span>
              <span>{n.display}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** People to call. Used on /support and whenever text suggests risk. */
export function CrisisResources() {
  return (
    <div className={styles.list}>
      <p className={styles.tip}>
        If one line is busy, try the next one — tuloy lang. You can say &ldquo;hindi ako
        okay&rdquo; and they&apos;ll take it from there.
      </p>
      {CRISIS_LINES.map((line) => (
        <Line key={line.id} line={line} />
      ))}

      <h3 className={styles.groupTitle}>If someone is hurting you or a child</h3>
      {SAFETY_LINES.map((line) => (
        <Line key={line.id} line={line} />
      ))}

      <p className={styles.emergency}>
        If you are in immediate danger, call{" "}
        <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.display}</a>.
      </p>
    </div>
  );
}
