const detectHover = document.getElementById('detecthover');
const effectHover = document.getElementById('effecthover');

detectHover.addEventListener('mouseover', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFF903');
});

detectHover.addEventListener('mouseout', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFFFFF');
});


const divElement = document.querySelector('.foot1');

    divElement.addEventListener('mousemove', function(event) {
      // Get div dimensions
      const divRect = divElement.getBoundingClientRect();
      
      // Calculate color based on mouse position
      const hue = (event.clientX / divRect.width) * 360;

      // Update background color
      divElement.style.backgroundColor = `hsl(${hue}, 100%, 5%)`;
    });
