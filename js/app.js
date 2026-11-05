const CONFIG = {
  herName: "Khushi",
  fromName: "Meet",
  sealLetter: "K"
};

document.title = `A little birthday book for ${CONFIG.herName}`;
document.getElementById("recipientName").textContent = CONFIG.herName;
document.getElementById("peekName").textContent = CONFIG.herName;
document.getElementById("sealLetter").textContent = CONFIG.sealLetter;
document.getElementById("envelopeToName").textContent = `Especially for ${CONFIG.herName}`;

const pages = [
  {
    type: "cover",
    kicker: "a diary just for you",
    title: `Happy Birthday`,
    name: CONFIG.herName,
    body: "Open these pages slowly. There’s a little surprise waiting after you make a wish.",
    placeholder: true
  },
  {
    kicker: "start here",
    title: "This is yours",
    body: `Hey ${CONFIG.herName}. I made this little book to celebrate you, my best friend since childhood, and all the laughs and memories we’ve collected along the way. I hope it brings a smile to your day.`
  },
  {
    kicker: "a letter",
    title: "From me, to you",
    letter: `If life feels a little heavy, I hope today brings some lighter moments. We’ve been best friends since we were kids, and I’m grateful for every silly memory, thoughtful little thing, and laugh we’ve shared. You matter so much to me, and I hope this little book makes you smile. Happy birthday, ${CONFIG.herName}!`
  },
  {
    kicker: "a memory",
    title: "Hand cricket",
    body: "The tiniest match, the loudest arguments, and both of us pretending it was the World Cup. The serious commentary was almost as funny as the game.",
    placeholder: true
  },
  {
    kicker: "a memory",
    title: "Arm wrestling… for fun",
    body: "We took the silliest competition so seriously. The best part was always how quickly it turned into laughing.",
    placeholder: true
  },
  {
    kicker: "a memory",
    title: "Those little chits",
    body: "Folded paper, little jokes, and a whole conversation squeezed onto tiny scraps. Such a small thing, such a good memory.",
    placeholder: true
  },
  {
    kicker: "a memory",
    title: "The way you fed me",
    body: "You sharing your food with me was such a small, thoughtful thing. I still remember it whenever I think about how kind you are.",
    placeholder: true
  },
  {
    kicker: "a memory",
    title: "That hug",
    body: "Your hug came at exactly the right moment. It’s one of those simple memories that still makes me feel grateful to have you in my life.",
    placeholder: true
  },
  {
    kicker: "a memory",
    title: "Car & Activa rides",
    body: "Wind, music, random conversations, and no big plan needed. Some of my favourite memories are the ordinary bits in between.",
    placeholder: true
  },
  {
    kicker: "a little appreciation",
    title: "Your kind of magic",
    body: "You have a way of making people feel welcome and making ordinary moments more fun. I hope you know how much that is appreciated.",
    placeholder: true
  },
  {
    kicker: "a friendly reminder",
    title: "You’ve got this",
    body: `Take things one day at a time, ${CONFIG.herName}. You can ask for help, take a break, or simply have an off day. I’ll always be here to listen and cheer you on.`,
    placeholder: true
  },
  {
    type: "cake",
    kicker: "a tiny party",
    title: "Make a wish",
    body: "Tap the cake and make a wish. There’s a little note waiting after the candles go out."
  },
  {
    kicker: "keep these",
    title: "Little reminders",
    placeholder: true,
    reasons: [
      "Your smile can still make an ordinary day feel kinder.",
      "You don’t have to figure everything out all at once.",
      "Being best friends since childhood is one of my favorite parts of growing up.",
      "Rest is productive too. Be as kind to yourself as you are to everyone else."
    ]
  },
  {
    kicker: "the last page, for now",
    title: "Happy birthday, again",
    body: `I hope the year ahead brings you good surprises, peaceful days, and lots of reasons to laugh.

I’m really glad you’re my best friend, and I’ll be cheering you on.

With care and birthday wishes,
${CONFIG.fromName}`
  }
];

const envelopeScene = document.getElementById("envelopeScene");
const bookScene = document.getElementById("bookScene");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const bookPeek = document.getElementById("bookPeek");
const seal = document.getElementById("seal");
const pagesEl = document.getElementById("pages");
const spiralBinding = document.getElementById("spiralBinding");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageCount = document.getElementById("pageCount");

let index = 0;
let opened = false;
let turning = false;
let cakeBlown = false;

function spawnPetals() {
  const wrap = document.getElementById("petals");
  for (let i = 0; i < 16; i += 1) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${7 + Math.random() * 7}s`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.transform = `scale(${0.6 + Math.random()})`;
    wrap.appendChild(p);
  }
}

function burst(x = 0.5, y = 0.4) {
  if (typeof confetti !== "function") return;
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { x, y },
    colors: ["#ff6f91", "#ffd6e0", "#ffd36a", "#ffffff", "#ee9ca7"]
  });
}

function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(523, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.04, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.42);
  } catch (e) {
    /* ignore */
  }
}

function renderPages() {
  spiralBinding.innerHTML = Array.from({ length: 18 }, () => "<span></span>").join("");
  pagesEl.innerHTML = pages
    .map((page, i) => {
      const placeholder = page.placeholder
        ? '<div class="art-placeholder">Sticker will be here</div>'
        : "";
      if (page.type === "cover") {
        return `<article class="page cover-page${i === 0 ? " active" : ""}" data-i="${i}">
          <div class="page-sheet">
          <div class="page-face page-front"><div class="page-content">
          <p class="kicker">${page.kicker}</p>
          <h2>${page.title}</h2>
          <p class="cover-sub">${page.name}</p>
          ${placeholder}
          <p class="cover-note">${page.body}</p>
          </div></div>
          <div class="page-face page-back" aria-hidden="true"><div class="page-content"></div></div>
          </div>
        </article>`;
      }
      if (page.letter) {
        return `<article class="page${i === 0 ? " active" : ""}" data-i="${i}">
          <div class="page-sheet">
          <div class="page-face page-front"><div class="page-content">
          <p class="kicker">${page.kicker}</p>
          <h2>${page.title}</h2>
          <p class="letter">${page.letter.replace(/\n/g, "<br/>")}</p>
          <p class="sign">— ${CONFIG.fromName}</p>
          </div></div>
          <div class="page-face page-back" aria-hidden="true"><div class="page-content"></div></div>
          </div>
        </article>`;
      }
      if (page.type === "cake") {
        return `<article class="page${i === 0 ? " active" : ""}" data-i="${i}">
          <div class="page-sheet">
          <div class="page-face page-front"><div class="page-content">
          <p class="kicker">${page.kicker}</p>
          <h2>${page.title}</h2>
          <div class="cake-stage">
            <button class="cake" id="cake" type="button" aria-label="Tap to blow the candles" aria-pressed="false">
              <div class="candles">
                <div class="candle"><span class="flame"></span><span class="smoke"></span></div>
                <div class="candle"><span class="flame"></span><span class="smoke"></span></div>
                <div class="candle"><span class="flame"></span><span class="smoke"></span></div>
              </div>
              <div class="drip"></div>
              <div class="layer top"></div>
              <div class="layer mid"></div>
              <div class="layer base"></div>
              <div class="plate"></div>
            </button>
            </div>
          <p>${page.body}</p>
          <button class="cake-btn" id="cakeBtn" type="button">Tap to blow the candles</button>
          <div class="cake-surprise" id="cakeSurprise" hidden aria-live="polite">
            <span class="surprise-star" aria-hidden="true">✦</span>
            <p>You’ve been my best friend since childhood, and I’m grateful for every laugh, silly memory, and little moment we’ve shared. I hope you always know how loved and appreciated you are.</p>
            <span class="surprise-sign">— With love, ${CONFIG.fromName}</span>
          </div>
            </div></div>
            <div class="page-face page-back" aria-hidden="true"><div class="page-content"></div></div>
            </div>
        </article>`;
      }
      const reasons = page.reasons
        ? `<div class="reasons">${page.reasons.map((r) => `<div class="reason">${r}</div>`).join("")}</div>`
        : "";
      return `<article class="page${i === 0 ? " active" : ""}" data-i="${i}">
        <div class="page-sheet">
        <div class="page-face page-front"><div class="page-content">
        <p class="kicker">${page.kicker}</p>
        <h2>${page.title}</h2>
        ${placeholder}
        ${page.body ? `<p>${page.body}</p>` : ""}
        ${reasons}
        </div></div>
        <div class="page-face page-back" aria-hidden="true"><div class="page-content"></div></div>
        </div>
      </article>`;
    })
    .join("");

  pagesEl.querySelectorAll(".page").forEach((page) => {
    ["top-left", "top-right", "bottom-left", "bottom-right"].forEach((corner) => {
      const handle = document.createElement("span");
      handle.className = `page-corner ${corner}`;
      handle.setAttribute("aria-hidden", "true");
      page.appendChild(handle);
    });

    const front = page.querySelector(".page-front");
    const content = front?.querySelector(".page-content");
    if (front && content) {
      const cue = document.createElement("span");
      cue.className = "page-scroll-cue";
      cue.textContent = "↓ Scroll for more";
      cue.setAttribute("aria-hidden", "true");
      front.appendChild(cue);
      content.addEventListener("scroll", updateScrollablePages, { passive: true });
    }
  });

  dotsEl.innerHTML = pages.map((_, i) => `<span${i === 0 ? ' class="on"' : ""}></span>`).join("");
  dotsEl.setAttribute("aria-hidden", "true");
  pageCount.textContent = `01 / ${String(pages.length).padStart(2, "0")}`;
}

function updateScrollablePages() {
  pagesEl.querySelectorAll(".page").forEach((page) => {
    const content = page.querySelector(".page-front .page-content");
    const cue = page.querySelector(".page-scroll-cue");
    if (!content || !cue) return;
    const canScroll = content.scrollHeight > content.clientHeight + 4;
    const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 4;
    cue.classList.toggle("visible", canScroll && !atBottom);
    cue.setAttribute("aria-hidden", String(!canScroll || atBottom));
  });
}

function preparePageTurn(next, dir) {
  if (next < 0 || next >= pages.length || next === index || turning) return null;
  const current = pagesEl.querySelector(".page.active");
  const upcoming = pagesEl.querySelector(`.page[data-i="${next}"]`);
  if (!current || !upcoming) return null;

  const backFace = current.querySelector(".page-back");
  const backContent = backFace.querySelector(".page-content");
  const nextContent = upcoming.querySelector(".page-front .page-content");
  backFace.classList.toggle("cover-back", upcoming.classList.contains("cover-page"));
  backContent.replaceChildren(...[...nextContent.childNodes].map((node) => node.cloneNode(true)));
  backContent.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));

  const sheet = current.querySelector(".page-sheet");
  current.classList.add("exit");
  current.classList.remove("active");
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  turning = true;
  return { current, upcoming, backFace, backContent, sheet, next, dir };
}

function updatePageNavigation(next) {
  const content = pagesEl.querySelector(`.page[data-i="${next}"] .page-front .page-content`);
  if (content) content.scrollTop = 0;
  index = next;
  [...dotsEl.children].forEach((dot, i) => dot.classList.toggle("on", i === index));
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === pages.length - 1;
  pageCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
  if (index === pages.length - 1) burst(0.5, 0.35);
  updateScrollablePages();
  bindCake();
}

function clearPageTurn(turn) {
  turn.current.classList.remove("exit", "turn-back", "tear-away", "under-rise");
  turn.upcoming.classList.remove("rising");
  turn.sheet.removeAttribute("style");
  turn.backContent.replaceChildren();
  turn.backFace.classList.remove("cover-back");
  turning = false;
}

function completePageTurn(turn, commit, reveal = "") {
  if (commit) {
    if (reveal === "fade") turn.upcoming.classList.add("fade-in");
    turn.upcoming.classList.add("active");
    updatePageNavigation(turn.next);
  } else {
    turn.current.classList.add("active");
    turn.upcoming.classList.remove("active");
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
  }
  clearPageTurn(turn);
  if (reveal === "fade") {
    setTimeout(() => {
      turn.upcoming.classList.remove("fade-in");
      pagesEl.classList.remove("falling-page");
    }, 620);
  }
}

function showPage(next, dir = 1, transition = dir > 0 ? "fall" : "rise") {
  const turn = preparePageTurn(next, dir);
  if (!turn) return;
  if (transition === "fall") {
    pagesEl.classList.add("falling-page");
    turn.current.classList.add("tear-away");
    setTimeout(() => completePageTurn(turn, true, "fade"), 850);
    return;
  }
  if (transition === "rise") {
    turn.current.classList.add("under-rise");
    turn.upcoming.classList.add("rising");
    setTimeout(() => completePageTurn(turn, true), 760);
    return;
  }
}

function bindCake() {
  const cake = document.getElementById("cake");
  const btn = document.getElementById("cakeBtn");
  const surprise = document.getElementById("cakeSurprise");
  if (!cake) return;
  const blow = () => {
    if (cakeBlown) return;
    cakeBlown = true;
    cake.classList.add("blown");
    cake.setAttribute("aria-label", "Birthday candles blown");
    cake.setAttribute("aria-pressed", "true");
    chime();
    burst(0.5, 0.45);
    if (btn) btn.textContent = `Happy birthday, ${CONFIG.herName} 🎂`;
    if (surprise) {
      surprise.hidden = false;
      requestAnimationFrame(() => {
        surprise.classList.add("shown");
        updateScrollablePages();
      });
    }
  };
  cake.onclick = blow;
  if (btn) btn.onclick = blow;
}

function openEnvelope() {
  if (opened) return;
  opened = true;
  envelope.classList.add("open");
  chime();

  let bookStarted = false;
  let sceneShown = false;
  let flapFallback;
  let bookFallback;

  const showDiary = () => {
    if (sceneShown) return;
    sceneShown = true;
    clearTimeout(bookFallback);
    envelopeScene.hidden = true;
    bookScene.hidden = false;
    bookScene.getBoundingClientRect();
    bookScene.classList.add("revealed");
    requestAnimationFrame(updateScrollablePages);
    burst(0.5, 0.2);
  };

  const raiseBook = () => {
    if (bookStarted) return;
    bookStarted = true;
    clearTimeout(flapFallback);
    envelope.classList.add("flap-open");
    envelope.classList.add("book-rising");
    bookPeek.addEventListener("animationend", (event) => {
      if (event.animationName === "slideOut") showDiary();
    }, { once: true });
    bookFallback = setTimeout(showDiary, 1100);
  };

  const onFlapOpened = (event) => {
    if (event.target !== flap || event.propertyName !== "transform") return;
    flap.removeEventListener("transitionend", onFlapOpened);
    raiseBook();
  };

  flap.addEventListener("transitionend", onFlapOpened);
  flapFallback = setTimeout(raiseBook, 1050);
}

function bindSwipe() {
  let gesture;
  const interactiveTarget = (target) =>
    target instanceof Element &&
    target.closest("button, a, input, textarea, select, option, [contenteditable='true'], audio, video");
  const selectionExists = () => {
    const selection = window.getSelection();
    return selection && !selection.isCollapsed;
  };
  const begin = (x, y, source, target) => {
    if (turning || interactiveTarget(target) || !(target instanceof Element) || !target.closest(".page-corner")) return;
    gesture = { x, y, source, target };
  };
  const move = (x, y, event) => {
    if (!gesture) return;
    const dx = x - gesture.x;
    const dy = y - gesture.y;
    if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 0.72 && event?.cancelable) event.preventDefault();
  };
  const finish = (x, y) => {
    if (!gesture) return;
    const currentGesture = gesture;
    gesture = null;
    const dy = y - currentGesture.y;
    if (Math.abs(dy) < 30 || Math.abs(dy) < Math.abs(x - currentGesture.x) * 0.72) return;
    if (selectionExists()) return;
    if (dy < 0) showPage(index + 1, 1, "fall");
    else showPage(index - 1, -1, "rise");
  };

  pagesEl.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    begin(event.clientX, event.clientY, "mouse", event.target);
  });
  window.addEventListener("pointermove", (event) => {
    if (gesture && gesture.source === "mouse") move(event.clientX, event.clientY, event);
  });
  window.addEventListener("pointerup", (event) => {
    if (gesture && gesture.source === "mouse") finish(event.clientX, event.clientY);
  });
  window.addEventListener("pointercancel", () => {
    gesture = null;
  });
  pagesEl.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) { gesture = null; return; }
    const touch = event.touches[0];
    begin(touch.clientX, touch.clientY, "touch", event.target);
  }, { passive: true });
  pagesEl.addEventListener("touchmove", (event) => {
    if (!gesture || gesture.source !== "touch" || event.touches.length !== 1) return;
    const touch = event.touches[0];
    move(touch.clientX, touch.clientY, event);
  }, { passive: false });
  pagesEl.addEventListener("touchend", (event) => {
    if (!gesture || gesture.source !== "touch") return;
    const touch = event.changedTouches[0];
    finish(touch.clientX, touch.clientY);
  }, { passive: true });
  pagesEl.addEventListener("touchcancel", () => {
    gesture = null;
  }, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (bookScene.hidden) return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || interactiveTarget(e.target) || selectionExists()) return;
    if (e.key === "ArrowUp") showPage(index - 1, -1, "rise");
    if (e.key === "ArrowDown") showPage(index + 1, 1, "fall");
  });
}

seal.addEventListener("click", openEnvelope);
prevBtn.addEventListener("click", () => showPage(index - 1, -1, "rise"));
nextBtn.addEventListener("click", () => showPage(index + 1, 1, "fall"));

spawnPetals();
renderPages();
bindSwipe();
window.addEventListener("resize", updateScrollablePages);
prevBtn.disabled = true;
