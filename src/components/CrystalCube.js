import "./TheClaw.js";
import "./GiftBall.js";

class CrystalCube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --cube-width: calc(var(--width) - 14%);
        display: flex;
        justify-content: center;
      }

      .cube-back {
        --width: calc(var(--cube-width) - 30%);

        position: absolute;
        inset: 0;
        width: var(--width);
        background: #532be4;

        translate: 20%;
        z-index: 0;
      }

      .cube-back::before,
      .cube-back::after {
        content: "";
        background: #3d1cb3;
        display: block;
        width: 35px;
        height: 35px;
        position: absolute;
        bottom: -6px;
      }

      .cube-back::after {
        right: -34px;
        clip-path: polygon(0 0, 100% 100%, 0 100%);
      }

      .cube-back::before {
        left: -34px;
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
      }

      .content {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-rows: 15% 1fr 25%;
        justify-content: center;
        justify-items: center;
        height: 100%;
        color: #fff;
      }

      .cube-container {
        width: var(--cube-width);
        background: #fff;
        border: 6px solid var(--shadow-color);
        border-top: 0;
        border-bottom-width: 12px;
        position: relative;
        overflow: hidden;
      }

      .cube-container::after {
        --light-color: #0c34623f;
        --dark-color: #4383de22;

        content: "";
        display: block;
        position: absolute;
        inset: 0;
        background: #278ccb89;
        background: linear-gradient(
          232deg,
          var(--dark-color) 0 29.5%,
          var(--light-color) 30% 34.5%,
          var(--dark-color) 35% 39.5%,
          var(--light-color) 40% 70.5%,
          var(--dark-color) 71% 100%
        );
      }

      .balls-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        transform: translateY(-25%)
      }

      .deep {
        display: flex;
        width: 100%;
        transform: translate(14%, -155%);
        filter: contrast(150%) brightness(40%);
        z-index: -1;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  isClawBlocked() {
    const claw = this.shadowRoot.querySelector("the-claw");
    return claw.blocked;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CrystalCube.styles}</style>
    <div class="cube-container">
      <div class="cube-back"></div>
      <div class="content">
        <the-claw></the-claw>
        <div>
        </div>
        <div class="balls-container">
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <gift-ball></gift-ball>
          <div class="deep">
            <gift-ball></gift-ball>
            <gift-ball></gift-ball>
            <gift-ball></gift-ball>
          </div>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("crystal-cube", CrystalCube);
