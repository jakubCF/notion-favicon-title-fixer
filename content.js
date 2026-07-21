console.log("[Notion Fixer] Content script loaded");

const FAVICON_URL = "https://www.notion.so/images/favicon.ico";

const getFaviconDomEl = () => document.querySelector("link[rel~='icon']");
const getTitle = () => document.querySelector('title');

const setFavicon = () => {
  const linkEl = getFaviconDomEl();
  if (!linkEl) {
    console.log("[Notion Fixer] ERROR: favicon element not found");
    return;
  }
  linkEl.href = FAVICON_URL;
  console.log("[Notion Fixer] favicon set to:", FAVICON_URL);
}

const observer = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    console.log("favicon mutation detected, href:", mutation.target.href);
    if (mutation.target.href !== FAVICON_URL) {
      setFavicon();
      console.log("favicon changed - set to correct URL");
    }
  })
})

const observerTitle = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    console.log("title mutation detected, title:", mutation.target.textContent);
    if (!mutation.target.textContent.startsWith("Notion")) {
      document.title = "Notion - " + document.title;
      console.log("title changed - updated to:", document.title);
    }
  })
})

const options = {
  attributeFilter: ['href'],
};
var configObserve = {childList: true};

const faviconEl = getFaviconDomEl();
const titleEl = getTitle();

console.log("[Notion Fixer] favicon element found:", !!faviconEl);
console.log("[Notion Fixer] title element found:", !!titleEl);

if (faviconEl) {
  observer.observe(faviconEl, options);
  console.log("[Notion Fixer] favicon observer started");
  console.log("[Notion Fixer] Initial favicon href:", faviconEl.href);
} else {
  console.log("[Notion Fixer] ERROR: Could not start favicon observer - element not found");
}

if (titleEl) {
  observerTitle.observe(titleEl, configObserve);
  console.log("[Notion Fixer] title observer started");
  console.log("[Notion Fixer] Initial title text:", titleEl.textContent);
} else {
  console.log("[Notion Fixer] ERROR: Could not start title observer - element not found");
}

// Fix initial state immediately
console.log("[Notion Fixer] Fixing initial state...");
setFavicon();
if (getTitle() && !getTitle().textContent.startsWith("Notion")) {
  document.title = "Notion - " + document.title;
  console.log("[Notion Fixer] Initial title fixed to:", document.title);
}
