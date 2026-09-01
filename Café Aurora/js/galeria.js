/* ==========================================
   CAFÉ AURORA
   GALERÍA - MOVIMIENTO CONTINUO
========================================== */

const galeriaTrack =
    document.querySelector(".galeria-track");


if (galeriaTrack) {

    let position = 0;

    let animationFrame;

    let isPaused = false;

    const speed = 0.5;


    function animateGallery() {

        if (!isPaused) {

            position -= speed;


            const firstItem =
                galeriaTrack.querySelector(
                    ".galeria-item"
                );


            if (firstItem) {

                const itemWidth =
                    firstItem.offsetWidth;

                const gap =
                    parseFloat(
                        getComputedStyle(
                            galeriaTrack
                        ).gap
                    ) || 0;


                const resetPoint =
                    (itemWidth + gap) * 6;


                if (
                    Math.abs(position)
                    >= resetPoint
                ) {

                    position += resetPoint;

                }

            }


            galeriaTrack.style.transform =
                `translateX(${position}px)`;

        }


        animationFrame =
            requestAnimationFrame(
                animateGallery
            );

    }


    /* ==========================================
       PAUSA AL PASAR EL CURSOR
    ========================================== */

    galeriaTrack.addEventListener(
        "mouseenter",
        () => {

            isPaused = true;

        }
    );


    galeriaTrack.addEventListener(
        "mouseleave",
        () => {

            isPaused = false;

        }
    );


    /* ==========================================
       INICIAR
    ========================================== */

    animateGallery();

}