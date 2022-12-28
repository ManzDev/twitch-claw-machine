import "./BaseClaw.js";
import "./OnlyClaw.js";

class TheClaw extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        transform: translateX(var(--claw-x, 0));
        transition: transform 0.1s linear;
      }

      .claw-container {
        width: 55px;
        height: 300px;
      }

      base-claw {
        position: relative;
        z-index: 5;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TheClaw.styles}</style>
    <div class="claw-container">
      <base-claw></base-claw>
      <only-claw></only-claw>
    </div>`;
  }
}

customElements.define("the-claw", TheClaw);
