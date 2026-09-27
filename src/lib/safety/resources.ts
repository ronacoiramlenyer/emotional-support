/**
 * Philippine crisis resources. Verify these numbers with each provider
 * before every public release — lines change.
 */

export interface CrisisLine {
  name: string;
  description: string;
  numbers: { label: string; tel: string; display: string }[];
}

export const CRISIS_LINES: CrisisLine[] = [
  {
    name: "NCMH Crisis Hotline",
    description: "National Center for Mental Health. Free, 24/7, nationwide.",
    numbers: [
      { label: "Nationwide", tel: "1553", display: "1553" },
      { label: "Globe/TM", tel: "+639178998727", display: "0917 899 8727" },
      { label: "Smart/TNT", tel: "+639086392672", display: "0908 639 2672" },
    ],
  },
  {
    name: "In Touch Crisis Line",
    description: "Free, confidential emotional support, 24/7.",
    numbers: [
      { label: "Landline", tel: "+63288937603", display: "(02) 8893 7603" },
      { label: "Globe", tel: "+639178001123", display: "0917 800 1123" },
      { label: "Smart", tel: "+639190560709", display: "0919 056 0709" },
    ],
  },
];

export const EMERGENCY = { label: "Emergency", tel: "911", display: "911" };
