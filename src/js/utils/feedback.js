import { Swiper, Pagination, Mousewheel, FreeMode } from "swiper";

const feedbackSlides = document.querySelectorAll('.feedback__scroll .swiper-slide');
const feedbackLeftContent = document.querySelector('.feedback__left-open');
const backToFeedbacks = document.querySelector('.feedback__left-back');
if (feedbackSlides.length) {
    const swiperWrapper = document.querySelector('.feedback__scroll .swiper-wrapper');
    const pagination = document.querySelector('.feedback__scroll-pagination');

    let swiper = new Swiper('.feedback__scroll .swiper', {
        modules: [
            Mousewheel,
            Pagination,
            FreeMode
        ],
        freeMode: {
            enabled: true,
            sticky: true,
            momentumBounce: true,
        },
        mousewheel: true,
        pagination: {
            el: '.feedback__scroll-pagination',
            clickable: true
        },
        slidesPerView: 'auto',
    })

    let transform = '';

    feedbackSlides.forEach(slide => {
        slide.addEventListener('click', function () {
            if (!slide.classList.contains('_open')) {
                slide.classList.add('_open')
                feedbackLeftContent.classList.add('_open')

                swiper.mousewheel.disable();
                swiper.simulateTouch = false
                swiper.draggable = false
                swiper.allowTouchMove = false
                transform = swiperWrapper.style.transform;
                swiperWrapper.style.transform = `translate3d(0px, 0px, 0px)`;

                if (window.innerWidth <= 800) {
                    pagination.style.display = 'none'
                }

                feedbackSlides.forEach(item => {
                    if (!item.classList.contains('_open')) {
                        item.style.display = 'none'
                    }
                })
            }
            else {
                if (slide.querySelector('iframe')) {
                    const iframe = slide.querySelector('iframe');
                    iframe.src = iframe.dataset.src;
                }

                slide.classList.add('_play')
            }
        })
    })

    backToFeedbacks.addEventListener('click', function () {
        feedbackLeftContent.classList.remove('_open')

        swiper.mousewheel.enable();
        swiper.simulateTouch = true
        swiper.draggable = true
        swiper.allowTouchMove = true
        swiperWrapper.style.transform = transform;

        if (window.innerWidth <= 800) {
            pagination.style.display = 'flex'
        }

        feedbackSlides.forEach(item => {
            if (item.classList.contains('_play') && item.querySelector('iframe')) {
                item.classList.remove('_play')

                const iframe = item.querySelector('iframe');
                iframe.src = iframe.src;
            }

            item.classList.remove('_open')
            item.style.display = 'block'
        })
    })
}