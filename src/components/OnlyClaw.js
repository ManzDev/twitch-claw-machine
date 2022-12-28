import "./ArmClaw.js";

class OnlyClaw extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        translate: 0 var(--claw-y, -170px);
        transition: translate 1s;
      }

      :host(.down) {
        animation: down 3s linear 1;
      }

      @keyframes down {
        0%, 100% {
          --claw-y: -170px;
        }

        35%, 65% {
          --claw-y: 0px;
        }
      }

      .only-claw { transition: rotate 0.5s; }
      .only-claw.left { rotate: -10deg; }
      .only-claw.right { rotate: 10deg; }

      .extender-claw {
        width: 5px;
        height: 180px;
        margin: auto;
        background: #222;
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
    this.classList.add("down");
    setTimeout(() => this.onCloseClaw(), 1250);
    setTimeout(() => this.onOpenClaw(), 4000);
  }

  onCloseClaw() {
    const arms = [...this.shadowRoot.querySelectorAll("arm-claw")];
    arms.forEach(arm => arm.classList.add("close"));
  }

  onOpenClaw() {
    this.classList.remove("down");
    const arms = [...this.shadowRoot.querySelectorAll("arm-claw")];
    arms.forEach(arm => arm.classList.remove("close"));
  }

  moveClaw(direction) {
    const onlyClaw = this.shadowRoot.querySelector(".only-claw");

    onlyClaw.classList.add(direction);
    setTimeout(() => {
      onlyClaw.classList.remove(direction);
    }, 500);
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
