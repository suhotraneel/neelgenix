const detectHover = document.getElementById('detecthover');
const effectHover = document.getElementById('effecthover');

detectHover.addEventListener('mouseover', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFF903');
});

detectHover.addEventListener('mouseout', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFFFFF');
});