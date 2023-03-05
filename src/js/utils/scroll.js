import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { Swiper, Pagination } from "swiper";

gsap.registerPlugin(ScrollTrigger);


const subjects = document.querySelector('.advantages__subjects');

if (subjects) {
    ScrollTrigger.create({
        trigger: subjects,
        start: "top bottom",
        end: "top+=75%",
        //  markers: true,
        onEnter: () => {
            subjects.classList.add('_show');
        },
        onLeave: () => {
            subjects.classList.remove('_show');
            subjects.classList.add('_hide');
        },
        onEnterBack: () => {
            subjects.classList.remove('_hide');
            subjects.classList.add('_show');
        },
        onLeaveBack: () => {
            subjects.classList.remove('_show');
        },
        // onRefresh: self => self.progress && self.animation.progress(1),
    });
}


const horizontalScrollSliders = document.querySelectorAll('.horizontal__scroll');
const title = document.querySelector('.scroll-animate__title');
if (horizontalScrollSliders.length) {
    horizontalScrollSliders.forEach(scrollSlider => {
        const sliderContainer = scrollSlider.querySelector('.horizontal__scroll-continer');
        const sliderBody = scrollSlider.querySelector('.horizontal__scroll-slides');
        const slides = scrollSlider.querySelectorAll(".horizontal__scroll-slide");
        const slideBody = scrollSlider.querySelectorAll(".horizontal__scroll-slide-body");
        const pagination = scrollSlider.querySelector(".horizontal__scroll-pagination");


        let x = slides[0].getBoundingClientRect().width * (slides.length - 1) - (sliderBody.offsetWidth - slides[0].getBoundingClientRect().width)


        if (window.innerWidth > 800) {
            gsap.set(slideBody, {
                yPercent: 50,
                opacity: 0,
                duration: 0.5,
            });

            let tween = gsap.timeline();

            ScrollTrigger.create({
                trigger: sliderBody,
                start: "top center",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: () => {
                    gsap.to(slideBody, {
                        yPercent: 0,
                        stagger: 0.15,
                        opacity: 1,
                        duration: 0.5
                    })
                },
                onLeaveBack: () => {
                    gsap.to(slideBody, {
                        yPercent: 50,
                        stagger: 0.15,
                        opacity: 0,
                        duration: 0.5
                    })
                },
            })

            tween.to(slides, {
                x: -x,
                ease: "none",
                scrollTrigger: {
                    trigger: sliderBody,
                    pin: true,
                    start: "center center",
                    scrub: true,
                    invalidateOnRefresh: true,
                    // snap: {
                    //     snapTo: 1 / (slides.length - 1),
                    //     inertia: false,
                    //     duration: { min: 0.1, max: 0.1 }
                    // },
                    end: () => "+=" + sliderBody.offsetWidth,
                    onEnter: () => {
                        title.classList.add('_hide')
                    },
                    onLeave: () => {
                        title.classList.remove('_hide')
                    },
                    onEnterBack: () => {
                        title.classList.add('_hide')
                    },
                    onLeaveBack: () => {
                        title.classList.remove('_hide')
                    },
                }
            });
        }

        else {
            sliderContainer.classList.add('swiper');
            sliderBody.classList.add('swiper-wrapper');
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];

                slide.classList.add('swiper-slide');

            }

            new Swiper(sliderContainer, {
                modules: [
                    Pagination
                ],
                loop: true,
                slidesPerView: 'auto',
                pagination: {
                    el: pagination,
                    clickable: true,
                },
            })
        }

    })
}



const heights = document.querySelectorAll('.height-bg');
const hiddens = document.querySelectorAll('.hidden');
heights.forEach((height, i) => {

    ScrollTrigger.create({
        trigger: height,
        start: "center center",
        end: "+=50%",
        // markers: true,
        onEnter: () => {
            hiddens[i].classList.add('_show');
            onEnterHeightAnimate(hiddens[i])
        },
        onLeave: () => {
            hiddens[i].classList.add('_hide');
            hiddens[i].classList.remove('_show');
            onLeaveHeightAnimate(hiddens[i])
        },
        onEnterBack: () => {
            hiddens[i].classList.add('_show');
            hiddens[i].classList.remove('_hide');
            onEnterBackHeightAnimate(hiddens[i])
        },
        onLeaveBack: () => {
            hiddens[i].classList.remove('_show');
            onLeaveBackHeightAnimate(hiddens[i])
        },
        // onRefresh: self => self.progress && self.animation.progress(1),
    });

})

let timeline = gsap.timeline();
function onEnterHeightAnimate(elem) {
    const i = elem.querySelectorAll('span i')
    if (i.length) {
        timeline.to(i, {
            y: '0',
            duration: 0.5,
            stagger: 0.3
        })
    }
}

function onEnterBackHeightAnimate(elem) {
    const i = elem.querySelectorAll('span i')
    if (i.length) {
        timeline.to(i, {
            y: '0',
            opacity: 1,
            duration: 0.5,
        })
    }
}

function onLeaveHeightAnimate(elem) {
    const i = elem.querySelectorAll('span i')
    if (i.length) {
        timeline.to(i, {
            opacity: 0,
            duration: 0.5,
        })
    }
}

function onLeaveBackHeightAnimate(elem) {
    const i = elem.querySelectorAll('span i')
    if (i.length) {
        timeline.to(i, {
            y: '100%',
            duration: 0.5,
        })
    }
}