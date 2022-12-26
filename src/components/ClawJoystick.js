class ClawJoystick extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --light-color: #DC143C;
        --dark-color: #0005;

        translate: 130px 0;
        z-index: 5;
      }

      .container {
        width: 60px;
        height: 75px;
        position: relative;
        display: grid;
        place-items: center;
        transform: translate(0, -45px);
      }

      .joystick {
        width: 50%;
        height: 85%;
        display: grid;
        place-items: center;
        transform-origin: 50% 100%;
        transition: transform 0.5s;
      }

      :host(.left) .joystick { transform: rotate(-25deg); }
      :host(.right) .joystick { transform: rotate(25deg); }

      .stick {
        background: #999;
        background-image: linear-gradient(
          40deg,
          #888 0 70%,
          #2229 75% 100%
        );
        border-radius: 0 0 15% 15% / 0 0 80% 80%;
        width: 22%;
        height: 100%;
      }

      .ball {
        background: var(--light-color);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: -4px -4px 0 var(--dark-color) inset;
      }

      .ball::before {
        content: "";
        display: block;
        background: #fffc;
        width: 30%;
        height: 20%;
        border-radius: 50%;
        transform: translate(4px, 5px) rotate(-35deg);
      }

      .base {
        position: absolute;
        width: 15px;
        height: 6px;
        border-radius: 10px 10px 0 0 / 10px 10px 0 0;
        bottom: 4px;
        background: black;
      }

      .shadow {
        background: #0009;
        width: 60%;
        height: 20%;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        z-index: -1;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ClawJoystick.styles}</style>
    <div class="container">
      <div class="joystick">
        <div class="ball"></div>
        <div class="stick"></div>
      </div>
      <div class="base"></div>
      <div class="shadow"></div>
    </div>`;
  }
}

customElements.define("claw-joystick", ClawJoystick);
