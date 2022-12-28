class BaseClaw extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        place-items: center;
      }

      .container {
        display: contents;
      }

      .gradient {
        --shadow: linear-gradient(transparent, transparent);

        background:
          var(--shadow),
          linear-gradient(
            to right,
            var(--light-color) 0 20%,
            var(--medium-color) 20% 60%,
            var(--dark-color) 60% 100%
          );
      }

      .base-top {
        --light-color: #33bbfe;
        --medium-color: #349ae2;
        --dark-color: #327bb3;
        --shadow: linear-gradient(to bottom, #fff2, #0004);

        width: 35px;
        height: 15px;
      }

      :is(.base-mid, .base-bottom) {
        --light-color: #575b61;
        --medium-color: #33363b;
        --dark-color: #2c2f34;
      }

      .base-mid {
        width: 15px;
        height: 8px;
      }

      .base-bottom {
        --shadow: linear-gradient(to bottom, #111d 0% 1%, transparent 40%);

        width: 10px;
        height: 18px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BaseClaw.styles}</style>
    <div class="container">
      <div class="base-top gradient"></div>
      <div class="base-mid gradient"></div>
      <div class="base-bottom gradient"></div>
    </div>`;
  }
}

customElements.define("base-claw", BaseClaw);
