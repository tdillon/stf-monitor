import { Handlers, PageProps } from "$fresh/server.ts";

/** https://www.financialresearch.gov/short-term-funding-monitor/api-specs/api-info-mnemonics/ */
interface SeriesInformationMnemonics {
  mnemonic: string;
  series_name: string;
}

interface DataObj {
  data: Array<SeriesInformationMnemonics>;
  key: string;
}

export const handler: Handlers<DataObj | null> = {
  async GET(_, ctx) {
    const { key } = ctx.params;
    const resp = await fetch(
      `https://data.financialresearch.gov/v1/metadata/mnemonics?dataset=${key}`,
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: Array<SeriesInformationMnemonics> = await resp.json();
    return ctx.render({ data, key });
  },
};

export default function Page(
  { data }: PageProps<DataObj | null>,
) {
  if (!data) {
    return <h1>Series Information not found.</h1>;
  }

  return (
    <>
      {data.data.map((s) => (
        <p>
          <a href={`${data.key}/${s.mnemonic}`}>{s.mnemonic}</a>
          &mdash;
          <span>{s.series_name}</span>
        </p>
      ))}
    </>
  );
}
