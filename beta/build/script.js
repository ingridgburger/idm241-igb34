// HEART BUTTON FUNCTIONALITY
const heartButton = document.querySelector('.heart-button');

heartButton.addEventListener('click', (event) => {
    event.preventDefault();
    heartButton.classList.toggle('filled');
});

// COLOR SWATCH FUNCTIONALITY
const imageDefault = document.querySelector('.image-default');
const imageHover = document.querySelector('.image-hover');
const colorSwatches = document.querySelectorAll('.color-swatch');

colorSwatches.forEach(function(clickedSwatch) {
    clickedSwatch.onclick = function(event) {
        event.preventDefault();
        
        colorSwatches.forEach(function(swatch) {
            swatch.classList.remove('selected');
        });
        
        this.classList.add('selected');
        
        const colorNumber = this.getAttribute('data-color');
        
        if (colorNumber === '1') {
            imageDefault.src = '../images/color1-default.webp';
            imageHover.src = '../images/color1-hover.webp';
        } else if (colorNumber === '2') {
            imageDefault.src = '../images/color2-default.webp';
            imageHover.src = '../images/color2-hover.webp';
        }
    };
});