import { getSticker } from "../modules/getSticker.js";

const COLORS = [
  "#F1A708", "#DA1319", "#00A8D3", "#B752D6",
  "#76A629", "#F86B17", "#22458B"
];

class GiftBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: 50px;

        display: block;
        translate: 0 0;
        transition: translate 0.75s;
      }

      .ball {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        transform: rotate(var(--rotate));
      }

      .transparent {
        background: radial-gradient(ellipse, #fffa, transparent);
        transform-origin: 100% 100%;
        transform: rotate(0deg);
        transition: transform 1s;
        border-radius: var(--semi-size) var(--semi-size) 0 0;
      }

      .gift {
        transform: scale(2) translate(45%, 100%);
        max-width: 64px;
        max-height: 64px;
        width: 36%;
      }

      .semi {
        --semi-size: calc(var(--size) / 2);

        height: 50%;
      }

      .central.piece {
        width: calc(var(--size) + 4px);
        transform: translateX(-2px);
        border-radius: 2px;
        height: 4px;
        background: var(--color);
        position: absolute;
        z-index: 4;
      }

      .opaque {
        background-color: var(--color);
        background-image: radial-gradient(circle at 50% 0%, #0002, #0007);
        border-radius: 0 0 var(--semi-size) var(--semi-size);
        box-shadow: 0 0 24px #0009 inset;
        position: relative;
        z-index: 3;
      }

      :host(.fall) {
        translate: 0 225px;
      }

      :host(.floating) {
        animation: floating 2s ease-in infinite alternate;
      }

      :host(.floating) .transparent {
        transform: rotate(70deg);
      }

      @keyframes floating {
        0% {
          transform: translateY(0);
          filter: drop-shadow(0 0 0px var(--color));
        }
        100% {
          transform: translateY(35px);
          filter: drop-shadow(0 0 25px var(--color));
        }
      }
    `;
  }

  init() {
    const isStatic = this.classList.contains("chosen");
    const giftPicture = getSticker();
    this.putGift(giftPicture);

    if (!isStatic) {
      const rotate = -50 + Math.floor(Math.random() * 100);
      this.style.setProperty("--rotate", `${rotate}deg`);
    }

    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[colorIndex];
    this.style.setProperty("--color", color);
  }

  async connectedCallback() {
    this.render();
    await this.init();
  }

  putGift(picture) {
    const semiTop = this.shadowRoot.querySelector(".ball");
    semiTop.insertAdjacentHTML("afterbegin", /* html */`<img class="gift" src="${picture}" alt="Gift">`);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GiftBall.styles}</style>
    <div class="ball">
      <div class="semi transparent"></div>
      <div class="central piece"></div>
      <div class="semi opaque"></div>
    </div>
    `;
  }
}

customElements.define("gift-ball", GiftBall);
