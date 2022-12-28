import "./CrystalCube.js";
import "./ControlPanel.js";
import "./CoinSlots.js";
import "./MadeBox.js";

const STEP = 2;
const LEFT_LIMIT = -60;
const RIGHT_LIMIT = 60;

class ClawMachine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  init() {
    this.claw = {
      x: 0,
      y: -170,
      // rotation: -75
    };
    globalThis.addEventListener("keydown", (ev) => this.onKeydown(ev));
    globalThis.addEventListener("keyup", (ev) => this.onKeyup(ev));
  }

  update() {
    this.style.setProperty("--claw-x", `${this.claw.x}px`);
    this.style.setProperty("--claw-y", `${this.claw.y}px`);
    // this.style.setProperty("--claw-rotation", `${this.claw.rotation}deg`);
  }

  onKeydown(ev) {
    const { key } = ev;

    if (key === "ArrowLeft") {
      const event = new CustomEvent("SPIN_CLAW", { detail: "left" });
      document.dispatchEvent(event);
      this.claw.x = Math.max(LEFT_LIMIT, this.claw.x - STEP);
      this.update();
    } else if (key === "ArrowRight") {
      const event = new CustomEvent("SPIN_CLAW", { detail: "right" });
      document.dispatchEvent(event);
      this.claw.x = Math.min(RIGHT_LIMIT, this.claw.x + STEP);
      this.update();
    } else if (key === " ") {
      const event = new CustomEvent("PRESS_BUTTON", { detail: {} });
      document.dispatchEvent(event);
    }
  }

  onKeyup(ev) {
    const { key } = ev;

    if (key === "ArrowLeft") {
      const event = new CustomEvent("SPIN_CLAW", { detail: "left" });
      document.dispatchEvent(event);
    } else if (key === "ArrowRight") {
      const event = new CustomEvent("SPIN_CLAW", { detail: "right" });
      document.dispatchEvent(event);
    } else if (key === " ") {
      const event = new CustomEvent("RELEASE_BUTTON", { detail: {} });
      document.dispatchEvent(event);
    }
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

        --claw-x: 0;              /* -60px, 60px */
        --claw-y: -170px;         /* -170px, 0px */
        --claw-rotation: -75deg;  /* -35deg, -75deg */
      }

      .machine-container {
        width: var(--width);
        height: var(--height);
        display: grid;
        grid-template-rows: 10% 45% 6% 35% 2%;
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

      .base-machine {
        width: calc(var(--width) - 40px);
        margin: 0 auto;
        background: var(--dark-color);
        border-radius: 0 0 50px 50px
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.init();
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
      <div class="base-machine"></div>
    </div>`;
  }
}

customElements.define("claw-machine", ClawMachine);
