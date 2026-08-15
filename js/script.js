/* =========================================================
   MA'S BIRTHDAY — GLOBAL INTERACTION SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * PAGE ENTER ANIMATION
     */

    document.body.style.opacity = "0";

    requestAnimationFrame(() => {

        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity = "1";

    });


    /*
     * PAGE NAVIGATION
     *
     * Every internal chapter transition now fades
     * smoothly instead of abruptly changing pages.
     */

    const navigationLinks =
        document.querySelectorAll(
            "a[href$='.html']"
        );


    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destination =
                link.getAttribute("href");

            if (
                !destination ||
                destination.startsWith("#") ||
                destination.startsWith("http")
            ) {
                return;
            }


            event.preventDefault();


            document.body.style.transition =
                "opacity 0.55s ease";

            document.body.style.opacity = "0";


            setTimeout(() => {

                window.location.href =
                    destination;

            }, 550);

        });

    });


    /*
     * PREVENT DOUBLE-TAPPING
     */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.style.pointerEvents =
                "none";

        });

    });


    /*
     * MUSIC
     *
     * The actual audio file will be connected
     * in the next step.
     */

    const musicButton =
        document.getElementById("musicButton");

    const birthdayMusic =
        document.getElementById("birthdayMusic");


    if (musicButton && birthdayMusic) {

        musicButton.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        birthdayMusic.paused
                    ) {

                        await birthdayMusic.play();

                        musicButton.innerHTML =
                            "♫ &nbsp; PAUSE OUR SONG";

                    } else {

                        birthdayMusic.pause();

                        musicButton.innerHTML =
                            "♫ &nbsp; PLAY OUR SONG";

                    }

                } catch (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                }

            }
        );

    }

});
/* =========================================================
   SHARE BUTTON
   ========================================================= */

const shareButton =
    document.getElementById("shareButton");

if (shareButton) {

    shareButton.addEventListener("click", async () => {

        const shareData = {
            title: "A Birthday Surprise for Maa ❤️",
            text: "I made this little birthday surprise especially for you. 🎀",
            url: window.location.href
        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                shareButton.innerHTML =
                    "✓ &nbsp; LINK COPIED";

                setTimeout(() => {

                    shareButton.innerHTML =
                        "♡ &nbsp; SHARE THIS SURPRISE";

                }, 2500);

            }

        } catch (error) {

            if (error.name !== "AbortError") {

                console.log(
                    "Sharing failed:",
                    error
                );

            }

        }

    });

}