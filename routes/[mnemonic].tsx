import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Chart } from "$fresh_charts/mod.ts";
import SideMenu from "../islands/SideMenu.tsx";

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
    const { mnemonic } = ctx.params;
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
      <Head>
        <title>Official OFR Short-term Funding Monitor</title>
        <meta charSet="utf-8" />
        <meta name="description" content="for lighthouse"></meta>
        <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
        </link>
        <link rel="stylesheet" href={asset("style.css")} />
      </Head>
      <header>
        <h1>{meta.release.long_name}</h1>
        <p>{meta.description.name}</p>
      </header>
      <nav>
        <SideMenu />
      </nav>
      <main>
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
      </main>
    </>
  );
}
