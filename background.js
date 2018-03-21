const BASE_URL = "https://bugzilla.mozilla.org/";
const SHOW_URL = `${ BASE_URL }/show_bug.cgi?id=`;
const SEARCH_URL = `${ BASE_URL }/buglist.cgi?quicksearch=`;

browser.omnibox.setDefaultSuggestion({
  description: `Search the bugzilla.mozilla.org (e.g. "1399830" or "animation inspector")`
});

browser.omnibox.onInputChanged.addListener((text, suggest) => {
  const url = buildSearchURL(text);
  suggest([{ content: url, description: url }]);
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = buildSearchURL(text);

  switch (disposition) {
    case "currentTab":
      browser.tabs.update({ url });
      break;
    case "newForegroundTab":
      browser.tabs.create({ url });
      break;
    case "newBackgroundTab":
      browser.tabs.create({ url, active: false });
      break;
  }
});

function buildSearchURL(text) {
  return (isNaN(text) ? SEARCH_URL : SHOW_URL) + text;
}
