import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { Swiper, Pagination } from "swiper";
import { closeOpenMenu } from "./menu.js";
// import { scrollToElementRef } from "./scrollintovew.js";

gsap.registerPlugin(ScrollTrigger);

// анимации блоков должныбыть запущены поочередно иначер подсчет высоты для пин элемента будет неверный

function createVerticalScrollAnimation(section) {
    let scrollduration = 1;
    if (window.innerWidth <= 800) {
        scrollduration = 0.5;
    }

    if (section) {
        const hidden = section.querySelector('.hidden');

        ScrollTrigger.create({
            trigger: section,
            start: "center center",
            end: "+=100%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
                hidden.classList.add('_show');
            },
            onLeave: () => {
                hidden.classList.add('_hide');
                hidden.classList.remove('_show');

                if (window.innerWidth <= 800) {
                    if (section.closest('.section__scroll').nextElementSibling) {
                        const next = section.closest('.section__scroll').nextElementSibling;
                        if (!next.classList.contains('horizontal__scroll')) {
                            if (unsetScrolltrigger == false) {
                                gsap.to(window, {
                                    scrollTo: { y: `+=${innerHeight}`, autoKill: false, ease: "Power3.easeInOut" },
                                    duration: scrollduration
                                });
                            }
                        }
                    }
                }
                else {
                    if (unsetScrolltrigger == false) {
                        gsap.to(window, {
                            scrollTo: { y: `+=${innerHeight}`, autoKill: false, ease: "Power3.easeInOut" },
                            duration: scrollduration
                        });
                    }
                }


            },
            onEnterBack: () => {
                hidden.classList.add('_show');
                hidden.classList.remove('_hide');
            },
            onLeaveBack: () => {
                hidden.classList.remove('_show');

                if (window.innerWidth <= 800) {
                    if (section.closest('.section__scroll').previousElementSibling) {
                        const prev = section.closest('.section__scroll').previousElementSibling;
                        if (!prev.classList.contains('horizontal__scroll')) {
                            if (unsetScrolltrigger == false) {
                                gsap.to(window, {
                                    scrollTo: { y: `-=${innerHeight}`, autoKill: false, ease: "Power3.easeInOut" },
                                    duration: scrollduration
                                });
                            }
                        }
                    }
                }
                else {
                    if (unsetScrolltrigger == false) {
                        gsap.to(window, {
                            scrollTo: { y: `-=${innerHeight}`, autoKill: false, ease: "Power3.easeInOut" },
                            duration: scrollduration
                        });
                    }
                }
            },
        });
    }
}

function createHorizontalScrollAnimation(horizontalScrollSliders) {
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
                    end: () => "+=" + sliderBody.offsetWidth,
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
                        if (title) {
                            title.classList.add('_hide')
                        }
                    },
                    onLeave: () => {
                        if (title) {
                            setTimeout(() => {
                                title.classList.remove('_hide')
                            }, 1000);
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
                        if (title) {
                            title.classList.remove('_hide')
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

                        end: () => "+=" + sliderBody.offsetWidth,
                    }
                });
            }

            else {
                ScrollTrigger.create({
                    trigger: sliderBody,
                    start: "top center",
                    scrub: true,
                    invalidateOnRefresh: true,
                    end: "+=125%",
                    onEnter: (e) => {
                        if (title) {
                            title.classList.add('_hide')
                        }
                    },
                    onLeave: () => {
                        if (title) {
                            title.classList.remove('_hide')
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
                })

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
}

// первый вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_1 .section__scroll-slide'))

// второй вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_2 .section__scroll-slide'))

// третий вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_3 .section__scroll-slide'))

// четвертый вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_4 .section__scroll-slide'))


const subjects = document.querySelector('.section__subjects');
if (subjects) {
    ScrollTrigger.create({
        trigger: subjects,
        start: "top bottom",
        end: "top+=75%",
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

// пятый вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_5 .section__scroll-slide'))

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const title = aboutSection.querySelector('h1');
    const images = document.querySelectorAll('.about__images img');


    const observer = new IntersectionObserver(entries => {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.timeline.play();

                observer.observe(entry.target);
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

    let timeline = gsap.timeline();

    ScrollTrigger.create({
        trigger: '.about__body',
        start: "center center",
        end: "+=100%",
        scrub: 1,

        onEnter: () => {
            title.classList.add('_active')
            gsap.to('.about__images', {
                y: '-100%',
                duration: 1,
                onComplete: () => {
                    gsap.to('.about__text-animate', {
                        y: 0,
                        opacity: 1,
                        stagger: 0.2,
                        duration: 0.5
                    })
                }
            })

        },
        onLeave: () => {
            if (window.innerWidth <= 800) {
                title.classList.add('_hide')
            }

            gsap
                .to('.about__text-animate', {
                    y: -50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.5,
                })
        },
        onEnterBack: () => {

            gsap
                .to('.about__text-animate', {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.5
                })


            if (window.innerWidth <= 800) {
                title.classList.remove('_hide')
            }
        },
        onLeaveBack: () => {
            gsap
                .to('.about__text-animate', {
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.5,

                })
            gsap.to('.about__images', {
                y: 0,
                duration: 1,

            })
            title.classList.remove('_active')
        },
    });
}

// первый горизонталный слайдер
createHorizontalScrollAnimation(document.querySelectorAll('.horizontal__scroll#horizontal__scroll_1'))

// шестой вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_6 .section__scroll-slide'))

// второй горизонталный слайдер
createHorizontalScrollAnimation(document.querySelectorAll('.horizontal__scroll#horizontal__scroll_2'))

// седьмой вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_7 .section__scroll-slide'))

// третий горизонталный слайдер
createHorizontalScrollAnimation(document.querySelectorAll('.horizontal__scroll#horizontal__scroll_3'))

// восьмой вертикальный слайдер
createVerticalScrollAnimation(document.querySelector('#vertical_scroll_8 .section__scroll-slide'))

// четвертый горизонталный слайдер
createHorizontalScrollAnimation(document.querySelectorAll('.horizontal__scroll#horizontal__scroll_4'))


ScrollTrigger.normalizeScroll();

let unsetScrolltrigger = false;
const homeScrolLinks = document.querySelectorAll('a[data-href]');
if (homeScrolLinks.length) {
    homeScrolLinks.forEach(link => {
        const section = document.querySelector(`#${link.dataset.href}`);
        link.addEventListener('click', function (e) {
            // e.preventDefault();

            unsetScrolltrigger = true;
            document.body.classList.remove('_noscroll-fixed')
            closeOpenMenu();
            ScrollTrigger.refresh()

            // section.scrollIntoView()
            // ScrollTrigger.refresh()

            // ScrollTrigger.refresh()
            // scrollToElementRef(
            //     window,
            //     section,
            //     {
            //         behavior: 'smooth',
            //         block: 'start',
            //         inline: 'nearest',
            //     }
            // ).then(() => {
            //     ScrollTrigger.refresh()
            //     unsetScrolltrigger = false;
            // });
        })
    })
}