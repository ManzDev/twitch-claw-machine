class ArmClaw extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: relative;
        display: grid;
        justify-items: center;
        translate: 0 -10px;
      }


      :host(.left) {
        scale: -1 1;
      }

      :host(.right) {

      }

      .container {
        position: absolute;
        top: 0;
      }

      .arm-container {
        transform-origin: 50% 0;
        transform: rotate(var(--claw-rotation, -75deg));
        transition: transform 0.5s;
      }

      :host(.close) {
        animation: close 0.5s linear 1 forwards;
      }

      @keyframes close {
        to {
          --claw-rotation: -35deg;
        }
      }

      .arm {
        width: 11px;
        margin: auto;
        height: 40px;
        background: radial-gradient(circle, #8a94aa, #515254);
        clip-path: polygon(0 0, 30% 100%, 70% 100%, 100% 0);
        position: relative;
        z-index: 5;
      }

      .arm::after {
        content: "";
        display: block;
        position: absolute;
        background: #888;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        bottom: 5%;
        left: 35%;
      }

      .cable {
        position: absolute;
        width: 2px;
        background: #111;
        height: 50px;
        transform-origin: 50% 0;
        transform: translateY(-30px) rotate(20deg);
        display: none;
      }

      .finger {
        width: 5px;
        height: 25px;
        background: linear-gradient(to top, #959eb3 70%, #111 71%);
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        border-radius: 30% 30% 50% 50% / 80% 80% 10% 20%;

        transform-origin: 50% 100%;
        transform: rotate(-90deg) translate(3px, 4px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ArmClaw.styles}</style>

    <div class="container">
      <div class="cable cable-1"></div>
      <div class="cable cable-2"></div>
      <div class="arm-container">
        <div class="arm"></div>
        <div class="finger"></div>
      </div>
    </div>
    `;
  }
}

customElements.define("arm-claw", ArmClaw);
