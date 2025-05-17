function start() {
    // 1. Short content kisminin kaldirilmasi
    {
        let contents = document.querySelectorAll(".style-scope.ytd-rich-grid-renderer:not(#contents)");

        contents.forEach((value) => {
            const titleElement = value.querySelector("#title");
            if (titleElement && titleElement.innerHTML?.includes("Shorts")) {
                value.remove();
            }
        })
    }

    //2. Short tusunu kaldir.
    {
        let contents = document.querySelectorAll("[aria-label='Shorts'].style-scope.ytd-mini-guide-renderer, .style-scope.ytd-guide-section-renderer [title='Shorts']");

        contents.forEach((value) => {
            value.remove();
        })
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
        document.querySelector("#masthead-ad")?.remove();
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