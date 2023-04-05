import { Head, asset } from "$fresh/runtime.ts";
import LandingPage from "../components/LandingPage.tsx";
import SelectMnemonicButton from "../islands/SelectMnemonicButton.tsx";
import SideMenu from "../islands/SideMenu.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Official OFR Short-term Funding Monitor</title>
        <meta charSet="utf-8" />
        <meta name="description" content="for lighthouse"></meta>
        <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css"></link>
        <link rel="stylesheet" href={asset("style.css")} />
      </Head>
      <header>
        <h1>📊 STF Monitor</h1>
      </header>
      <nav>
        <SideMenu />
      </nav>
      <main>
        <LandingPage />
        <SelectMnemonicButton />
      </main>
    </>
  );
}
