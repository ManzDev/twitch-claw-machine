import "./ArmClaw.js";

class OnlyClaw extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.blocked = false;
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        /* translate: 0 var(--claw-y, -170px); */
        translate: 0 -170px;
        transition: translate 1s;
      }

      :host(.down) .container {
        translate: 0px 0px;
      }

      .only-claw {
        transition: rotate 0.5s;
        position: relative;
      }
      .only-claw.left { rotate: -10deg; }
      .only-claw.right { rotate: 10deg; }

      .extender-claw {
        width: 5px;
        height: 200px;
        margin: auto;
        background: #222;
      }

      gift-ball.chosen {
        display: block;
        position: absolute;
        top: -7px;
        left: 3px;
      }

      .axis {
        width: 20px;
        height: 20px;
        margin: auto;
        border-radius: 50%;
        background: #a6afc2;
        position: relative;
        z-index: 5;
        background-image: radial-gradient(
          circle,
          #a7b0c2 0 15%,
          #54585e 20% 25%,
          #fff 30% 40%,
          #a8b0c3 45% 100%
        );
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  init() {
    document.addEventListener("SPIN_CLAW", (ev) => this.moveClaw(ev.detail));
    document.addEventListener("PRESS_BUTTON", (ev) => this.onPressButton());
  }

  onPressButton() {
    this.down();
    const option = Math.floor(Math.random() * 3);

    if (option === 1) {
      this.lose();
    } else if (option === 2) {
      this.win();
    } else {
      this.fail();
    }
  }

  win() {
    setTimeout(() => this.chooseBall(), 1000);
    setTimeout(() => this.up(), 3000);
    setTimeout(() => this.right(), 4000);
    setTimeout(() => this.drop(true), 5250);
  }

  lose() {
    setTimeout(() => this.close(), 1000);
    setTimeout(() => this.up(), 3000);
    setTimeout(() => this.open(), 4000);
  }

  chooseBall() {
    const onlyClaw = this.shadowRoot.querySelector(".only-claw");
    const markup = /* html */"<gift-ball class=\"chosen\"></gift-ball>";
    onlyClaw.insertAdjacentHTML("beforeend", markup);
  }

  fail() {
    setTimeout(() => this.chooseBall(), 1000);
    setTimeout(() => this.up(), 3000);
    setTimeout(() => this.drop(), 3500);
  }

  up() {
    this.classList.remove("down");
    setTimeout(() => (this.blocked = false), 1000);
  }

  down() {
    this.classList.add("down");
    this.blocked = true;
  }

  right() {
    this.blocked = true;
    const event = new CustomEvent("claw:right", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  drop(save = false) {
    const ball = this.shadowRoot.querySelector("gift-ball.chosen");
    ball.classList.add("fall");

    setTimeout(() => {
      if (!save) {
        ball.remove();
      } else {
        const event = new CustomEvent("transferball", {
          bubbles: true,
          composed: true,
          detail: ball
        });
        ball.classList.remove("fall");
        this.dispatchEvent(event);
      }
    }, 1000);
  }

  open() {
    const arms = [...this.shadowRoot.querySelectorAll("arm-claw")];
    arms.forEach(arm => arm.classList.remove("close"));
  }

  close() {
    const arms = [...this.shadowRoot.querySelectorAll("arm-claw")];
    arms.forEach(arm => arm.classList.add("close"));
  }

  moveClaw(direction) {
    const onlyClaw = this.shadowRoot.querySelector(".only-claw");

    onlyClaw.classList.add(direction);
    setTimeout(() => onlyClaw.classList.remove(direction), 500);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${OnlyClaw.styles}</style>
    <div class="container">
      <div class="extender-claw"></div>
      <div class="only-claw">
        <div class="axis"></div>
        <arm-claw class="left"></arm-claw>
        <arm-claw class="right"></arm-claw>
      </div>
    </div>`;
  }
}

customElements.define("only-claw", OnlyClaw);
