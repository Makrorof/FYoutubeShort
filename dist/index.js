"use strict";
const yturl = "https://www.youtube.com/";
var enableAutoRedirect = true;
function start(newUrl) {
    var _a;
    // 1. Shorts sayfasındaysa yönlendir
    if (enableAutoRedirect && (newUrl === null || newUrl === void 0 ? void 0 : newUrl.includes("/shorts/"))) {
        if (window.location.pathname !== yturl) {
            window.location.replace(yturl);
        }
    }
    // 2. Short content kisminin kaldirilmasi
    {
        let contents = document.querySelectorAll(".style-scope.ytd-rich-grid-renderer:not(#contents)");
        contents.forEach((value) => {
            var _a;
            const titleElement = value.querySelector("#title");
            if (titleElement && ((_a = titleElement.innerHTML) === null || _a === void 0 ? void 0 : _a.includes("Shorts"))) {
                value.remove();
            }
        });
    }
    //3. Short tusunu kaldir.
    {
        let contents = document.querySelectorAll("[aria-label='Shorts'].style-scope.ytd-mini-guide-renderer");
        contents.forEach((value) => {
            value.remove();
        });
    }
    //Extra: Reklamlari kaldir.
    {
        //Kucuk video boyutundaki sponsor reklamlar.
        let contents = document.querySelectorAll(".style-scope.ytd-mini-guide-renderer, .style-scope.ytd-rich-item-renderer");
        contents.forEach((value) => {
            let adElement = value.querySelector(".ytd-ad-inline-playback-meta-block");
            if (adElement) {
                value.remove();
            }
        });
        //Buyuk reklamlar
        (_a = document.querySelector("#masthead-ad")) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
function observeWhenReady() {
    const tryObserve = () => {
        const target = document.body;
        if (!target) {
            // DOM henüz hazır değil, tekrar dene
            requestAnimationFrame(tryObserve);
            return;
        }
        const observer = new MutationObserver(() => {
            start();
        });
        // Artık emin olduğumuz bir Node verdiğimiz için hata almayız
        observer.observe(target, {
            childList: true,
            subtree: true
        });
        start();
    };
    tryObserve();
}
document.addEventListener("DOMContentLoaded", () => {
    observeWhenReady();
});
