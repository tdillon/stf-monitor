import string_decoder from "https://deno.land/std@0.177.0/node/internal_binding/string_decoder.ts";
import { Component, RenderableProps } from "preact";

interface MyProps {
  kee: string;
}
interface MyState {
  data: Array<apiItem>;
  expand: boolean;
}
interface apiItem {
  mnemonic: string;
  series_name: string;
}

export default class SideMenuItem extends Component<MyProps, MyState> {
  state: MyState = { data: [], expand: false };

  async #getData(): Promise<Array<apiItem>> {
    const resp = await fetch(
      `https://data.financialresearch.gov/v1/metadata/mnemonics?dataset=${this.props.kee}`,
    );

    if (resp.status !== 200) {
      throw new Error("What is going on?");
    }

    return await resp.json();
  }

  #itemToggle = async () => {
    this.setState({ expand: !this.state.expand });
    // Apparently setState doesn't change state immediately, so check for !expand.
    if (!this.state.expand && this.state.data.length === 0) {
      this.setState({ data: await this.#getData() });
    }
  };

  render() {
    return (
      <p>
        <span>
          <button onClick={this.#itemToggle}>
            {this.state.expand ? "🔺" : "🔻"}
          </button>
          {this.props.kee}
        </span>
        {this.state.expand
          ? this.state.data.length === 0
            ? <div>Loading...</div>
            : this.state.data.map((m) => (
              <p>
                <b>{m.mnemonic}</b>
                <br />
                <i>{m.series_name}</i>
                <br/>
                <a class="button" href={`${m.mnemonic}`}>Router SSR</a>
              </p>
            ))
          : <></>}
        <hr />
      </p>
    );
  }
}
