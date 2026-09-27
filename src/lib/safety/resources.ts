/**
 * Philippine crisis resources — NGOs and government lines.
 *
 * Several lines are listed on purpose: if one is busy, the next is one tap
 * away. Order: 24/7 national lines first (NGO, then government), then
 * regional, then specialised.
 *
 * Last checked: September 2026, against each line's own posts plus
 * MentalHealthPH and findahelpline.com listings. Re-verify before every
 * public release — numbers change (NCMH replaced mobile lines in 2024–26).
 */

export type Operator = "ngo" | "government";

export interface CrisisNumber {
  label: string;
  tel: string;
  display: string;
}

export interface CrisisLine {
  id: string;
  name: string;
  operator: Operator;
  /** Who runs it, in plain words. */
  runBy: string;
  hours: string;
  /** Omitted for nationwide lines. */
  region?: string;
  description: string;
  numbers: CrisisNumber[];
}

export const CRISIS_LINES: CrisisLine[] = [
  {
    id: "in-touch",
    name: "In Touch Crisis Line",
    operator: "ngo",
    runBy: "In Touch Community Services, a non-profit since 1980",
    hours: "24/7",
    description: "Free, anonymous emotional support from trained responders.",
    numbers: [
      { label: "Globe", tel: "+639178001123", display: "0917 800 1123" },
      { label: "Smart", tel: "+639190560709", display: "0919 056 0709" },
      { label: "Landline", tel: "+63288937603", display: "(02) 8893 7603" },
    ],
  },
  {
    id: "hopeline",
    name: "HOPELINE PH",
    operator: "ngo",
    runBy: "Natasha Goulbourn Foundation, a non-profit",
    hours: "24/7",
    description: "Suicide prevention and emotional crisis support.",
    numbers: [
      { label: "Globe/TM, toll-free", tel: "2919", display: "2919" },
      { label: "Globe", tel: "+639175584673", display: "0917 558 4673" },
      { label: "Smart", tel: "+639188734673", display: "0918 873 4673" },
      { label: "Landline", tel: "+63288044673", display: "(02) 8804 4673" },
    ],
  },
  {
    id: "ncmh",
    name: "NCMH Crisis Hotline",
    operator: "government",
    runBy: "National Center for Mental Health (DOH)",
    hours: "24/7",
    description: "The national mental health crisis line. Free and confidential.",
    numbers: [
      { label: "Nationwide", tel: "1553", display: "1553" },
      { label: "Smart/TNT", tel: "+639190571553", display: "0919 057 1553" },
      { label: "Globe/TM", tel: "+639178998727", display: "0917 899 8727" },
      { label: "Globe/TM", tel: "+639663514518", display: "0966 351 4518" },
    ],
  },
  {
    id: "tawag-paglaum",
    name: "Tawag Paglaum – Centro Bisaya",
    operator: "government",
    runBy: "DOH & Vicente Sotto Memorial Medical Center",
    hours: "24/7",
    region: "Visayas (Cebu) · Bisaya, Tagalog, English",
    description: "Crisis support in Bisaya, especially for thoughts of suicide.",
    numbers: [
      { label: "Smart/Sun", tel: "+639399375433", display: "0939 937 5433" },
      { label: "Smart/Sun", tel: "+639399365433", display: "0939 936 5433" },
      { label: "Globe/TM", tel: "+639276541629", display: "0927 654 1629" },
    ],
  },
];

/** For when the person, or a child, is being hurt by someone. */
export const SAFETY_LINES: CrisisLine[] = [
  {
    id: "bantay-bata",
    name: "Bantay Bata 163",
    operator: "ngo",
    runBy: "ABS-CBN Foundation, with DSWD",
    hours: "Hours vary",
    description: "For children and families facing abuse or violence at home.",
    numbers: [{ label: "Toll-free", tel: "163", display: "163" }],
  },
];

export const EMERGENCY: CrisisNumber = { label: "Emergency", tel: "911", display: "911" };

export const OPERATOR_LABEL: Record<Operator, string> = {
  ngo: "Non-profit",
  government: "Government",
};
