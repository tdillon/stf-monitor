import { Component } from "preact";
import SideMenuItem from "./SideMenuItem.tsx";

interface SideMenuState {
  data: Array<string>;
  show: boolean;
}

export default class extends Component<Record<never, never>, SideMenuState> {
  state: SideMenuState = { data: [], show: false };

  async #getData() {
    const resp = await fetch(
      `https://data.financialresearch.gov/v1/metadata/mnemonics`,
    );

    if (resp.status !== 200) {
      throw new Error("What is going on?");
    }

    const a: Array<string> = await resp.json();

    const data = [
      ...new Set(a.map((x) => x.substring(0, x.indexOf("-")))).keys(),
    ];

    return data;
  }

  render() {
    if (this.state.show) {
      return (
        <div>
          <button onClick={this.#sideMenuToggle}>❌</button>
          <div><b>Mnemonics</b></div>
          {this.state.data.length === 0
            ? <span>Loading...</span>
            : this.state.data.map((m) => <SideMenuItem kee={m} />)}
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.#sideMenuToggle}>&#9776;</button>
        </div>
      );
    }
  }

  #sideMenuToggle = async () => {
    this.setState({ show: !this.state.show });
    // Apparently setState doesn't change state immediately, so check for !show.
    if (!this.state.show && this.state.data.length === 0) {
      this.setState({ data: await this.#getData() });
    }
  };

  override componentDidMount() {
    self.addEventListener("sideMenuToggle", this.#sideMenuToggle);
  }

  override componentWillUnmount() {
    self.removeEventListener("sideMenuToggle", this.#sideMenuToggle);
  }
}
