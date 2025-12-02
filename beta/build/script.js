// HEART BUTTON FUNCTIONALITY

const heartButton = document.querySelector('.heart-button');

heartButton.onclick = function(e) {
    e.preventDefault();
    
    e.stopPropagation();

    this.classList.toggle('filled');
};


// COLOR SWATCH FUNCTIONALITY

const imageDefault = document.querySelector('.image-default');
const imageHover = document.querySelector('.image-hover');

const colorSwatches = document.querySelectorAll('.color-swatch');

colorSwatches.forEach(function(swatch) {
    swatch.onclick = function(e) {
        e.preventDefault();
        
        this.classList.add('switching');
        
        setTimeout(() => {
            this.classList.remove('switching');
        }, 400);
        
        colorSwatches.forEach(function(s) {
            s.classList.remove('selected');
        });
        
        this.classList.add('selected');
        
        const colorNumber = this.getAttribute('data-color');

        // Start fade out
        imageDefault.style.transition = 'opacity 0.3s ease';
        imageHover.style.transition = 'opacity 0.3s ease';
        imageDefault.style.opacity = '0';
        imageHover.style.opacity = '0';
        
        // Wait for fade-out before changing images
        setTimeout(function() {
            if (colorNumber === '1') {
                imageDefault.src = '../images/color1-default.webp';
                imageHover.src = '../images/color1-hover.webp';
            } else if (colorNumber === '2') {
                imageDefault.src = '../images/color2-default.webp';
                imageHover.src = '../images/color2-hover.webp';
            }
            
            // Fade in new default image
            imageDefault.style.opacity = '1';
            imageHover.style.opacity = '0';
        }, 300); // matches fade-out duration
    };
});
