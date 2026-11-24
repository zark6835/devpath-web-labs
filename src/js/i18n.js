/**
 * Lightweight i18n preparation (Lab 2 bonus).
 * Markup carries the keys:
 *   data-i18n="nav.home"                         -> textContent
 *   data-i18n-args='{"value":68}'                -> {value} placeholders
 *   data-i18n-attr="placeholder:search.label"    -> attributes (";" separated)
 * English is rendered on the server (EJS), so nothing runs by default.
 * Add ?lang=uk to any URL to switch the UI to Ukrainian.
 */
const loaders = {
  uk: () => import("../i18n/uk.json")
};

const lookup = (dict, key) => key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), dict);

const format = (text, args) =>
  text.replace(/\{(\w+)\}/g, (match, name) => (name in args ? String(args[name]) : match));

export function applyTranslations(dict, root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = lookup(dict, el.dataset.i18n);
    if (typeof text === "string") {
      const args = el.dataset.i18nArgs ? JSON.parse(el.dataset.i18nArgs) : {};
      el.textContent = format(text, args);
    }
  });

  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      const text = lookup(dict, key);
      if (attr && typeof text === "string") {
        el.setAttribute(attr, text);
      }
    });
  });
}

export async function initI18n() {
  const lang = new URLSearchParams(window.location.search).get("lang");
  if (!lang || !loaders[lang]) {
    return;
  }
  const { default: dict } = await loaders[lang]();
  document.documentElement.lang = lang;
  document.documentElement.dataset.i18nLocale = lang;
  applyTranslations(dict);
}
