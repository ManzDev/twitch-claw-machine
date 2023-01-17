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

      :host(.right) {
        transform: translateX(65px);
        transition-duration: 1s;
      }

      :host(.back) {
        transition-duration: 1s;
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
    this.addEventListener("claw:right", () => this.moveRight());
  }

  moveRight() {
    this.classList.add("right");
    setTimeout(() => {
      this.classList.remove("right");
      this.classList.add("back");
    }, 1500);
    setTimeout(() => this.classList.remove("back"), 2500);
  }

  get blocked() {
    return this.shadowRoot.querySelector("only-claw").blocked;
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
