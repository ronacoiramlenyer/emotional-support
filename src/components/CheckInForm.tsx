"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isMoreFeeling,
  MORE_FEELINGS,
  OWN_WORDS_ID,
  PRIMARY_FEELINGS,
  type Feeling,
} from "@/lib/feelings";
import { namingLine } from "@/lib/acknowledgment";
import { needsSupport } from "@/lib/safety/detector";
import { getStorage } from "@/lib/storage";
import styles from "./CheckInForm.module.css";

const OWN_WORD_MAX = 40;

export function CheckInForm() {
  const router = useRouter();
  const noteId = useId();
  const wordId = useId();

  const [selected, setSelected] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [ownWord, setOwnWord] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const isOwnWords = selected === OWN_WORDS_ID;
  const naming = selected ? namingLine(selected, ownWord) : null;
  const canContinue = Boolean(selected) && (!isOwnWords || ownWord.trim().length > 0) && !saving;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canContinue || !selected) return;
    setSaving(true);
    const trimmedNote = note.trim() || undefined;
    const customWord = isOwnWords ? ownWord.trim() : undefined;
    const checkIn = await getStorage().checkIns.create({
      feelingId: selected,
      customWord,
      note: trimmedNote,
      needsSupport: needsSupport(trimmedNote, customWord),
    });
    router.push(`/acknowledge?c=${encodeURIComponent(checkIn.id)}`);
  }

  const renderFeeling = (f: Feeling, index: number, reveal = false) => (
    <label
      key={f.id}
      className={`${styles.feeling} ${reveal ? styles.reveal : ""}`}
      style={reveal ? { animationDelay: `${index * 40}ms` } : undefined}
    >
      <input
        type="radio"
        name="feeling"
        value={f.id}
        checked={selected === f.id}
        onChange={() => setSelected(f.id)}
        className="visually-hidden"
      />
      <span>{f.label}</span>
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className="visually-hidden">Choose the word that feels closest</legend>

        <div className={styles.grid}>
          {PRIMARY_FEELINGS.map((f, i) => renderFeeling(f, i))}
          {showMore && MORE_FEELINGS.map((f, i) => renderFeeling(f, i, true))}
        </div>

        <button
          type="button"
          className={`text-link ${styles.more}`}
          aria-expanded={showMore}
          onClick={() => {
            // Don't hide a feeling the user has already picked.
            if (showMore && isMoreFeeling(selected)) setSelected(null);
            setShowMore((v) => !v);
          }}
        >
          {showMore ? "Fewer feelings −" : "More feelings +"}
        </button>

        <label className={`${styles.feeling} ${styles.ownWords}`}>
          <input
            type="radio"
            name="feeling"
            value={OWN_WORDS_ID}
            checked={isOwnWords}
            onChange={() => setSelected(OWN_WORDS_ID)}
            className="visually-hidden"
          />
          <span>In my own words</span>
        </label>
      </fieldset>

      {isOwnWords && (
        <div className={styles.reveal}>
          <label htmlFor={wordId} className={styles.fieldLabel}>
            What&apos;s the word for it?
          </label>
          <input
            id={wordId}
            type="text"
            className={styles.input}
            value={ownWord}
            maxLength={OWN_WORD_MAX}
            autoComplete="off"
            placeholder="Kahit ano — any word is okay."
            onChange={(e) => setOwnWord(e.target.value)}
          />
        </div>
      )}

      {selected && (
        <div className={`${styles.after} ${styles.reveal}`} aria-live="polite">
          {naming && (
            <>
              <p className={styles.chose}>
                You&apos;re feeling <em>{naming.word}</em>.
              </p>
              <p className={styles.choseSub}>{naming.sub}</p>
            </>
          )}
          <label htmlFor={noteId} className={styles.fieldLabel}>
            What would you like to acknowledge?
          </label>
          <textarea
            id={noteId}
            className={styles.textarea}
            rows={4}
            value={note}
            placeholder="Write a little, or leave this for later."
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className="pill" disabled={!canContinue}>
          Continue <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
