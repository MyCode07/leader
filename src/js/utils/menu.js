import { gsap, TweenMax } from "gsap";
import { isMobile } from "./isMobile.js";
gsap.registerPlugin(TweenMax)

const menu = document.querySelector('.menu__bottom');
const burger = document.querySelector('.menu__bottom-burger');
const body = document.body;


if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('_open')
        menu.classList.toggle('_open')
        body.classList.toggle('_noscroll')


        if (burger.classList.contains('_open')) {
            // TweenMax.to('.to-left', {
            //     y: 0,
            //     x: -305,
            //     z: 0,
            //     duration: 0.5,
            //     ease: 'ease-in-out',
            // })

            if (window.innerWidth > 800) {
                TweenMax.to('.menu__bottom-right', {
                    y: 0,
                    x: 0,
                    z: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'ease-in-out',
                })
            }
            else {
                let width = document.querySelector('.menu__bottom-right').getBoundingClientRect().width;
                TweenMax.to('.menu__bottom-right', {
                    y: 0,
                    x: width - 57,
                    z: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'ease-in-out',
                })
            }

            TweenMax.to('.menu__bottom', {
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'ease-in-out',
                delay: 0.2
            })

            TweenMax.to('.menu__bottom-left li', {
                y: 0,
                x: 0,
                z: 0,
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
                stagger: {
                    from: 'end',
                    each: 0.05
                }
            })
        }
        else {
            TweenMax.to('.menu__bottom-left li', {
                y: '100%',
                x: 0,
                z: 0,
                opacity: 0,
                duration: 0.1,
                stagger: {
                    from: 'end',
                    each: 0.05
                }
            })

            // TweenMax.to('.to-left', {
            //     y: 0,
            //     x: 0,
            //     z: 0,
            //     duration: 0.5,
            //     ease: 'ease-in-out',
            //     delay: 0.6,
            // })


            TweenMax.to('.menu__bottom-right', {
                y: 0,
                x: '100%',
                z: 0,
                duration: 0.5,
                ease: 'ease-in-out',
                delay: 0.3,

            })

            TweenMax.to('.menu__bottom', {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.5,
                ease: 'ease-in-out',
                delay: 0.6,
            })


        }

        if (rightBurger.classList.contains('_open')) {
            rightBurger.classList.remove('_open')
            rightMenu.classList.remove('_open')
        }
    })
}

const menuList = document.querySelectorAll('.menu-link');
if (menuList.length) {
    menuList.forEach(link => {

        const submenu = link.querySelector('.submenu');
        if (submenu) {


            if (isMobile.any()) {
                link.querySelector('button').addEventListener('click', function (e) {
                    submenu.classList.toggle('_open')
                    this.classList.toggle('_open')
                });
            }
            else {
                let top = link.getBoundingClientRect().top
                submenu.style.top = window.innerHeight / 2 - top + 'px'

                link.addEventListener('mouseenter', function (e) {
                    submenu.classList.add('_open')
                });
                link.addEventListener('mouseleave', function (e) {
                    submenu.classList.remove('_open')
                });
            }
        }

    })
}


const rightBurger = document.querySelector('.right-burger');
const rightMenu = document.querySelector('.menu__bottom-right');

if (rightBurger) {
    rightBurger.addEventListener('click', () => {
        burger.classList.toggle('_light-background')
        rightBurger.classList.toggle('_open')

      

        if (window.innerWidth < 800) {
            if (rightBurger.classList.contains('_open')) {
                TweenMax.to('.menu__bottom-right', {
                    y: 0,
                    x: 0,
                    z: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'ease-in-out',
                    onStart: () => rightMenu.classList.add('_open')
                })
            }
            else {
                let width = document.querySelector('.menu__bottom-right').getBoundingClientRect().width;
                TweenMax.to('.menu__bottom-right', {
                    y: 0,
                    x: width - 57,
                    z: 0,
                    duration: 0.5,
                    ease: 'ease-in-out',
                    delay: 0.3,
                    onComplete: () => rightMenu.classList.remove('_open')

                })
            }
        }
    })
}

