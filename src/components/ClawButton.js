class ClawButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --light-color: #DC143C;
        --dark-color: #660a1b;

        translate: 60px 0;
      }

      .container {
        width: 50px;
        height: 30px;
        position: relative;
        display: grid;
        place-items: center;
      }

      .button {
        background: var(--light-color);
        width: 75%;
        height: 30%;
        box-shadow:
          0 2px 0 var(--dark-color),
          0 4px 0 var(--dark-color),
          0 6px 0 var(--dark-color),
          0 8px 0 var(--dark-color),
          0 10px 0 var(--dark-color);
        border-radius: 50%;
        position: relative;
        z-index: 4;
        transform: translate(0, -4px);
        transition:
          transform 0.5s,
          box-shadow 0.5s;
      }

      .button.pressed {
        box-shadow:
          0 1px 0 var(--dark-color),
          0 2px 0 var(--dark-color),
          0 3px 0 var(--dark-color),
          0 4px 0 var(--dark-color),
          0 5px 0 var(--dark-color);
        transform: translate(0, 1px);
      }

      .shadow {
        background: #0009;
        width: 100%;
        height: 60%;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
      }
    `;
  }

  init() {
    document.addEventListener("PRESS_BUTTON", () => this.onPressButton());
    document.addEventListener("RELEASE_BUTTON", () => this.onReleaseButton());
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  onPressButton() {
    const button = this.shadowRoot.querySelector(".button");
    button.classList.add("pressed");
  }

  onReleaseButton() {
    const button = this.shadowRoot.querySelector(".button");
    setTimeout(() => button.classList.remove("pressed"), 250);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ClawButton.styles}</style>
    <div class="container">
      <div class="button"></div>
      <div class="shadow"></div>
    </div>`;
  }
}

customElements.define("claw-button", ClawButton);
