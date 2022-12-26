import "./ClawButton.js";
import "./ClawJoystick.js";

class ControlPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        width: 100%;
        height: 100%;
      }

      .container {
        position: relative;
      }

      .container > * {
        position: absolute;
      }

      .board {
        background-color: var(--light-color);
        width: 100%;
        height: 100%;
        clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ControlPanel.styles}</style>
    <div class="container">
      <div class="board"></div>
      <claw-button></claw-button>
      <claw-joystick></claw-joystick>
    </div>`;
  }
}

customElements.define("control-panel", ControlPanel);
