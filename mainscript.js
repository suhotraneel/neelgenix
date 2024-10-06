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
    document.getElementById('header').innerHTML = data;

    // This ensures that the script inside the fetched content is executed
    const scripts = document.getElementById('header').getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const scriptTag = document.createElement('script');
        if (scripts[i].src) {
            // If the script has a src attribute, set the src
            scriptTag.src = scripts[i].src;
        } else {
            // Otherwise, add the inline script content
            scriptTag.text = scripts[i].text;
        }
        document.body.appendChild(scriptTag);
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


