/** Shared between the pre-paint script and the toggle component. */
export const THEME_STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

/**
 * Runs before first paint so there is no flash of the wrong theme.
 *
 * Dark is the primary experience: a first-time visitor gets dark regardless of
 * their OS setting. The choice is then persisted, so the toggle always wins on
 * return visits. To make the site follow the OS instead, replace the `"dark"`
 * fallback below with
 *   window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=(s==="light"||s==="dark")?s:"dark";var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){document.documentElement.classList.add("dark");}})();`;
