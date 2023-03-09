import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { Swiper, Pagination, Mousewheel, FreeMode } from "swiper";

gsap.registerPlugin(ScrollTrigger);




const subjects = document.querySelector('.section__subjects');
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
const aboutTitle = document.querySelector('.about h1');
if (horizontalScrollSliders.length) {
    horizontalScrollSliders.forEach(scrollSlider => {
        const sliderContainer = scrollSlider.querySelector('.horizontal__scroll-continer');
        const sliderBody = scrollSlider.querySelector('.horizontal__scroll-slides');
        const slides = scrollSlider.querySelectorAll(".horizontal__scroll-slide");
        const slideBody = scrollSlider.querySelectorAll(".horizontal__scroll-slide-body");
        const pagination = scrollSlider.querySelector(".horizontal__scroll-pagination");


        let x = slides[0].getBoundingClientRect().width * (slides.length - 1) - (sliderBody.offsetWidth - slides[0].getBoundingClientRect().width)




        const lastTrigger = horizontalScrollSliders[horizontalScrollSliders.length - 1].querySelector('.horizontal__scroll-slides')
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

                    if (aboutTitle) {
                        aboutTitle.classList.add('_hide')
                    }
                },
                onLeaveBack: () => {
                    gsap.to(slideBody, {
                        yPercent: 50,
                        stagger: 0.15,
                        opacity: 0,
                        duration: 0.5
                    })

                    if (aboutTitle) {
                        aboutTitle.classList.remove('_hide')
                    }
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
                    onEnter: (e) => {
                        if (title) {
                            title.classList.add('_hide')
                        }
                    },
                    onLeave: () => {
                        if (lastTrigger != sliderBody) {
                            if (title) {
                                title.classList.remove('_hide')
                            }
                        }
                    },
                    onEnterBack: () => {
                        if (title) {
                            title.classList.add('_hide')
                        }
                    },
                    onLeaveBack: () => {
                        if (title) {
                            title.classList.remove('_hide')
                        }
                    }
                }
            });
        }

        else {
            ScrollTrigger.create({
                trigger: sliderBody,
                start: "top center",
                scrub: true,
                invalidateOnRefresh: true,
                // markers: true,
                end: "+=125%",
                onEnter: (e) => {
                    if (title) {
                        title.classList.add('_hide')
                    }
                },
                onLeave: () => {

                    if (lastTrigger != sliderBody) {
                        if (title) {
                            title.classList.remove('_hide')
                        }
                    }
                },
                onEnterBack: () => {
                    if (title) {
                        title.classList.add('_hide')
                    }
                },
                onLeaveBack: () => {
                    if (title) {
                        title.classList.remove('_hide')
                    }
                }
            }
            )

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




const scrollSections = document.querySelectorAll('.section__scroll-slide');
scrollSections.forEach((section, i) => {
    const hidden = section.querySelector('.hidden');

    ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "+=50%",
        onEnter: () => {
            hidden.classList.add('_show');
        },
        onLeave: () => {
            hidden.classList.add('_hide');
            hidden.classList.remove('_show');
        },
        onEnterBack: () => {
            hidden.classList.add('_show');
            hidden.classList.remove('_hide');
        },
        onLeaveBack: () => {
            hidden.classList.remove('_show');
        },
    });
})



const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const title = aboutSection.querySelector('h1');
    const animatedBlocks = document.querySelectorAll('.about-animate');
    const images = document.querySelectorAll('.about__images img');


    const observer = new IntersectionObserver(entries => {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.timeline.play();
            }
        });
    })

    if (images.length) {
        images.forEach(img => {
            const action = gsap.timeline({ paused: true })
                .to(img, {
                    opacity: 1,
                    duration: 2,
                    delay: +img.dataset.delay
                })

            img.timeline = action;

            observer.observe(img);
        });
    }

    animatedBlocks.forEach(block => {

        ScrollTrigger.create({
            trigger: block,
            start: "top top",
            end: "bottom",
            scrub: 1,
            // snap: {
            //     snapTo: 1.5,
            //     duration: 0.2,
            //     ease: "none"
            // },

            onEnter: () => {
                title.classList.add('_active')

                block.classList.add('_active')
                document.querySelector('.enter').innerHTML = 'onEnter';
            },
            onLeave: () => {
                block.classList.add('_hide')
                block.classList.remove('_active')

                if (animatedBlocks[animatedBlocks.length - 1] == block && window.innerWidth <= 800) {
                    title.classList.add('_hide')
                }
                document.querySelector('.enter').innerHTML = 'onLeave';

            },
            onEnterBack: () => {
                block.classList.add('_active')
                block.classList.remove('_hide')

                if (animatedBlocks[animatedBlocks.length - 1] == block && window.innerWidth <= 800) {
                    title.classList.remove('_hide')
                }
                document.querySelector('.enter').innerHTML = 'onEnterBack';

            },
            onLeaveBack: () => {
                block.classList.remove('_active')
                if (animatedBlocks[0] == block) {
                    title.classList.remove('_active')
                }
                document.querySelector('.enter').innerHTML = 'onLeaveBack';

            },

        });
    })
}