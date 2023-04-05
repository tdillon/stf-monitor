const sideMenuToggle = new Event('sideMenuToggle', { bubbles: true, composed: true, cancelable: true })

export default function SelectMnemonicButton() {
  return <button onClick={() => dispatchEvent(sideMenuToggle)}>SELECT A MNEMONIC</button>;
}

declare global {
  interface WindowEventMap {
      'sideMenuToggle': 'sideMenuToggle'
  }
}
