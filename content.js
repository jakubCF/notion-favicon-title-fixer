const FAVICON_URL = "https://www.notion.so/images/favicon.ico";

const getFaviconDomEl = () => document.querySelector("link[rel~='icon']");
const getTitle = () => document.querySelector('title');

const setFavicon = () => {
  const linkEl = getFaviconDomEl();
  linkEl.href = FAVICON_URL;
}

const observer = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.target.href !== FAVICON_URL) {
      setFavicon();
    }
  })
})

const observerTitle = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    if (!mutation.target.textContent.startsWith("Notion")) {
      document.title = "Notion - " + document.title;
    }
  })
})

const options = {
  attributeFilter: ['href'],
};
var configObserve = {childList: true};

observer.observe(getFaviconDomEl(), options);
observerTitle.observe(getTitle(), configObserve);