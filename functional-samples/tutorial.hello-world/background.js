async function enable() {
    const browserNS = typeof browser === "undefined" ? chrome : browser;
    const rule = [{
        id: 1,
        action: {
            type: "redirect",
            redirect: { regexSubstitution: browserNS.runtime.getURL("/player.html") + "#\\0" },
        },
        condition: {
            regexFilter: ".*",
            responseHeaders: [{ header: "content-type", values: ["application/x-shockwave-flash", "application/futuresplash", "application/x-shockwave-flash2-preview", "application/vnd.adobe.flash.movie"]}],
            resourceTypes: [ "main_frame"]
        }
    }];
    try {
        await browserNS.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: rule
        });
    } catch (e) {
        console.info("Failed to register rules: responseHeaders condition unsupported");
    }
}
(async () => {
    await enable();
})();
