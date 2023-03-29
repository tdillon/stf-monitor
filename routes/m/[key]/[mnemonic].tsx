import { Handlers, PageProps } from "$fresh/server.ts";

/** https://www.financialresearch.gov/short-term-funding-monitor/api-specs/api-full-single/ */
interface FullMnemonicData {
  [foo: string]: {
    timeseries: {
      disclosure_edits: [];
      aggregation: Array<[string, number]>;
    };
    metadata: {
      mnemonic: string;
      description: {
        vintage_approach: string;
        vintage: string;
        notes: string;
        name: string;
        subsetting: string;
        subtype: string;
        description: string;
      };
      // ...
    };
  };
}

interface PageData {
  data: FullMnemonicData;
  mnemonic: string;
}

export const handler: Handlers<PageData | null> = {
  async GET(_, ctx) {
    const { mnemonic, key } = ctx.params;
    const resp = await fetch(
      `https://data.financialresearch.gov/v1/series/full?mnemonic=${mnemonic}&periodicity=AS`,
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: FullMnemonicData = await resp.json();
    return ctx.render({ data, mnemonic });
  },
};

export default function Page(
  { data }: PageProps<PageData | null>,
) {
  if (!data) {
    return <h1>Stuff not found.</h1>;
  }

  const meta = data.data[data.mnemonic].metadata;

  return (
    <>
      <h1>{meta.description.name}</h1>
      <p>{meta.description.description}</p>
    </>
  );
}
