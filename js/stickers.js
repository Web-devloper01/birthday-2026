const Stickers = {
  svg(inner, view = "0 0 260 190") {
    return `<svg viewBox="${view}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  },

  girl(x, y, pose = "idle") {
    const arm =
      pose === "feed"
        ? `<path d="M${x + 8} ${y + 38} q 28 -18 42 -6" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>`
        : pose === "hug"
        ? `<path d="M${x - 6} ${y + 40} q -16 10 -4 22" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>`
        : pose === "write"
        ? `<path d="M${x + 10} ${y + 40} q 20 8 28 18" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>`
        : pose === "ride"
        ? `<path d="M${x + 8} ${y + 42} q 10 16 4 24" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>`
        : `<path d="M${x - 10} ${y + 40} q -10 16 2 24" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>
           <path d="M${x + 10} ${y + 40} q 12 14 6 24" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>`;
    return `
      <g>
        <ellipse cx="${x}" cy="${y + 58}" rx="18" ry="8" fill="#000" opacity=".08"/>
        <path d="M${x - 18} ${y + 12} c -6 34 2 46 10 52" fill="#2b1c1c"/>
        <path d="M${x + 18} ${y + 12} c 6 34 -2 46 -10 52" fill="#2b1c1c"/>
        <circle cx="${x}" cy="${y + 8}" r="16" fill="#f3c7a7"/>
        <path d="M${x - 17} ${y + 2} c 4 -18 30 -18 34 2 c -6 10 -28 10 -34 -2" fill="#2b1c1c"/>
        <path d="M${x - 16} ${y + 10} c -10 -24 42 -24 34 2 c 4 16 -38 16 -34 -2" fill="#2b1c1c"/>
        <circle cx="${x - 6}" cy="${y + 8}" r="2.1" fill="#2a1a1a"/>
        <circle cx="${x + 6}" cy="${y + 8}" r="2.1" fill="#2a1a1a"/>
        <circle cx="${x - 5.3}" cy="${y + 7.3}" r=".6" fill="#fff"/>
        <circle cx="${x + 6.7}" cy="${y + 7.3}" r=".6" fill="#fff"/>
        <ellipse cx="${x - 9}" cy="${y + 13}" rx="3.2" ry="1.6" fill="#f4a0b0" opacity=".8"/>
        <ellipse cx="${x + 9}" cy="${y + 13}" rx="3.2" ry="1.6" fill="#f4a0b0" opacity=".8"/>
        <path d="M${x - 4} ${y + 15} q 4 4 8 0" fill="none" stroke="#c45c6a" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M${x - 14} ${y + 22} q 14 8 28 0 v 28 q -14 10 -28 0z" fill="#ff8fab"/>
        <circle cx="${x}" cy="${y + 28}" r="3" fill="#fff6f8"/>
        ${arm}
      </g>`;
  },

  boy(x, y, pose = "idle") {
    const arm =
      pose === "wrestle"
        ? `<path d="M${x + 12} ${y + 38} q 24 -2 34 2" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>`
        : pose === "hug"
        ? `<path d="M${x + 10} ${y + 38} q 22 4 18 18" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>`
        : pose === "ride"
        ? `<path d="M${x + 10} ${y + 42} q 14 10 8 22" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>`
        : pose === "look"
        ? `<path d="M${x - 12} ${y + 40} q -8 18 4 22" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>`
        : `<path d="M${x - 12} ${y + 40} q -10 16 0 24" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>
           <path d="M${x + 12} ${y + 40} q 12 14 4 24" fill="none" stroke="#e8b894" stroke-width="7" stroke-linecap="round"/>`;
    return `
      <g>
        <ellipse cx="${x}" cy="${y + 62}" rx="20" ry="8" fill="#000" opacity=".08"/>
        <circle cx="${x}" cy="${y + 8}" r="17" fill="#e8b894"/>
        <path d="M${x - 18} ${y + 4} c 2 -18 34 -18 36 2 c -10 10 -26 10 -36 -2" fill="#2c2424"/>
        <circle cx="${x - 6}" cy="${y + 9}" r="2.2" fill="#2a1a1a"/>
        <circle cx="${x + 6}" cy="${y + 9}" r="2.2" fill="#2a1a1a"/>
        <circle cx="${x - 5.2}" cy="${y + 8.2}" r=".6" fill="#fff"/>
        <path d="M${x - 4} ${y + 16} q 4 3.4 8 0" fill="none" stroke="#b56860" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M${x - 16} ${y + 24} q 16 6 32 0 v 30 q -16 12 -32 0z" fill="#7eb8d4"/>
        ${arm}
      </g>`;
  },

  spark(x, y) {
    return `<path d="M${x} ${y - 6} l 1.6 4.4 4.6.2 -3.6 3 1.2 4.4 -3.8 -2.6 -3.8 2.6 1.2 -4.4 -3.6 -3 4.6 -.2z" fill="#ffd36a"/>`;
  },

  cover() {
    return this.svg(`
      ${this.spark(40, 40)}${this.spark(220, 36)}${this.spark(210, 150)}
      ${this.boy(92, 58)}${this.girl(158, 62)}
      <text x="130" y="28" text-anchor="middle" font-size="13" fill="#c44569" font-family="Georgia">our little story</text>
    `);
  },

  cricket() {
    return this.svg(`
      <ellipse cx="130" cy="168" rx="90" ry="12" fill="#d9f0c7"/>
      ${this.boy(96, 70)}
      ${this.girl(168, 74)}
      <circle cx="132" cy="118" r="7" fill="#f4f4f4" stroke="#c9c9c9"/>
      <path d="M118 108 q 8 14 2 22" fill="none" stroke="#e8b894" stroke-width="6" stroke-linecap="round"/>
      <path d="M176 108 q 16 -10 28 -4" fill="none" stroke="#f3c7a7" stroke-width="6" stroke-linecap="round"/>
      <circle cx="208" cy="96" r="5" fill="#ff8a65"/>
    `);
  },

  wrestle() {
    return this.svg(`
      <rect x="48" y="128" width="164" height="14" rx="6" fill="#e7c7a8"/>
      <rect x="40" y="140" width="180" height="18" rx="6" fill="#d2a07e"/>
      ${this.boy(88, 52, "wrestle")}
      ${this.girl(168, 56)}
      <circle cx="148" cy="92" r="7" fill="#f3c7a7"/>
      <circle cx="132" cy="94" r="7" fill="#e8b894"/>
      ${this.spark(130, 40)}
    `);
  },

  chits() {
    return this.svg(`
      ${this.boy(86, 58)}${this.girl(174, 60, "write")}
      <g transform="translate(118 96) rotate(-12)">
        <rect width="28" height="20" rx="3" fill="#fff6d8" stroke="#e0c48a"/>
        <text x="6" y="14" font-size="10" fill="#c44569">hi</text>
      </g>
      <g transform="translate(148 108) rotate(14)">
        <rect width="28" height="20" rx="3" fill="#ffe4ea" stroke="#f0b0c0"/>
        <path d="M8 11 l6 5 10 -9" fill="none" stroke="#c44569" stroke-width="2"/>
      </g>
    `);
  },

  feed() {
    return this.svg(`
      ${this.boy(92, 58)}${this.girl(162, 60, "feed")}
      <circle cx="148" cy="86" r="6" fill="#ffd39a" stroke="#e09b5b"/>
      <path d="M154 86 h 18" stroke="#c9a36a" stroke-width="3" stroke-linecap="round"/>
      ${this.spark(128, 44)}
    `);
  },

  hug() {
    return this.svg(`
      ${this.boy(112, 56, "hug")}
      ${this.girl(142, 62, "hug")}
      <path d="M70 50 q 20 -28 48 -8" fill="none" stroke="#ffb3c6" stroke-width="3"/>
      <path d="M190 46 q 18 24 -8 40" fill="none" stroke="#ffb3c6" stroke-width="3"/>
      ${this.spark(54, 70)}${this.spark(210, 80)}
    `);
  },

  rides() {
    return this.svg(`
      <rect x="18" y="118" width="92" height="28" rx="10" fill="#9ad0ea"/>
      <rect x="78" y="104" width="40" height="22" rx="6" fill="#bfe4f4"/>
      <circle cx="38" cy="150" r="10" fill="#444"/><circle cx="88" cy="150" r="10" fill="#444"/>
      <path d="M148 138 h 70 l -10 -22 h -40 z" fill="#c9b6ff"/>
      <circle cx="164" cy="150" r="9" fill="#444"/><circle cx="206" cy="150" r="9" fill="#444"/>
      <circle cx="54" cy="108" r="12" fill="#e8b894"/>
      <path d="M46 100 c 2 -10 16 -10 18 1" fill="#2c2424"/>
      <circle cx="186" cy="104" r="11" fill="#f3c7a7"/>
      <path d="M176 98 c 2 -10 18 -10 20 2" fill="#2b1c1c"/>
    `);
  },

  lost() {
    return this.svg(`
      ${this.boy(96, 58, "look")}
      ${this.girl(168, 60)}
      ${this.spark(128, 48)}${this.spark(140, 70)}${this.spark(118, 86)}
      <path d="M112 78 q 18 -6 28 4" fill="none" stroke="#ffb3c6" stroke-width="2"/>
    `);
  },

  comfort() {
    return this.svg(`
      <path d="M40 48 q 30 -28 54 4" fill="#cfd8ea"/>
      <path d="M48 42 q 20 -16 38 2" fill="#e6ecf6"/>
      ${this.boy(96, 64)}${this.girl(158, 68)}
      <path d="M126 96 q 12 16 28 4" fill="none" stroke="#e8b894" stroke-width="6" stroke-linecap="round"/>
      <circle cx="210" cy="52" r="16" fill="#ffd36a"/>
      ${this.spark(48, 86)}
    `);
  },

  stars() {
    return this.svg(`
      ${this.boy(92, 64)}${this.girl(162, 66)}
      ${this.spark(40, 50)}${this.spark(70, 30)}${this.spark(200, 36)}${this.spark(226, 70)}
      <text x="130" y="28" text-anchor="middle" font-size="12" fill="#c44569">you matter</text>
    `);
  }
};
