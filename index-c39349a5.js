(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${r.styles}</style>
    <div class="container">
      <div class="base-top gradient"></div>
      <div class="base-mid gradient"></div>
      <div class="base-bottom gradient"></div>
    </div>`}}customElements.define("base-claw",r);class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        position: relative;
        display: grid;
        justify-items: center;
        translate: 0 -10px;
      }


      :host(.left) {
        scale: -1 1;
      }

      :host(.right) {

      }

      .container {
        position: absolute;
        top: 0;
      }

      .arm-container {
        transform-origin: 50% 0;
        transform: rotate(var(--claw-rotation, -75deg));
        transition: transform 0.5s;
      }

      :host(.close) {
        animation: close 0.5s linear 1 forwards;
      }

      @keyframes close {
        to {
          --claw-rotation: -35deg;
        }
      }

      .arm {
        width: 11px;
        margin: auto;
        height: 40px;
        background: radial-gradient(circle, #8a94aa, #515254);
        clip-path: polygon(0 0, 30% 100%, 70% 100%, 100% 0);
        position: relative;
        z-index: 5;
      }

      .arm::after {
        content: "";
        display: block;
        position: absolute;
        background: #888;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        bottom: 5%;
        left: 35%;
      }

      .cable {
        position: absolute;
        width: 2px;
        background: #111;
        height: 50px;
        transform-origin: 50% 0;
        transform: translateY(-30px) rotate(20deg);
        display: none;
      }

      .finger {
        width: 5px;
        height: 25px;
        background: linear-gradient(to top, #959eb3 70%, #111 71%);
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        border-radius: 30% 30% 50% 50% / 80% 80% 10% 20%;

        transform-origin: 50% 100%;
        transform: rotate(-90deg) translate(3px, 4px);
      }
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>

    <div class="container">
      <div class="cable cable-1"></div>
      <div class="cable cable-2"></div>
      <div class="arm-container">
        <div class="arm"></div>
        <div class="finger"></div>
      </div>
    </div>
    `}}customElements.define("arm-claw",n);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
      }

      .container {
        translate: 0 var(--claw-y, -170px);
        transition: translate 1s;
      }

      :host(.down) {
        animation: down 3s linear 1;
      }

      @keyframes down {
        0%, 100% {
          --claw-y: -170px;
        }

        35%, 65% {
          --claw-y: 0px;
        }
      }

      .only-claw { transition: rotate 0.5s; }
      .only-claw.left { rotate: -10deg; }
      .only-claw.right { rotate: 10deg; }

      .extender-claw {
        width: 5px;
        height: 180px;
        margin: auto;
        background: #222;
      }

      .axis {
        width: 20px;
        height: 20px;
        margin: auto;
        border-radius: 50%;
        background: #a6afc2;
        position: relative;
        z-index: 5;
        background-image: radial-gradient(
          circle,
          #a7b0c2 0 15%,
          #54585e 20% 25%,
          #fff 30% 40%,
          #a8b0c3 45% 100%
        );
      }
    `}connectedCallback(){this.render(),this.init()}init(){document.addEventListener("SPIN_CLAW",t=>this.moveClaw(t.detail)),document.addEventListener("PRESS_BUTTON",t=>this.onPressButton())}onPressButton(){this.classList.add("down"),setTimeout(()=>this.onCloseClaw(),1250),setTimeout(()=>this.onOpenClaw(),4e3)}onCloseClaw(){[...this.shadowRoot.querySelectorAll("arm-claw")].forEach(e=>e.classList.add("close"))}onOpenClaw(){this.classList.remove("down"),[...this.shadowRoot.querySelectorAll("arm-claw")].forEach(e=>e.classList.remove("close"))}moveClaw(t){const e=this.shadowRoot.querySelector(".only-claw");e.classList.add(t),setTimeout(()=>{e.classList.remove(t)},500)}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
      <div class="extender-claw"></div>
      <div class="only-claw">
        <div class="axis"></div>
        <arm-claw class="left"></arm-claw>
        <arm-claw class="right"></arm-claw>
      </div>
    </div>`}}customElements.define("only-claw",p);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="claw-container">
      <base-claw></base-claw>
      <only-claw></only-claw>
    </div>`}}customElements.define("the-claw",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
        grid-template-rows: 15% 1fr 15%;
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

      .deleteme {
        display: none;
      }
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <div class="cube-container">
      <div class="cube-back"></div>
      <div class="content">
        <the-claw></the-claw>
        <div></div>
        <div class="deleteme">CONTENIDO</div>
      </div>
    </div>`}}customElements.define("crystal-cube",c);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}init(){document.addEventListener("PRESS_BUTTON",()=>this.onPressButton()),document.addEventListener("RELEASE_BUTTON",()=>this.onReleaseButton())}connectedCallback(){this.render(),this.init()}onPressButton(){this.shadowRoot.querySelector(".button").classList.add("pressed")}onReleaseButton(){const t=this.shadowRoot.querySelector(".button");setTimeout(()=>t.classList.remove("pressed"),250)}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="container">
      <div class="button"></div>
      <div class="shadow"></div>
    </div>`}}customElements.define("claw-button",l);class x extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}init(){document.addEventListener("SPIN_CLAW",t=>this.moveJoystick(t.detail))}static get styles(){return`
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
    `}moveJoystick(t){this.classList.add(t),setTimeout(()=>{this.classList.remove(t)},500)}connectedCallback(){this.render(),this.init()}render(){this.shadowRoot.innerHTML=`
    <style>${x.styles}</style>
    <div class="container">
      <div class="joystick">
        <div class="ball"></div>
        <div class="stick"></div>
      </div>
      <div class="base"></div>
      <div class="shadow"></div>
    </div>`}}customElements.define("claw-joystick",x);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
    <div class="container">
      <div class="board"></div>
      <claw-button></claw-button>
      <claw-joystick></claw-joystick>
    </div>`}}customElements.define("control-panel",h);class F extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {

      }

      .container {
        background: #bfbfbf;
        width: 55px;
        height: 100px;
        padding: 5px;
        position: relative;

        display: grid;
        justify-items: center;
        gap: 5px;
        grid-template-rows: 1fr 0.5fr 1fr;
      }

      .coin.box {
        background: #5e5e5e;
        border: 4px solid #dddddd;
        border-left-width: 10px;
        border-right-width: 10px;
        width: 6px;
        height: 25px;
      }

      .coin.eject {
        width: 15px;
        height: 15px;
        background: #ddd;
        display: grid;
        justify-items: center;
        align-items: end;
        translate: 0 20px;
      }

      .coin.eject::after {
        content: "";
        display: block;
        background: #5e5e5e;
        width: 6px;
        height: 25px;
        position: absolute;
        translate: 0 -25%;
      }

      .button.eject {
        font-family: "EnterCommand";
        font-size: 0.8rem;
        padding: 0 6px;
        font-weight: bold;
        background: #11660a;
        background: #9f2b0e;
        color: #fff;
        border: 2px solid #0005;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .screw {
        position: absolute;
        background: #5e5e5e;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .screw-1 {
        top: 4px;
        left: 4px;
      }

      .screw-2 {
        top: 4px;
        right: 4px;
      }

      .screw-3 {
        bottom: 4px;
        left: 4px;
      }

      .screw-4 {
        bottom: 4px;
        right: 4px;
      }
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${F.styles}</style>
    <div class="container">
      <div class="coin box"></div>
      <div class="button eject">PRESS</div>
      <div class="coin eject"></div>
      <div class="screw screw-1"></div>
      <div class="screw screw-2"></div>
      <div class="screw screw-3"></div>
      <div class="screw screw-4"></div>
    </div>`}}customElements.define("coin-slots",F);class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${u.styles}</style>
    <div class="avatar">
      <div class="pixel"></div>
    </div>`}}customElements.define("manz-dev",u);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">
      <span>Gotta catch 'em all</span>
      <div class="key"></div>
      <manz-dev></manz-dev>
    </div>
    <div class="hinge-container">
      <div class="hinge"></div>
      <div class="hinge"></div>
    </div>
    `}}customElements.define("made-box",m);const g=2,v=-60,w=60;class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}init(){this.claw={x:0,y:-170},globalThis.addEventListener("keydown",t=>this.onKeydown(t)),globalThis.addEventListener("keyup",t=>this.onKeyup(t))}update(){this.style.setProperty("--claw-x",`${this.claw.x}px`),this.style.setProperty("--claw-y",`${this.claw.y}px`)}onKeydown(t){const{key:e}=t;if(e==="ArrowLeft"){const s=new CustomEvent("SPIN_CLAW",{detail:"left"});document.dispatchEvent(s),this.claw.x=Math.max(v,this.claw.x-g),this.update()}else if(e==="ArrowRight"){const s=new CustomEvent("SPIN_CLAW",{detail:"right"});document.dispatchEvent(s),this.claw.x=Math.min(w,this.claw.x+g),this.update()}else if(e===" "){const s=new CustomEvent("PRESS_BUTTON",{detail:{}});document.dispatchEvent(s)}}onKeyup(t){const{key:e}=t;if(e==="ArrowLeft"){const s=new CustomEvent("SPIN_CLAW",{detail:"left"});document.dispatchEvent(s)}else if(e==="ArrowRight"){const s=new CustomEvent("SPIN_CLAW",{detail:"right"});document.dispatchEvent(s)}else if(e===" "){const s=new CustomEvent("RELEASE_BUTTON",{detail:{}});document.dispatchEvent(s)}}static get styles(){return`
      :host {
        --width: 250px;
        --height: calc(var(--width) * 2.5);
        --dark-color: #1E0E30;
        --medium-color: #4B0082;
        --shadow-color: #6f06b9;
        --light-color: #9932CC;

        --claw-x: 0;              /* -60px, 60px */
        --claw-y: -170px;         /* -170px, 0px */
        --claw-rotation: -75deg;  /* -35deg, -75deg */
      }

      .machine-container {
        width: var(--width);
        height: var(--height);
        display: grid;
        grid-template-rows: 10% 45% 6% 35% 2%;
      }

      .top-machine {
        background-color: var(--light-color);
        width: calc(var(--width) - 12px);
        margin: auto;
        border-radius: 10px;
        box-shadow: 0 -10px 0 #581489 inset;
      }

      .title {
        font-family: "Arcade Interlaced";
        font-size: 1.85rem;
        text-shadow: 2px 2px 1px var(--medium-color);
        margin-top: 2px;
        color: #fff;
        text-align: center;
        transform: translate(-20px, 0)
      }

      .title span {
        font-family : "Honey Script";
        font-size: 1.2rem;
        text-shadow: 1px 1px 1px #000;
        color: red;
        display: block;
        transform: translate(50px, -12px) rotate(-5deg);
      }

      .bottom-machine {
        background-color: var(--medium-color);
        border-radius: 0 0 15px 15px;
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 1em;
      }

      .coin-container,
      .box-container {
        display: grid;
        place-items: center;
      }

      .base-machine {
        width: calc(var(--width) - 40px);
        margin: 0 auto;
        background: var(--dark-color);
        border-radius: 0 0 50px 50px
      }
    `}connectedCallback(){this.render(),this.init()}render(){this.shadowRoot.innerHTML=`
    <style>${b.styles}</style>
    <div class="machine-container">
      <div class="top-machine">
        <div class="title">CLAW <span>MANZCHINE</span></div>
      </div>
      <crystal-cube></crystal-cube>
      <control-panel></control-panel>
      <div class="bottom-machine">
        <div class="coin-container">
          <coin-slots></coin-slots>
        </div>
        <div class="box-container">
          <made-box></made-box>
        </div>
      </div>
      <div class="base-machine"></div>
    </div>`}}customElements.define("claw-machine",b);
