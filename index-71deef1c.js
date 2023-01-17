(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${n.styles}</style>
    <div class="container">
      <div class="base-top gradient"></div>
      <div class="base-mid gradient"></div>
      <div class="base-bottom gradient"></div>
    </div>`}}customElements.define("base-claw",n);class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
        transform: rotate(-75deg);
        transition: transform 0.5s;
      }

      :host(.close) .arm-container {
        transform: rotate(-35deg);
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
    <style>${r.styles}</style>

    <div class="container">
      <div class="cable cable-1"></div>
      <div class="cable cable-2"></div>
      <div class="arm-container">
        <div class="arm"></div>
        <div class="finger"></div>
      </div>
    </div>
    `}}customElements.define("arm-claw",r);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.blocked=!1}static get styles(){return`
      :host {
      }

      .container {
        /* translate: 0 var(--claw-y, -170px); */
        translate: 0 -170px;
        transition: translate 1s;
      }

      :host(.down) .container {
        translate: 0px 0px;
      }

      .only-claw {
        transition: rotate 0.5s;
        position: relative;
      }
      .only-claw.left { rotate: -10deg; }
      .only-claw.right { rotate: 10deg; }

      .extender-claw {
        width: 5px;
        height: 200px;
        margin: auto;
        background: #222;
      }

      gift-ball.chosen {
        display: block;
        position: absolute;
        top: -7px;
        left: 3px;
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
    `}connectedCallback(){this.render(),this.init()}init(){document.addEventListener("SPIN_CLAW",t=>this.moveClaw(t.detail)),document.addEventListener("PRESS_BUTTON",t=>this.onPressButton())}onPressButton(){this.down();const t=Math.floor(Math.random()*3);t===1?this.lose():t===2?this.win():this.fail()}win(){setTimeout(()=>this.chooseBall(),1e3),setTimeout(()=>this.up(),3e3),setTimeout(()=>this.right(),4e3),setTimeout(()=>this.drop(!0),5250)}lose(){setTimeout(()=>this.close(),1e3),setTimeout(()=>this.up(),3e3),setTimeout(()=>this.open(),4e3)}chooseBall(){const t=this.shadowRoot.querySelector(".only-claw"),e='<gift-ball class="chosen"></gift-ball>';t.insertAdjacentHTML("beforeend",e)}fail(){setTimeout(()=>this.chooseBall(),1e3),setTimeout(()=>this.up(),3e3),setTimeout(()=>this.drop(),3500)}up(){this.classList.remove("down"),setTimeout(()=>this.blocked=!1,1e3)}down(){this.classList.add("down"),this.blocked=!0}right(){this.blocked=!0;const t=new CustomEvent("claw:right",{bubbles:!0,composed:!0});this.dispatchEvent(t)}drop(t=!1){const e=this.shadowRoot.querySelector("gift-ball.chosen");e.classList.add("fall"),setTimeout(()=>{if(!t)e.remove();else{const s=new CustomEvent("transferball",{bubbles:!0,composed:!0,detail:e});e.classList.remove("fall"),e.classList.add("transfer"),this.dispatchEvent(s)}},1e3)}open(){[...this.shadowRoot.querySelectorAll("arm-claw")].forEach(e=>e.classList.remove("close"))}close(){[...this.shadowRoot.querySelectorAll("arm-claw")].forEach(e=>e.classList.add("close"))}moveClaw(t){const e=this.shadowRoot.querySelector(".only-claw");e.classList.add(t),setTimeout(()=>e.classList.remove(t),500)}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
      <div class="extender-claw"></div>
      <div class="only-claw">
        <div class="axis"></div>
        <arm-claw class="left"></arm-claw>
        <arm-claw class="right"></arm-claw>
      </div>
    </div>`}}customElements.define("only-claw",p);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.addEventListener("claw:right",()=>this.moveRight())}moveRight(){this.classList.add("right"),setTimeout(()=>{this.classList.remove("right"),this.classList.add("back")},1500),setTimeout(()=>this.classList.remove("back"),2500)}get blocked(){return this.shadowRoot.querySelector("only-claw").blocked}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="claw-container">
      <base-claw></base-claw>
      <only-claw></only-claw>
    </div>`}}customElements.define("the-claw",l);const v=["manzdev.png","batmanz.gif","fry.png","sonic.png","musical-manz.gif","scientific-manz.png","artist-manz.png","hulk.gif","manz-streamer.gif","flash.png","policemanz.png","joker-manz.png","mario.png","luigi.png","manz-vue-fanatic.png","manz-naruto.png","manz-windu.png","supermanz.gif","goku.gif","indiana-manz.png","manzdalorian.png","venom.gif","manz-thor.png","manzrty-mcfly.png","manz-copilot.png","optimus-manz.png","manzgatron.png","hemanz.gif","amongmanz.png","rambo.png","manznoel.png","manztrix.gif","terminator.png","captain-america.png","one-punch-manz.png","manz-yisus.gif","tanooki.png","hitmanz.png","lufi.png","rocky.png","super-manzrio.png","gandalf.png","jack.png","joker.png","queen.png","king.png","gopher.png","gordon-freemanz.png","007.png","manz-astronaut.png","ironmanz.png","tux.png","squid-soldier-a.png","squid-soldier-b.png","squid-soldier-c.png","manzdevocado.png","operator.png","glados-potato.png","ciclope.png","manzana.png","wolverine.png","pirate.png","streamer.png","teacher.png","obimanzkenobi.png","spheric-cow.png","manz-vite.png","manz-dibujando.png","manz-blocks.png","san-goncy.png","baby-yoda.png","dr-robotnik.png","soldier-manz.png","tennis-manz.png","manz-dross.gif","tails.png","knuckles.png","yoshi.png","manz-clippy.png","homer-manz.png","manz-mechanic.png","manz-news.gif","manz-ie-news.png","rainmanz.png","manz-pijama.gif","bubbles.png","blossom.png","buttercup.png","dibujando-css.png","kent-brockmanz.png","manz-cow.png","subzero.png","scorpion.gif","toasty.gif","manz-goose.png","howler.png","coffee-with-manz.gif","3-head-monkey.png","guybrush-1.png","guybrush-2.png","guybrush-3.png","murray.gif","potter.gif","morfeo.png","newt-scamanzder.gif","escarbato.png","darth-vader.gif","manz-constructor.gif","head.gif","demogorgon.gif","ryu.png","ken.png","splinter.png","michelangelo.png","donatello.png","raphael.png","leonardo.png","shredder.png","horsemanz.gif","sherlock-holmanz.png","bender.png","chess-king.png","chess-queen.png","chess-bishop.png","chess-knight.png","chess-rook.png","chess-pawn.png","internet-explorer.png","google-chrome.png","mozilla-firefox.png","opera.png","microsoft-edge.png","apple-safari.png","ie-dead.gif","dr-strange.png","dr-strange-cloak.png","strange-defender.png","strange-sinister.png","strange-zombie.png","scarlet-witch.png","blinky.png","inky.png","pinky.png","clyde.png","scared-ghost.png","statue.png","bombermanz.png","honest-work.png","krilin.png","finn.png","ash.png","pitufo.png","pitufo-angry.png","pitufo-filosofo.png","pitufo-bromista.png","pitufina.png","papa-pitufo.png","golden-manz.gif","pinocho.gif","spiderman.gif","alien.png","bmo.png","fantasmin.png","mordecai.png","musculoso.png","papaleta.png","rigby.png","skips.png","benson.png","chavo-ocho.gif","deedee.png","dexter.png","johnny-bravo.png","doc-brown.png","peach.png","toad.png","donkey-kong.png","woody.png","charizard.gif","piccolo.gif","padawans.png"],z=()=>{const f=Math.floor(Math.random()*v.length);return"https://manz.dev/assets/stickers/"+v[f]},w=["#F1A708","#DA1319","#00A8D3","#B752D6","#76A629","#F86B17","#22458B"];class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}init(){const t=this.classList.contains("chosen"),e=z();if(this.putGift(e),!t){const a=-50+Math.floor(Math.random()*100);this.style.setProperty("--rotate",`${a}deg`)}const s=Math.floor(Math.random()*w.length),o=w[s];this.style.setProperty("--color",o)}async connectedCallback(){this.classList.contains("transfer")?this.classList.remove("transfer"):(this.render(),await this.init())}putGift(t){this.shadowRoot.querySelector(".ball").insertAdjacentHTML("afterbegin",`<img class="gift" src="${t}" alt="Gift">`)}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="ball">
      <div class="semi transparent"></div>
      <div class="central piece"></div>
      <div class="semi opaque"></div>
    </div>
    `}}customElements.define("gift-ball",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}isClawBlocked(){return this.shadowRoot.querySelector("the-claw").blocked}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
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
    </div>`}}customElements.define("crystal-cube",c);class x extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${x.styles}</style>
    <div class="container">
      <div class="button"></div>
      <div class="shadow"></div>
    </div>`}}customElements.define("claw-button",x);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}init(){document.addEventListener("SPIN_CLAW",t=>this.moveJoystick(t.detail))}static get styles(){return`
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
    <style>${h.styles}</style>
    <div class="container">
      <div class="joystick">
        <div class="ball"></div>
        <div class="stick"></div>
      </div>
      <div class="base"></div>
      <div class="shadow"></div>
    </div>`}}customElements.define("claw-joystick",h);class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${g.styles}</style>
    <div class="container">
      <div class="board"></div>
      <claw-button></claw-button>
      <claw-joystick></claw-joystick>
    </div>`}}customElements.define("control-panel",g);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${m.styles}</style>
    <div class="container">
      <div class="coin box"></div>
      <div class="button eject">PRESS</div>
      <div class="coin eject"></div>
      <div class="screw screw-1"></div>
      <div class="screw screw-2"></div>
      <div class="screw screw-3"></div>
      <div class="screw screw-4"></div>
    </div>`}}customElements.define("coin-slots",m);class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    </div>`}}customElements.define("manz-dev",u);class F extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${F.styles}</style>
    <div class="container">
      <span>Gotta catch 'em all</span>
      <div class="key"></div>
      <manz-dev></manz-dev>
    </div>
    <div class="hinge-container">
      <div class="hinge"></div>
      <div class="hinge"></div>
    </div>
    `}}customElements.define("made-box",F);const y=2,L=-60,E=60,k=new Audio("sounds/rolling.mp3"),C=new Audio("sounds/beepbox.mp3"),T=()=>{k.currentTime=0,k.play()},A=()=>{C.currentTime=0,C.play()};class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}init(){this.claw={x:0},globalThis.addEventListener("keydown",t=>this.onKeydown(t)),globalThis.addEventListener("keyup",t=>this.onKeyup(t)),document.addEventListener("transferball",t=>this.winBall(t.detail))}winBall(t){T(),this.shadowRoot.querySelector(".output-slot").appendChild(t),setTimeout(()=>t.classList.add("outside"),750),setTimeout(()=>{t.classList.add("floating"),A()},1500)}update(){this.style.setProperty("--claw-x",`${this.claw.x}px`)}onKeydown(t){const{key:e}=t;if(!this.shadowRoot.querySelector("crystal-cube").isClawBlocked()){if(e==="ArrowLeft"){const o=new CustomEvent("SPIN_CLAW",{detail:"left"});document.dispatchEvent(o),this.claw.x=Math.max(L,this.claw.x-y),this.update()}else if(e==="ArrowRight"){const o=new CustomEvent("SPIN_CLAW",{detail:"right"});document.dispatchEvent(o),this.claw.x=Math.min(E,this.claw.x+y),this.update()}else if(e===" "){const o=new CustomEvent("PRESS_BUTTON",{detail:{}});document.dispatchEvent(o),this.shadowRoot.querySelector(".output-slot").innerHTML=""}}}onKeyup(t){const{key:e}=t;if(e==="ArrowLeft"){const s=new CustomEvent("SPIN_CLAW",{detail:"left"});document.dispatchEvent(s)}else if(e==="ArrowRight"){const s=new CustomEvent("SPIN_CLAW",{detail:"right"});document.dispatchEvent(s)}else if(e===" "){const s=new CustomEvent("RELEASE_BUTTON",{detail:{}});document.dispatchEvent(s)}}static get styles(){return`
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
        box-shadow: 0 -10px 0 #581489 inset;
        z-index: 5;
        display: grid;
        grid-template-columns: 1fr 70px;
      }

      .title {
        font-family: "Quicksilver";
        font-size: 2.5rem;
        text-shadow: 2px 2px 1px var(--medium-color);
        margin-top: 2px;
        line-height: 80%;
        letter-spacing: 1px;
        color: #fff;
        text-align: center;
        transform: translate(-20px, 0)
      }

      .title span {
        font-family : "Quicksilver";
        font-size: 1rem;
        text-shadow: 1px 1px 1px #000;
        color: gold;
        display: block;
        transform: translate(50px, -12px) rotate(-5deg);
      }

      .bottom-machine {
        background-color: var(--medium-color);
        border-radius: 0 0 15px 15px;
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 1em;
        position: relative;
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
        border-radius: 0 0 50px 50px;
      }

      .output-slot {
        background: linear-gradient(97deg, #160e1f 0 12px, #2b113e 15px);
        border-radius: 0 5px 5px 0;
        position: absolute;
        top: 20%;
        right: -20px;
        width: 20px;
        height: 125px;
      }

      .chosen {
        position: relative;
        z-index: -1;
        translate: -200% 0;
      }

      .chosen.outside {
        translate: 300% 0;
      }
    `}connectedCallback(){this.render(),this.init()}render(){this.shadowRoot.innerHTML=`
    <style>${b.styles}</style>
    <div class="machine-container">
      <div class="top-machine">
        <div class="title">CLAW <span>MANZCHINE</span></div>
        <img class="alien" src="images/alien.png" alt="Alien">
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
        <div class="output-slot"></div>
      </div>
      <div class="base-machine"></div>
    </div>`}}customElements.define("claw-machine",b);
