import "./CrystalCube.js";
import "./ControlPanel.js";
import "./CoinSlots.js";
import "./MadeBox.js";

const STEP = 2;
const LEFT_LIMIT = -60;
const RIGHT_LIMIT = 60;

const rollingSound = new Audio("sounds/rolling.mp3");
const beepBoxSound = new Audio("sounds/beepbox.mp3");

const playRolling = () => {
  rollingSound.currentTime = 0;
  rollingSound.play();
};

const playBeepBox = () => {
  beepBoxSound.currentTime = 0;
  beepBoxSound.play();
};

class ClawMachine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  init() {
    this.claw = {
      x: 0
    };
    globalThis.addEventListener("keydown", (ev) => this.onKeydown(ev));
    globalThis.addEventListener("keyup", (ev) => this.onKeyup(ev));
    document.addEventListener("transferball", (ev) => this.winBall(ev.detail));
  }

  winBall(ball) {
    playRolling();
    const slot = this.shadowRoot.querySelector(".output-slot");
    slot.appendChild(ball);
    setTimeout(() => ball.classList.add("outside"), 750);
    setTimeout(() => {
      ball.classList.add("floating");
      playBeepBox();
    }, 1500);
  }

  update() {
    this.style.setProperty("--claw-x", `${this.claw.x}px`);
  }

  onKeydown(ev) {
    const { key } = ev;

    const cube = this.shadowRoot.querySelector("crystal-cube");

    if (cube.isClawBlocked()) {
      return;
    }

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
      this.shadowRoot.querySelector(".output-slot").innerHTML = "";
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
        box-shadow: 0 -10px 0 #581489 inset;
        z-index: 5;
        display: grid;
        grid-template-columns: 1fr 70px;
      }

      .title {
        font-family: "Quicksilver";
        font-size: 2.5rem;
        text-shadow: 2px 2px 1px var(--medium-color);
        margin-top: 2px;
        line-height: 80%;
        letter-spacing: 1px;
        color: #fff;
        text-align: center;
        transform: translate(-20px, 0)
      }

      .title span {
        font-family : "Quicksilver";
        font-size: 1rem;
        text-shadow: 1px 1px 1px #000;
        color: gold;
        display: block;
        transform: translate(50px, -12px) rotate(-5deg);
      }

      .bottom-machine {
        background-color: var(--medium-color);
        border-radius: 0 0 15px 15px;
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 1em;
        position: relative;
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
        border-radius: 0 0 50px 50px;
      }

      .output-slot {
        background: linear-gradient(97deg, #160e1f 0 12px, #2b113e 15px);
        border-radius: 0 5px 5px 0;
        position: absolute;
        top: 20%;
        right: -20px;
        width: 20px;
        height: 125px;
      }

      .chosen {
        position: relative;
        z-index: -1;
        translate: -200% 0;
      }

      .chosen.outside {
        translate: 300% 0;
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
        <img class="alien" src="images/alien.png" alt="Alien">
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
        <div class="output-slot"></div>
      </div>
      <div class="base-machine"></div>
    </div>`;
  }
}

customElements.define("claw-machine", ClawMachine);
