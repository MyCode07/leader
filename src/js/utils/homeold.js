import { gsap } from "gsap";

import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import ScrollTrigger from "gsap/ScrollTrigger.js";

const tl = gsap.timeline()

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', function (e) {
    const slider = document.querySelector('.home__slider-wrapper');
    if (slider) {
        document.body.classList.add('_noscroll')

        tl.to('.home__slider', {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            onComplete: function () {

                const scrollHeight = slider.scrollHeight - window.innerHeight;
                let speed = 1;
                let interval = setInterval(() => {
                    if (window.innerWidth > 800) {
                        if (slider.scrollTop < scrollHeight) {
                            console.log(slider.scrollTop, scrollHeight);
                            slider.scrollTo(0, slider.scrollTop + speed);
                        }
                        else {
                            document.body.classList.remove('_noscroll')
                        }
                    }
                    else {
                        clearInterval(interval);
                    }

                }, 16);
            }
        })
    }
})



tl.to('h1 span i', {
    height: 'auto',
    duration: 0.5,
    delay: 0.5,
    stagger: 0.5
})

tl.to('h2 span i', {
    height: 'auto',
    duration: 0.5,
    delay: 0.5,
    stagger: 0.5
})