function initNavbarFlicker() {
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

    navContainer.addEventListener('mouseenter', () => {
        flickerEffect(navDesA, 'assets/navleft.svg', 'assets/navlefth.svg', 3, 100);
        flickerEffect(navDesB, 'assets/navright.svg', 'assets/navrighth.svg', 3, 100);
    });

    navContainer.addEventListener('mouseleave', () => {
        flickerEffect(navDesA, 'assets/navlefth.svg', 'assets/navleft.svg', 2, 100);
        flickerEffect(navDesB, 'assets/navrighth.svg', 'assets/navright.svg', 2, 100);
    });
}



function initDrawer() {

    const burger = document.getElementById("burger");
    const drawer = document.getElementById("drawer");

    if (!burger) {
        console.error("BURGER NOT FOUND");
        return;
    }
    if (!drawer) {
        console.error("DRAWER NOT FOUND");
        return;
    }

    burger.addEventListener("click", () => {
        drawer.classList.toggle("open");
    });

    document.querySelectorAll(".drawer-item").forEach(item => {
        item.addEventListener("click", () => {
            drawer.classList.remove("open");
        });
    });

}