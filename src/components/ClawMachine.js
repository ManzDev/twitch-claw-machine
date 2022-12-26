import "./CrystalCube.js";
import "./ControlPanel.js";
import "./CoinSlots.js";
import "./MadeBox.js";

class ClawMachine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 250px;
        --height: calc(var(--width) * 2.5);
        --dark-color: #1E0E30;
        --medium-color: #4B0082;
        --shadow-color: #6f06b9;
        --light-color: #9932CC;
      }

      .machine-container {
        width: var(--width);
        height: var(--height);
        display: grid;
        grid-template-rows: 10% 45% 6% 35%;
      }

      .top-machine {
        background-color: var(--light-color);
        width: calc(var(--width) - 12px);
        margin: auto;
        border-radius: 10px;
        box-shadow: 0 -10px 0 #581489 inset;
      }

      .title {
        font-family: "Arcade Interlaced";
        font-size: 1.85rem;
        text-shadow: 2px 2px 1px var(--medium-color);
        margin-top: 2px;
        color: #fff;
        text-align: center;
        transform: translate(-20px, 0)
      }

      .title span {
        font-family : "Honey Script";
        font-size: 1.2rem;
        text-shadow: 1px 1px 1px #000;
        color: red;
        display: block;
        transform: translate(50px, -12px) rotate(-5deg);
      }

      .bottom-machine {
        background-color: var(--medium-color);
        border-radius: 0 0 15px 15px;
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 1em;
      }

      .coin-container,
      .box-container {
        display: grid;
        place-items: center;
      }

      coin-slots {

      }

      made-box {

      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ClawMachine.styles}</style>
    <div class="machine-container">
      <div class="top-machine">
        <div class="title">CLAW <span>MANZCHINE</span></div>
      </div>
      <crystal-cube></crystal-cube>
      <control-panel></control-panel>
      <div class="bottom-machine">
        <div class="coin-container">
          <coin-slots></coin-slots>
        </div>
        <div class="box-container">
          <made-box></made-box>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("claw-machine", ClawMachine);
