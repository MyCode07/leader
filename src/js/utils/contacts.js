import { gsap } from "gsap";
if (window.innerWidth > 768) {
    console.log(window.innerWidth);
    let menuItem = document.querySelectorAll(".contacts__body-bottom ol li");
    let menuImage = document.querySelectorAll(".contacts__body-bottom ol li img");


    for (let i = 0; i < menuItem.length; i++) {
        const element = menuItem[i];

        const animation = gsap.to(element.querySelector('img'), {
            opacity: 1,
            display: 'block',
            duration: 0.2,
            ease: "ease-in-out"
        });

        animation.reverse();
        element.addEventListener("mouseenter", () => animation.play());
        element.addEventListener("mouseleave", () => animation.reverse());

        //   initialization

    }
    //   to move image along with cursor
    function moveText(e) {
        gsap.to([...menuImage], {
            css: {
                left: e.pageX + 50,
                top: e.pageY,
            },
            duration: 0.3,
        });
    }

    menuItem.forEach((el) => {
        el.addEventListener("mousemove", moveText);
    });
}