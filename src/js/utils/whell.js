const slider = document.querySelector('.advantages__scroll');
const slides = document.querySelectorAll('.advantages__scroll-slide');

let scroll = false;
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        scroll = true
    }
    else {
        scroll = false
    }
})



let i = 0;
let canSlide = true;
let lastTimestamp = 0;
let lastWheelDelta = 0;


window.addEventListener('wheel', function (e) {
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    observer.observe(slider);

    let wheelDelta = e.wheelDeltaY
    let timeDelta = Date.now() - lastTimestamp
    lastTimestamp = Date.now()
    let wheelDeltaDelta = Math.abs(Math.abs(wheelDelta) - Math.abs(lastWheelDelta))

    if (wheelDeltaDelta > 10) {
        lastTimestamp = 0;
    }
    lastWheelDelta = wheelDelta

    if (canSlide && (timeDelta > 100)) {
    }

    if (scroll == true && slider.getBoundingClientRect().top <= 100) {
        if (canSlide && (timeDelta > 100)) {
            canSlide = false;

            if (delta < 0) {
                slides[i].classList.add('_show')

                if (slides[i - 1]) {
                    slides[i - 1].classList.remove('_show')
                    slides[i - 1].classList.add('_hide')
                }


                window.scrollTo(
                    0, window.scrollY + slides[i].getBoundingClientRect().top
                )
                setTimeout(() => {
                    canSlide = true
                }, 500);

                console.log('to bottom');

                i++;
                if (i > slides.length - 1) {
                    i = slides.length - 1
                }

            }

            else {
                slides[i].classList.remove('_show')

                if (slides[i - 1]) {
                    slides[i - 1].classList.remove('_hide')
                    slides[i - 1].classList.add('_show')
                }

                window.scrollTo(
                    0, window.scrollY - slides[i].getBoundingClientRect().top
                )
                setTimeout(() => {
                    canSlide = true
                }, 500);

                console.log('to top');


                i--;
                if (i < 0) {
                    i = 0
                }
            }
        }
    }
}) 