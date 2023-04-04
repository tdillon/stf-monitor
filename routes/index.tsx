import { Head } from "$fresh/runtime.ts";
import MyIsland from "../islands/MyIsland.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Official OFR Short-term Funding Monitor</title>
        <meta name="todo: my description here"></meta>
      </Head>
      <main>
        <MyIsland
          dataset="OFR U.S. Money Market Fund Data Release"
          kee="fnyr"
        >
        </MyIsland>
        <MyIsland
          dataset="OFR U.S. Repo Markets Data Release"
          kee="mmf"
        >
        </MyIsland>
        <MyIsland
          dataset="Federal Reserve Bank of New York Reference Rates"
          kee="nypd"
        >
        </MyIsland>
        <MyIsland
          dataset="Federal Reserve Bank of New York Primary Dealer Statistics"
          kee="repo"
        >
        </MyIsland>
        <MyIsland
          dataset="Treasury Constant Maturity Rates"
          kee="tyld"
        >
        </MyIsland>
      </main>
    </>
  );
}
