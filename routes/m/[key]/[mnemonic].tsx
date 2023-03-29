import { Handlers, PageProps } from "$fresh/server.ts";
import { Chart } from "$fresh_charts/mod.ts";

/** https://www.financialresearch.gov/short-term-funding-monitor/api-specs/api-full-single/ */
interface FullMnemonicData {
  [foo: string]: {
    timeseries: {
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
      release: {
        long_name: string;
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
  const timeseries = data.data[data.mnemonic].timeseries;

  return (
    <>
      <h1>{meta.release.long_name}</h1>
      <h2>{meta.description.name}</h2>
      <Chart
        type="line"
        data={{
          labels: timeseries.aggregation.map((a) => a[0]),
          datasets: [{
            label: "",
            data: timeseries.aggregation.map((a) => a[1]),
            borderWidth: 1,
          }],
        }}
      />
      <h3>{meta.description.name}</h3>
      <p>{meta.mnemonic}</p>
      <p>{meta.description.description}</p>
      <p>{meta.description.notes}</p>
    </>
  );
}
