var loader = document.getElementById("preloader");

window.addEventListener("load", function() {
    setTimeout(function() {
        loader.classList.add("hide");
    }, 1000);
});

// JavaScript to load header
fetch('navbar.html')
.then(response => response.text())
.then(data => {
// Insert the fetched HTML into the header div
document.getElementById('header').innerHTML = data;
})
.catch(error => console.error('Error fetching navbar:', error));

document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('navcont');
    const navDesA = document.getElementById('navdesa');
    const navDesB = document.getElementById('navdesb');

    // Flicker effect logic
    function flickerEffect(element, originalSrc, hoverSrc, times, duration) {
        let flickerCount = 0;
        const interval = setInterval(() => {
            element.src = (flickerCount % 2 === 0) ? hoverSrc : originalSrc;
            flickerCount++;
            if (flickerCount >= times * 2) { // times * 2 because we are toggling between 2 states
                clearInterval(interval);
                element.src = hoverSrc; // Final hover image
            }
        }, duration);
    }

    // Add hover event listener for the whole navcont container
    navContainer.addEventListener('mouseenter', () => {
        // Flicker effect for navdesa (3 times flicker, 100ms per toggle)
        flickerEffect(navDesA, 'assets/navleft.svg', 'assets/navlefth.svg', 3, 100);
        // Flicker effect for navdesb (3 times flicker, 100ms per toggle)
        flickerEffect(navDesB, 'assets/navright.svg', 'assets/navrighth.svg', 3, 100);
    });

    navContainer.addEventListener('mouseleave', () => {
        // Flicker effect for reverting back to original images
        flickerEffect(navDesA, 'assets/navlefth.svg', 'assets/navleft.svg', 2, 100);
        flickerEffect(navDesB, 'assets/navrighth.svg', 'assets/navright.svg', 2, 100);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the current page URL
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page name

    // Create a mapping of page names to their corresponding nav IDs
    const navMap = {
        "professionalworks": "nav1",
        "creativeworks": "nav2",
        "blogs": "nav3",
        "services": "nav4",
        "about": "nav5",
        "contact": "nav6"
    };

    // Check if the current page exists in the navMap
    if (navMap[currentPage]) {
        // Get the corresponding nav element and add the red class
        document.getElementById(navMap[currentPage]).classList.add("red");
    }
});

let lastScrollTop = 0; // Keeps track of the last scroll position
const header = document.querySelector('#navbar'); // Select the header element

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});


var pos = document.documentElement;
var divElement = document.querySelector('.light');

// Get div dimensions
const divRect = divElement.getBoundingClientRect();

const findMeDiv = document.querySelector('.findme');
const originalBackground = divElement.style.background;

findMeDiv.addEventListener('mouseover', (e) => {
  divElement.style.background = `radial-gradient(circle at var(--x) var(--y), hsla(var(--h), 100%, 5%, 0) 0%, hsla(var(--h), 100%, 5%, 0.95) 5%, hsla(var(--h), 100%, 5%, 1) 15%)`;
});

findMeDiv.addEventListener('mouseout', (e) => {
  divElement.style.background = originalBackground;
});

pos.style.setProperty('--x', divRect.width/2 + 'px');
pos.style.setProperty('--y', divRect.height/2 + 'px');

divElement.style.setProperty('--h', 360);

pos.addEventListener('mousemove', e =>{
    pos.style.setProperty('--x', e.clientX + 'px')
    pos.style.setProperty('--y', e.clientY + 'px')

    // Get div dimensions
    const divRect = divElement.getBoundingClientRect();
      
      // Calculate color based on mouse position
    const hue = ((e.clientX / divRect.width) + (e.clientY / divRect.height)) * 180;

    divElement.style.setProperty('--h', hue);
})

const container = document.getElementById('container');
let isScrolling;

container.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        let sectionHeight = window.innerHeight;
        let scrollPosition = container.scrollTop;
        let sectionIndex = Math.round(scrollPosition / sectionHeight);
        container.scrollTo({
            top: sectionIndex * sectionHeight,
            behavior: 'smooth'
        });
    }, 50);
});

const detectHover = document.getElementById('detecthover');
const effectHover = document.getElementById('effecthover');

detectHover.addEventListener('mouseover', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFF903');
});

detectHover.addEventListener('mouseout', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFFFFF');
});


