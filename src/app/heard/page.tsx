import { ComingSoon } from "@/components/ComingSoon";

type Props = { searchParams: Promise<{ c?: string }> };

export default async function HeardPage({ searchParams }: Props) {
  const { c } = await searchParams;
  return (
    <ComingSoon
      checkInId={c}
      title="A space to be"
      accent="heard."
      body="This is still being built. Witness mode will let you write or speak freely, and it will only reflect back — never fix."
    />
  );
}
