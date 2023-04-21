import gsap from 'gsap'
import { Swiper, Pagination, Navigation, Lazy, Manipulation } from 'swiper';
import { excerpt } from './excerpt.js';


if (document.querySelector('.hull')) {
    async function getFaq() {
        const corpus = document.querySelector('h1').dataset.title;

        const file = `../files/${corpus}.json`;
        let response = await fetch(file, {
            method: "GET"
        });
        if (response.ok) {
            let result = await response.json();
            buildGrid(result, corpus)
            observeHullGridItems(result, corpus)
        }
        else {
            alert("Error");
        }
    }
    getFaq()



    function buildGrid(data, corpus) {
        if (data) {

            let list = ''
            for (let key in data) {
                let description_15 = excerpt(data[key].description, 15);
                let description_30 = excerpt(data[key].description, 20);

                list += `<li>
                    <a href="#${key}">
                        <h4>${data[key].name}</h4>
                        <div class="hull-grid__info">
                            <div class="hull-grid__left">
                                <p>${description_15}</p>
                                <img src="img/hull-grid-arrow.png" alt="">
                            </div>
                            <div class="hull-grid__image">
                                <img src="img/korpusa/${corpus}/${key}/${data[key].images[0]}" alt="">
                            </div>
                        </div>
                    </a>
                    <div class="hull-grid__hover">
                        <div>
                            <span>${data[key].name}</span>
                            <img src="img/hull-grid-arrow-white.png" alt="">
                        </div>
                        <p>${description_30}</p>
                        <a href="">Подробнее</a>
                    </div>
                </li>`
            }

            document.querySelector('.hull-grid ul').insertAdjacentHTML('beforeend', list);
        }
    }
}



const stagger = 0.2;
const observer = new IntersectionObserver(entries => {
    let intersected = 0;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target, intersected);
            intersected++;

            observer.unobserve(entry.target)
        }
    })
}, { threshold: 0.2 });


function observeHullGridItems(data, corpus) {
    const hullGridItems = document.querySelectorAll(".hull-grid ul li");
    const popup = document.querySelector('.hull__popup');
    const popupClose = document.querySelector('.hull__popup-close');
    const popupTitle = document.querySelector('.hull__popup-info h4');
    const popupDescription = document.querySelector('.hull__popup-info p');
    const popupSwiper = document.querySelector('.hull__popup .swiper');
    const popupSwiperWrapper = document.querySelector('.hull__popup .swiper-wrapper');

    if (hullGridItems.length) {
        hullGridItems.forEach(hull => {
            observer.observe(hull)
            let link = hull.querySelector('a');

            link.addEventListener('click', (e) => {
                e.preventDefault()

                const name = link.getAttribute('href').slice(1);
                const object = data[name]

                popupTitle.textContent = object.name
                popupDescription.textContent = object.description

                const swiper = new Swiper(popupSwiper, {
                    modules: [
                        Pagination, Navigation, Lazy, Manipulation
                    ],
                    slidesPerView: 'auto',
                    lazy: {
                        loadPrevNext: false
                    },
                    navigation: {
                        prevEl: '.swiper-prev',
                        nextEl: '.swiper-next'
                    },
                    pagination: {
                        type: 'progressbar',
                        el: '.swiper-pagination'
                    }
                })


                let slides = popupSwiperWrapper.querySelectorAll('.swiper-slide')
                if (slides.length) {
                    slides.forEach(slide => {
                        slide.remove();
                    })
                    swiper.update();
                }

                const key = Object.keys(data).find(k => data[k] === object);
                object.images.forEach(img => {
                    let image = `<div class="swiper-slide"><img src="img/korpusa/${corpus}/${key}/${img}" alt=""></div>`
                    swiper.appendSlide(image)
                });



                popup.classList.add('_open')
                document.body.classList.add('_noscroll')

                gsap.to(popup, {
                    opacity: 1,
                    duration: 0.7,
                })
                gsap.to(popup.querySelector('.hull__popup-slider'), {
                    opacity: 1,
                    delay: 0.3,
                    duration: 1,
                })
                gsap.to(popup.querySelector('.hull__popup h4'), {
                    opacity: 1,
                    delay: 0.6,
                    duration: 1,
                })
                gsap.to(popup.querySelector('.hull__popup p'), {
                    opacity: 1,
                    delay: 0.9,
                    duration: 1,
                })

                gsap.to(popup.querySelectorAll('.hull__popup .swiper-navigation button'), {
                    opacity: 1,
                    delay: 1.2,
                    duration: 1,
                    stagger: 0.3
                })

            })
        })
    }

    popupClose.addEventListener('click', function () {
        popup.classList.remove('_open')
        document.body.classList.remove('_noscroll')

        gsap.to(popup, {
            opacity: 0,
            duration: 0.7,
        })
        gsap.to(popup.querySelector('.hull__popup-slider'), {
            opacity: 0,
            duration: 0.7,
        })
        gsap.to(popup.querySelector('.hull__popup h4'), {
            opacity: 0,
            duration: 0.7,
        })
        gsap.to(popup.querySelector('.hull__popup p'), {
            opacity: 0,
            duration: 0.7,
        })

        gsap.to(popup.querySelectorAll('.hull__popup .swiper-navigation button'), {
            opacity: 0,
            duration: 0.7,
        })
    })
}

function animate(entry, i) {
    gsap.to(entry, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: stagger * i
    })
}


const hullmap = document.querySelector('.hull-map');

if (hullmap) {
    const title = hullmap.querySelector('h3')
    const span = hullmap.querySelector('span')
    const map = hullmap.querySelector('iframe')

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            gsap.to(span, {
                opacity: 1,
                duration: 1,
                onComplete: () => {

                    gsap.to(span, {
                        opacity: 0,
                        duration: 0.7,
                    })
                }
            })

            gsap.to(map, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 1,
            })

            gsap.to(title, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 1.5,
            })

            observer.unobserve(entries[0].target)
        }
    }, { threshold: 0.2 });

    observer.observe(hullmap)
}