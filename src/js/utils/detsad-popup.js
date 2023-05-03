import gsap from 'gsap'

const openDetsadPopupLinks = document.querySelectorAll('[data-popup="detsad"]');
if (openDetsadPopupLinks.length) {
    const popup = document.querySelector('.popup__detsad');
    const popupClose = popup.querySelector('.popup-close');

    openDetsadPopupLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            popup.classList.add('_open')

            gsap.to(popup, {
                opacity: 1,
                duration: 0.7,
            })
        })
    })

    popupClose.addEventListener('click', function () {
        popup.classList.remove('_open')

        gsap.to(popup, {
            opacity: 0,
            duration: 0.7,
        })
    })
}

