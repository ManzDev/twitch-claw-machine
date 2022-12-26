class CoinSlots extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        background: #bfbfbf;
        width: 55px;
        height: 100px;
        padding: 5px;
        position: relative;

        display: grid;
        justify-items: center;
        gap: 5px;
        grid-template-rows: 1fr 0.5fr 1fr;
      }

      .coin.box {
        background: #5e5e5e;
        border: 4px solid #dddddd;
        border-left-width: 10px;
        border-right-width: 10px;
        width: 6px;
        height: 25px;
      }

      .coin.eject {
        width: 15px;
        height: 15px;
        background: #ddd;
        display: grid;
        justify-items: center;
        align-items: end;
        translate: 0 20px;
      }

      .coin.eject::after {
        content: "";
        display: block;
        background: #5e5e5e;
        width: 6px;
        height: 25px;
        position: absolute;
        translate: 0 -25%;
      }

      .button.eject {
        font-family: "EnterCommand";
        font-size: 0.8rem;
        padding: 0 6px;
        font-weight: bold;
        background: #11660a;
        background: #9f2b0e;
        color: #fff;
        border: 2px solid #0005;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .screw {
        position: absolute;
        background: #5e5e5e;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .screw-1 {
        top: 4px;
        left: 4px;
      }

      .screw-2 {
        top: 4px;
        right: 4px;
      }

      .screw-3 {
        bottom: 4px;
        left: 4px;
      }

      .screw-4 {
        bottom: 4px;
        right: 4px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CoinSlots.styles}</style>
    <div class="container">
      <div class="coin box"></div>
      <div class="button eject">PRESS</div>
      <div class="coin eject"></div>
      <div class="screw screw-1"></div>
      <div class="screw screw-2"></div>
      <div class="screw screw-3"></div>
      <div class="screw screw-4"></div>
    </div>`;
  }
}

customElements.define("coin-slots", CoinSlots);
