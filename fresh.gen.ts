// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[mnemonic].tsx";
import * as $1 from "./routes/index.tsx";
import * as $2 from "./routes/m/[key].tsx";
import * as $3 from "./routes/m/[key]/[mnemonic].tsx";
import * as $$0 from "./islands/MyIsland.tsx";
import * as $$1 from "./islands/SelectMnemonicButton.tsx";
import * as $$2 from "./islands/SideMenu.tsx";
import * as $$3 from "./islands/SideMenuItem.tsx";

const manifest = {
  routes: {
    "./routes/[mnemonic].tsx": $0,
    "./routes/index.tsx": $1,
    "./routes/m/[key].tsx": $2,
    "./routes/m/[key]/[mnemonic].tsx": $3,
  },
  islands: {
    "./islands/MyIsland.tsx": $$0,
    "./islands/SelectMnemonicButton.tsx": $$1,
    "./islands/SideMenu.tsx": $$2,
    "./islands/SideMenuItem.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
