"use client";

import { useState } from "react";
import { getStorage } from "@/lib/storage";

export function DeleteAllData() {
  const [step, setStep] = useState<"idle" | "confirm" | "done">("idle");

  if (step === "done") {
    return (
      <p role="status" className="card">
        Tapos na. Everything Tanglaw stored on this device has been deleted.
      </p>
    );
  }

  if (step === "confirm") {
    return (
      <div className="card" role="group" aria-label="Confirm deletion">
        <p style={{ marginTop: 0 }}>
          This deletes all your check-ins and notes on this device. Hindi na ito maibabalik.
        </p>
        <div className="actions" style={{ marginTop: 0 }}>
          <button
            type="button"
            className="pill"
            onClick={async () => {
              await getStorage().clearAll();
              setStep("done");
            }}
          >
            Yes, delete everything
          </button>
          <button type="button" className="pill pill--ghost" onClick={() => setStep("idle")}>
            Keep my data
          </button>
        </div>
      </div>
    );
  }

  return (
    <button type="button" className="pill pill--ghost" onClick={() => setStep("confirm")}>
      Delete all my data
    </button>
  );
}
