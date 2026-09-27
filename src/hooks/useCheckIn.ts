"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStorage, type CheckIn } from "@/lib/storage";

type State = { status: "loading" } | { status: "missing" } | { status: "ready"; checkIn: CheckIn };

/** Loads the check-in named by the `?c=` query param. */
export function useCheckIn(): State {
  const id = useSearchParams().get("c");
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    if (!id) {
      setState({ status: "missing" });
      return;
    }
    getStorage()
      .checkIns.get(id)
      .then((checkIn) => {
        if (alive) setState(checkIn ? { status: "ready", checkIn } : { status: "missing" });
      });
    return () => {
      alive = false;
    };
  }, [id]);

  return state;
}
