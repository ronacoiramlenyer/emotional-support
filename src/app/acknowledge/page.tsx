import { Suspense } from "react";
import { Acknowledgment } from "@/components/Acknowledgment";

export const metadata = { title: "Narinig kita · Tanglaw" };

export default function AcknowledgePage() {
  return (
    <Suspense fallback={<div className="screen" aria-busy="true" />}>
      <Acknowledgment />
    </Suspense>
  );
}
