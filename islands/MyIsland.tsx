import { Component, RenderableProps } from "preact";

export default class DropboxUI
  extends Component<{ dataset: string; kee: string }, Record<never, never>> {
  state = { info: "Loading ..." };

  override async componentDidMount() {
    const resp = await fetch(
      `https://data.financialresearch.gov/v1/metadata/mnemonics?dataset=${this.props.kee}`,
    );
    if (resp.status !== 200) {
      this.setState({ info: `Error loading mnemonics for ${this.props.kee}.` });
    }
    this.setState({
      info: `${(await resp.json()).length} mnemonics for ${this.props.kee}`,
    });
  }

  render() {
    return (
      <div>
        <a href={`m/${this.props.kee}`}>
          <b>{this.props.dataset}</b>
        </a>
        &mdash;
        <span>[{this.props.kee}]</span>
        <br />
        <i>{this.state.info}</i>
      </div>
    );
  }
}
