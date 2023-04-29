import { gsap } from "gsap";

import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import Observer from "gsap/Observer.js";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, Observer);
const tl = gsap.timeline()

document.addEventListener('DOMContentLoaded', function (e) {
    const slider = document.querySelector('.home__slider-wrapper');
    const home = document.querySelector('.home');
    let speed = 1;
    let locked = false;

    const homeObserver = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting && window.innerWidth > 800) {
            document.body.classList.add('_noscroll-fixed')
            window.scrollTo(0, 0)
            observer.unobserve(entries[0].target)
        }
        if (entries[0].isIntersecting) {
            gsap.to(home, {
                opacity: 1,
                duration: 0.5
            })
            observer.unobserve(entries[0].target)
        }
    }, { threshold: 1 });

    if (slider) {
        homeObserver.observe(home)
        const scrollHeight = slider.scrollHeight - window.innerHeight;

        let delay = 0
        if (window.innerWidth > 800) {
            delay = 0.5
        }

        tl.to('.home__slider', {
            opacity: 1,
            duration: 0.5,
            delay: delay,

            onComplete: function () {
                let interval = setInterval(() => {
                    if (window.innerWidth > 800) {
                        if (speed < scrollHeight && locked == false) {
                            speed++;

                            slider.style.transform = `translate3d(0, ${-speed}px, 0)`;
                        }
                        if (speed == scrollHeight) {
                        }
                    }
                    else {
                        clearInterval(interval);
                    }

                }, 16);
            }
        })


        Observer.create({
            target: window,
            type: 'wheel,scroll,DOMMouseScroll',

            onChangeY: (self) => {
                if (document.querySelector('.home').getBoundingClientRect().top == 0 && window.innerWidth > 800) {
                    locked = true;
                    speed += self.deltaY;

                    if (speed < 0) {
                        speed = 0
                    }
                    if (speed > scrollHeight) {
                        speed = scrollHeight
                    }

                    let start = speed;
                    slider.style.transform = `translate3d(0, ${-speed}px, 0)`;

                    setTimeout(() => {
                        if (start == speed) {
                            locked = false;
                        }
                    }, 750);

                    if (speed == scrollHeight) {
                        document.body.classList.remove('_noscroll-fixed')
                        gsap.to(home, {
                            opacity: 0,
                            duration: 0.5,
                        })
                        gsap.to(window, { scrollTo: "#advantages" });
                    }
                }
            }
        })

        window.addEventListener('scroll', (e) => {
            homeObserver.observe(home)
        })
    }
})


const callback = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.timeline.play();

            observer.unobserve(entry.target)
        }
    });
};

const options = {
    threshold: 0.6,
};

const observer = new IntersectionObserver(callback, options);
const titles = document.querySelectorAll(".title-animate");
if (titles.length) {
    titles.forEach(title => {
        const action = gsap.timeline({ paused: true })
            .to(title.querySelectorAll('span i'), {
                height: '1em',
                duration: 0.5,
                delay: 0.5,
                stagger: 0.5,
                onComplete: () => {
                    if (title.closest('.loader')) {
                        gsap.to('.loader', {
                            opacity: 0,
                            duration: 0.75,
                            onComplete: () => {
                                gsap.to('.header', {
                                    opacity: 1,
                                    duration: 0.3,
                                })
                                document.querySelector('.loader').remove()
                            }
                        })
                    }
                    else {
                        gsap.to('.header', {
                            opacity: 1,
                            duration: 0.75,
                        })
                    }
                }
            })

        title.timeline = action;

        observer.observe(title);
    });
}
else {
    gsap.to('.header', {
        delay: 1,
        opacity: 1,
        duration: 0.75,
    })
}