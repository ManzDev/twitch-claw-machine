class ManzDev extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        width: 256px;
        height: 256px;
      }

      .avatar {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 2px 2px 8px #0006;
        mix-blend-mode: screen;
      }

      .pixel {
        scale: 30%;
        translate: 6px 50px;
        height: 17px;
        width: 17px;
        box-shadow:
          64px 0px #FFFFFF,
          80px 0px #FFFFFF,
          96px 0px #FFFFFF,
          112px 0px #FFFFFF,
          128px 0px #FFFFFF,
          144px 0px #FFFFFF,
          160px 0px #FFFFFF,
          176px 0px #FFFFFF,
          48px 16px #FFFFFF,
          64px 16px #FFFFFF,
          80px 16px #000000,
          96px 16px #000000,
          112px 16px #000000,
          128px 16px #000000,
          144px 16px #000000,
          160px 16px #000000,
          176px 16px #FFFFFF,
          192px 16px #FFFFFF,
          208px 16px #FFFFFF,
          32px 32px #FFFFFF,
          48px 32px #FFFFFF,
          64px 32px #000000,
          80px 32px #000000,
          96px 32px #000000,
          112px 32px #000000,
          128px 32px #000000,
          144px 32px #000000,
          160px 32px #000000,
          176px 32px #000000,
          192px 32px #000000,
          208px 32px #FFFFFF,
          32px 48px #FFFFFF,
          48px 48px #000000,
          64px 48px #000000,
          80px 48px #000000,
          96px 48px #CC984F,
          112px 48px #CC984F,
          128px 48px #CC984F,
          144px 48px #CC984F,
          160px 48px #1A1A1A,
          176px 48px #000000,
          192px 48px #000000,
          208px 48px #FFFFFF,
          32px 64px #FFFFFF,
          48px 64px #000000,
          64px 64px #000000,
          80px 64px #1A1A1A,
          96px 64px #FFCC80,
          112px 64px #FFCC80,
          128px 64px #FFCC80,
          144px 64px #FFCC80,
          160px 64px #EBB267,
          176px 64px #EBB267,
          192px 64px #FFFFFF,
          208px 64px #FFFFFF,
          32px 80px #FFFFFF,
          48px 80px #000000,
          64px 80px #1A1A1A,
          80px 80px #FFCC80,
          96px 80px #FFCC80,
          112px 80px #000000,
          128px 80px #FFCC80,
          144px 80px #FFCC80,
          160px 80px #000000,
          176px 80px #FFCC80,
          192px 80px #FFFFFF,
          32px 96px #FFFFFF,
          48px 96px #000000,
          64px 96px #1A1A1A,
          80px 96px #FFCC80,
          96px 96px #FFCC80,
          112px 96px #000000,
          128px 96px #FFCC80,
          144px 96px #FFCC80,
          160px 96px #000000,
          176px 96px #FFCC80,
          192px 96px #FFFFFF,
          32px 112px #FFFFFF,
          48px 112px #000000,
          64px 112px #000000,
          80px 112px #FFCC80,
          96px 112px #FFCC80,
          112px 112px #FFCC80,
          128px 112px #EBB267,
          144px 112px #EBB267,
          160px 112px #EBB267,
          176px 112px #FFCC80,
          192px 112px #FFFFFF,
          32px 128px #FFFFFF,
          48px 128px #000000,
          64px 128px #000000,
          80px 128px #CC984F,
          96px 128px #FFCC80,
          112px 128px #FFCC80,
          128px 128px #FFCC80,
          144px 128px #FFCC80,
          160px 128px #FFCC80,
          176px 128px #FFCC80,
          192px 128px #FFFFFF,
          32px 144px #FFFFFF,
          48px 144px #FFFFFF,
          64px 144px #000000,
          80px 144px #000000,
          96px 144px #CC984F,
          112px 144px #CC984F,
          128px 144px #CC984F,
          144px 144px #000000,
          160px 144px #000000,
          176px 144px #FFCC80,
          192px 144px #FFFFFF,
          48px 160px #FFFFFF,
          64px 160px #FFFFFF,
          80px 160px #000000,
          96px 160px #000000,
          112px 160px #000000,
          128px 160px #CC984F,
          144px 160px #CC984F,
          160px 160px #000000,
          176px 160px #CC984F,
          192px 160px #FFFFFF,
          32px 176px #FFFFFF,
          48px 176px #FFFFFF,
          64px 176px #000000,
          80px 176px #1A1A1A,
          96px 176px #000000,
          112px 176px #000000,
          128px 176px #000000,
          144px 176px #000000,
          160px 176px #000000,
          176px 176px #000000,
          192px 176px #FFFFFF,
          32px 192px #FFFFFF,
          48px 192px #000000,
          64px 192px #1A1A1A,
          80px 192px #000000,
          96px 192px #000000,
          112px 192px #000000,
          128px 192px #000000,
          144px 192px #000000,
          160px 192px #000000,
          176px 192px #000000,
          192px 192px #FFFFFF,
          32px 208px #FFFFFF,
          48px 208px #000000,
          64px 208px #1A1A1A,
          80px 208px #000000,
          96px 208px #000000,
          112px 208px #000000,
          128px 208px #17FFFF,
          144px 208px #000000,
          160px 208px #000000,
          176px 208px #1A1A1A,
          192px 208px #FFFFFF,
          32px 224px #FFFFFF,
          48px 224px #1A1A1A,
          64px 224px #000000,
          80px 224px #000000,
          96px 224px #000000,
          112px 224px #CC2554,
          128px 224px #0D2061,
          144px 224px #0D2061,
          160px 224px #000000,
          176px 224px #1A1A1A,
          192px 224px #FFFFFF,
          32px 240px #FFFFFF,
          48px 240px #CC984F,
          64px 240px #CC984F,
          80px 240px #000000,
          96px 240px #000000,
          112px 240px #0D2061,
          128px 240px #E65100,
          144px 240px #17FFFF,
          160px 240px #000000,
          176px 240px #1A1A1A,
          192px 240px #FFFFFF;
        transform: rotate(-5deg) translate(-10px, 22px);
        filter: drop-shadow(2px 2px 10px #0007);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzDev.styles}</style>
    <div class="avatar">
      <div class="pixel"></div>
    </div>`;
  }
}

customElements.define("manz-dev", ManzDev);
