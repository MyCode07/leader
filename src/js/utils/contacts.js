import { gsap } from "gsap";
import { isMobile } from './isMobile.js'

if (!isMobile.any()) {
    let contactItems = document.querySelectorAll(".contacts__bottom ul li");
    let contactItemsImage = document.querySelectorAll(".contacts-animate-img");

    if (contactItems.length) {

        contactItems.forEach(item => {
            const animation = gsap.to(item.querySelector('.contacts-animate-img'), {
                opacity: 1,
                display: 'block',
                duration: 0.2,
                ease: "ease-in-out"
            });
            animation.reverse();

            item.addEventListener("mouseenter", () => animation.play());
            item.addEventListener("mouseleave", () => animation.reverse());
            item.addEventListener("mousemove", moveText);
        })
    }

    function moveText(e) {
        contactItemsImage.forEach(img => {
            if (e.clientX < window.innerWidth / 2) {
                img.classList.add('_left')
            }
            else {
                img.classList.remove('_left')
            }
        })

        gsap.to([...contactItemsImage], {
            css: {
                left: e.clientX - contactItems[0].getBoundingClientRect().width,
                top: e.clientY / 10,
            },
            duration: 0.3,
        });
    }
}


const callback = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.timeline.play();
            observer.unobserve(entry.target);
        }
    });
};

const options = {
    threshold: 0.6,
};
const observer = new IntersectionObserver(callback, options);
const contactsAnimateElements = document.querySelectorAll(".contacts-animate");
if (contactsAnimateElements.length) {
    contactsAnimateElements.forEach(elem => {
        const action = gsap.timeline({ paused: true })
            .to(elem, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.3
            })

        elem.timeline = action;
        observer.observe(elem);
    });
}