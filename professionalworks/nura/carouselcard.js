// const track = document.querySelector('.carousel-track');
// const cards = document.querySelectorAll('.carouselcard');
// const leftBtn = document.querySelector('.carouselbuttonleft');
// const rightBtn = document.querySelector('.carouselbuttonright');

// let activeIndex = 0;

// function updateActiveCard() {
//     const center = track.scrollLeft + track.offsetWidth / 2;

//     cards.forEach(card => {
//         const cardCenter = card.offsetLeft + card.offsetWidth / 2;
//         const distance = Math.abs(center - cardCenter);
//         const indexDistance = distance / card.offsetWidth; // how many cards away

//         let scale = 1;
//         let opacity = 1;

//         if (indexDistance < 1) {
//             scale = 1 - 0.1 * indexDistance;
//             opacity = 1 - 0.5 * indexDistance;
//         } else if (indexDistance < 2) {
//             scale = 0.9 - 0.1 * (indexDistance - 1);
//             opacity = 0.5 - 0.3 * (indexDistance - 1);
//         } else {
//             scale = 0.8;
//             opacity = 0.2;
//         }

//         card.style.transform = `scale(${scale})`;
//         card.style.opacity = opacity;
//         card.style.zIndex = Math.round((2 - indexDistance) * 10); // higher zIndex = on top
//     });
// }

// function updateChevronVisibility() {
//     const maxScrollLeft = track.scrollWidth - track.clientWidth;
//     const scrollLeft = track.scrollLeft;

//     if (scrollLeft <= 5) {
//         leftBtn.style.opacity = '0.2';
//         leftBtn.style.pointerEvents = 'none';
//     } else {
//         leftBtn.style.opacity = '1';
//         leftBtn.style.pointerEvents = 'auto';
//     }

//     if (scrollLeft >= maxScrollLeft - 5) {
//         rightBtn.style.opacity = '0.2';
//         rightBtn.style.pointerEvents = 'none';
//     } else {
//         rightBtn.style.opacity = '1';
//         rightBtn.style.pointerEvents = 'auto';
//     }
// }


// function smoothScrollTo(targetPosition) {
//     const duration = 600;
//     const start = track.scrollLeft;
//     const startTime = performance.now();

//     function animateScroll(currentTime) {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const ease = 1 - Math.pow(1 - progress, 3);
//         track.scrollLeft = start + (targetPosition - start) * ease;
//         if (progress < 1) requestAnimationFrame(animateScroll);
//     }

//     requestAnimationFrame(animateScroll);
// }

// function scrollToCard(index) {
//     if (index < 0 || index >= cards.length) return;
//     activeIndex = index;
//     const card = cards[activeIndex];
//     const trackCenter = track.offsetWidth / 2;
//     const cardCenter = card.offsetLeft + card.offsetWidth / 2;
//     const scrollTarget = cardCenter - trackCenter;
//     smoothScrollTo(scrollTarget);
// }

// leftBtn.addEventListener('click', () => scrollToCard(activeIndex - 1));
// rightBtn.addEventListener('click', () => scrollToCard(activeIndex + 1));

// track.addEventListener('scroll', () => {
//     requestAnimationFrame(() => {
//         updateActiveCard();
//         updateChevronVisibility();
//     });
// });
// window.addEventListener('load', () => {
//     updateActiveCard();
//     scrollToCard(activeIndex);
//     updateChevronVisibility();
// });


const cards = document.querySelectorAll('.carouselcard');
const leftBtn = document.querySelector('.carouselbuttonleft');
const rightBtn = document.querySelector('.carouselbuttonright');
let activeIndex = 0;

function renderCarousel() {
    cards.forEach((card, i) => {
        const offset = i - activeIndex;

        let scale = 1 - 0.1 * Math.abs(offset);
        let opacity = 1 - 0.3 * Math.abs(offset);
        if (Math.abs(offset) > 2) {
            scale = 0.8;
            opacity = 0;
        }

        card.style.transform = `translateX(${offset * 360}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = 10 - Math.abs(offset);
        card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
    });

    leftBtn.style.opacity = activeIndex === 0 ? '0.2' : '1';
    rightBtn.style.opacity = activeIndex === cards.length - 1 ? '0.2' : '1';
}

leftBtn.addEventListener('click', () => {
    if (activeIndex > 0) {
        activeIndex--;
        renderCarousel();
    }
});

rightBtn.addEventListener('click', () => {
    if (activeIndex < cards.length - 1) {
        activeIndex++;
        renderCarousel();
    }
});

window.addEventListener('load', renderCarousel);



const wrapper = document.querySelector('.carousel-wrapper');
let startX = 0;
let isDragging = false;

// Wheel gesture (desktop)
wrapper.addEventListener('wheel', (e) => {
    if (e.deltaX > 10) {
        goToNextCard();
    } else if (e.deltaX < -10) {
        goToPrevCard();
    }
});

// Touch drag (mobile/tablet)
wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX > 50) {
        goToPrevCard();
        isDragging = false;
    } else if (deltaX < -50) {
        goToNextCard();
        isDragging = false;
    }
});

wrapper.addEventListener('touchend', () => {
    isDragging = false;
});

function goToNextCard() {
    if (activeIndex < cards.length - 1) {
        scrollToCard(activeIndex + 1);
    }
}

function goToPrevCard() {
    if (activeIndex > 0) {
        scrollToCard(activeIndex - 1);
    }
}
