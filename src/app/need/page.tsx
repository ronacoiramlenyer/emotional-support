import { Suspense } from "react";
import { NeedChoice } from "@/components/NeedChoice";

export const metadata = { title: "What would help? · Tanglaw" };

export default function NeedPage() {
  return (
    <Suspense fallback={<div className="screen" aria-busy="true" />}>
      <NeedChoice />
    </Suspense>
  );
}
