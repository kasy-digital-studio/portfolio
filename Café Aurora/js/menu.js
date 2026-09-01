/* ==========================================
   CAFÉ AURORA
   CARRUSEL DEL MENÚ
========================================== */

const menuGrid = document.querySelector(".menu-grid");

const menuCards = document.querySelectorAll(".menu-card");

const previousButton =
    document.querySelector(".carousel-prev");

const nextButton =
    document.querySelector(".carousel-next");

const dots =
    document.querySelectorAll(".carousel-dot");


if (
    menuGrid &&
    menuCards.length &&
    previousButton &&
    nextButton
) {

    let currentIndex = 0;


    /* ==========================================
       TARJETAS VISIBLES
    ========================================== */

    function getCardsPerView() {

        if (window.innerWidth <= 650) {

            return 1;

        }

        if (window.innerWidth <= 950) {

            return 2;

        }

        return 3;

    }


    /* ==========================================
       POSICIÓN MÁXIMA
    ========================================== */

    function getMaxIndex() {

        return Math.max(
            0,
            menuCards.length - getCardsPerView()
        );

    }


    /* ==========================================
       MOVER CARRUSEL
    ========================================== */

    function moveCarousel(index) {

        const maxIndex = getMaxIndex();

        currentIndex =
            Math.max(
                0,
                Math.min(index, maxIndex)
            );


        const cardWidth =
            menuCards[0].offsetWidth;

        const gap =
            parseFloat(
                getComputedStyle(menuGrid).gap
            ) || 0;


        const position =
            currentIndex * (cardWidth + gap);


        menuGrid.scrollTo({

            left: position,

            behavior: "smooth"

        });


        updateDots();

    }


    /* ==========================================
       INDICADORES
    ========================================== */

    function updateDots() {

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* ==========================================
       SIGUIENTE
    ========================================== */

    nextButton.addEventListener(
        "click",
        () => {

            const maxIndex = getMaxIndex();


            if (currentIndex < maxIndex) {

                moveCarousel(
                    currentIndex + 1
                );

            } else {

                moveCarousel(0);

            }

        }
    );


    /* ==========================================
       ANTERIOR
    ========================================== */

    previousButton.addEventListener(
        "click",
        () => {

            const maxIndex = getMaxIndex();


            if (currentIndex > 0) {

                moveCarousel(
                    currentIndex - 1
                );

            } else {

                moveCarousel(maxIndex);

            }

        }
    );


    /* ==========================================
       INDICADORES
    ========================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                const maxIndex =
                    getMaxIndex();

                moveCarousel(
                    Math.min(
                        index,
                        maxIndex
                    )
                );

            }
        );

    });


    /* ==========================================
       DETECTAR DESLIZAMIENTO MANUAL
    ========================================== */

    let scrollTimer;


    menuGrid.addEventListener(
        "scroll",
        () => {

            clearTimeout(scrollTimer);


            scrollTimer = setTimeout(
                () => {

                    const cardWidth =
                        menuCards[0].offsetWidth;

                    const gap =
                        parseFloat(
                            getComputedStyle(menuGrid).gap
                        ) || 0;


                    const position =
                        cardWidth + gap;


                    if (position > 0) {

                        currentIndex =
                            Math.round(
                                menuGrid.scrollLeft /
                                position
                            );

                    }


                    currentIndex =
                        Math.max(
                            0,
                            Math.min(
                                currentIndex,
                                getMaxIndex()
                            )
                        );


                    updateDots();

                },
                100
            );

        }
    );


    /* ==========================================
       RESPONSIVE
    ========================================== */

    window.addEventListener(
        "resize",
        () => {

            currentIndex =
                Math.min(
                    currentIndex,
                    getMaxIndex()
                );

            moveCarousel(currentIndex);

        }
    );


    /* Estado inicial */

    updateDots();

}