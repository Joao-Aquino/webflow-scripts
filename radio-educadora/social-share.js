!(function () {
  "use strict";
  class t {
    constructor() {
      this.data = {};
    }
    set(t, e) {
      this.data[t] = e;
    }
    get(t) {
      return this.data[t];
    }
  }
  const e = class {
    constructor(t) {
      this.options = t;
    }
    log(t, e) {
      const a = [
        `%c[${this.options.title}] ${t}. Link to documentation ${this.options.documentationLink}`,
        "\n      display: inline-block;\n      padding: 4px 6px;\n      border-radius: 4px;\n      line-height: 1.5em;\n      color: #282735;\n      background: linear-gradient(45deg,\n        rgba(185, 205, 255, 0.4) 0%,\n        rgba(201, 182, 255, 0.4) 33%,\n        rgba(239, 184, 255, 0.4) 66%,\n        rgba(255, 210, 177, 0.4) 100%);\n        ",
      ];
      e
        ? (console.group(...a),
          Array.isArray(e) ? console.log(...e) : console.log(e),
          console.groupEnd())
        : console.log(...a);
    }
    validate(t, e, a) {
      if (!t.validate) return !0;
      if ("function" == typeof t.validate) {
        if (!t.validate(a))
          return this.log(`Invalid value "${a}" for attribute "${e}"`), !1;
      } else if (!t.validate.includes(a))
        return (
          this.log(`Invalid value "${a}" for attribute "${e}"`, [
            "%cPossible values:%c\n" +
              t.validate.map((t) => `• ${t}`).join("\n"),
            "font-weight: 700;",
            "font-weight: initial;",
          ]),
          !1
        );
      return !0;
    }
    parse(e) {
      const a = new t();
      for (const t in this.options.attributes) {
        const i = this.options.attributes[t],
          n = e.getAttribute(t);
        if (!n) {
          a.set(t, i.defaultValue);
          continue;
        }
        if (!this.validate(i, t, n)) continue;
        let o = n;
        i.parse && (o = i.parse(n) ?? i.defaultValue), a.set(t, o);
      }
      this.options.apply.call(this, e, a);
    }
    getElements() {
      return document.querySelectorAll(`[${this.options.name}]`);
    }
    init() {
      this.getElements().forEach((t) => this.parse(t));
    }
  };
  var a,
    i =
      (((a = i || {}).Facebook = "facebook"),
      (a.Linkedin = "linkedin"),
      (a.Pinterest = "pinterest"),
      (a.Telegram = "telegram"),
      (a.Twitter = "twitter"),
      (a.Whatsapp = "whatsapp"),
      a);
  const n = new e({
      name: "fb-social",
      attributes: {
        "fb-social-type": { defaultValue: void 0, validate: Object.values(i) },
      },
      apply(t, e) {
        if ("a" !== t.tagName.toLowerCase())
          return this.log("Unsupported HTML tag detected. Use <a> tag instead");
        const a = e.get("fb-social-type");
        if (!a) return;
        const i = encodeURIComponent(document.title),
          n = encodeURIComponent(window.location.href);
        let o = "#";
        switch (a) {
          case "facebook":
            o = `https://www.facebook.com/sharer/sharer.php?u=${n}`;
            break;
          case "linkedin":
            o = `https://www.linkedin.com/sharing/share-offsite/?url=${n}`;
            break;
          case "pinterest":
            o = `https://pinterest.com/pin/create/button/?url=${n}&description=${i}`;
            break;
          case "telegram":
            o = `https://t.me/share/url?url=${n}&text=${i}`;
            break;
          case "twitter":
            o = `https://twitter.com/intent/post/?url=${n}&text=${i}`;
            break;
          case "whatsapp":
            o = `https://api.whatsapp.com/send/?text=${i}%20${n}`;
        }
        t.setAttribute("href", o), t.setAttribute("target", "_blank");
      },
      title: "Social Share Booster",
      documentationLink: "https://www.flowbase.co/booster/social-share",
    }),
    o = () => n.init();
  "complete" === document.readyState ? o() : window.addEventListener("load", o);
})();
//# sourceMappingURL=/sm/6e8fd7df23efa577844d7450744de87498942cb030744c3028552d7100cfd188.map
