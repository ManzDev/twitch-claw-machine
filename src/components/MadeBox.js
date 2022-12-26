import "./ManzDev.js";

class MadeBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: relative;
      }

      .container {
        width: 100px;
        height: 100px;
        border: 2px solid #0005;
        overflow: hidden;
        display: flex;
        justify-content: center;
        position: relative;
      }

      span {
        max-width: 75px;
        text-align: center;
        color: var(--light-color);
        font-family: EnterCommand;
        font-size: 1.1rem;
        letter-spacing: -0.5px;
        margin-top: 0.6em;
        font-weight: bold;
        position: absolute;
      }

      .key {
        border: 2px solid #fff2;
        width: 12px;
        height: 12px;
        position: absolute;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 2px;
        top: 40%;
      }

      .key::after {
        content: "";
        display: block;
        background: #111;
        height: 7px;
        width: 2px;
      }

      .hinge-container {
        width: 8px;
        height: 100%;
        position: absolute;
        display: grid;
        left: -3px;
        top: 15px;
      }

      .hinge {
        background: #320057;
        width: 8px;
        height: 18px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${MadeBox.styles}</style>
    <div class="container">
      <span>Gotta catch 'em all</span>
      <div class="key"></div>
      <manz-dev></manz-dev>
    </div>
    <div class="hinge-container">
      <div class="hinge"></div>
      <div class="hinge"></div>
    </div>
    `;
  }
}

customElements.define("made-box", MadeBox);
