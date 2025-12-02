var heartButton = document.querySelector('.heart-button');

if (heartButton) {
    heartButton.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        heartButton.classList.toggle('filled');
    };
}

var imageContainer = document.querySelector('.image-container');
var imageDefault = document.querySelector('.image-default');
var imageHover = document.querySelector('.image-hover');

var productCard = document.querySelector('.product-card');

var colorSwatches = document.querySelectorAll('.color-swatch');

var leftArrow = document.querySelector('.gallery-arrow.left');
var rightArrow = document.querySelector('.gallery-arrow.right');
var dots = document.querySelectorAll('.dot');

var galleryImages = {
    '1': [
        { defaultSrc: '../images/color1-default.webp',  hoverSrc: '../images/color1-second.webp' },
        { defaultSrc: '../images/color1-second.webp',   hoverSrc: '../images/color1-third.webp' },
        { defaultSrc: '../images/color1-third.webp',    hoverSrc: '../images/color1-fourth.webp' },
        { defaultSrc: '../images/color1-fourth.webp',   hoverSrc: '../images/color1-second.webp' }
    ],
    '2': [
        { defaultSrc: '../images/color2-default.webp',  hoverSrc: '../images/color2-second.webp' },
        { defaultSrc: '../images/color2-second.webp',   hoverSrc: '../images/color2-third.webp' },
        { defaultSrc: '../images/color2-third.webp',    hoverSrc: '../images/color2-fourth.webp' },
        { defaultSrc: '../images/color2-fourth.webp',   hoverSrc: '../images/color2-second.webp' }
    ]
};

var currentColor = '1';
var currentIndex = 0;
var cardIsHovered = false;

if (productCard) {
    productCard.onmouseenter = function () {
        cardIsHovered = true;
    };

    productCard.onmouseleave = function () {
        cardIsHovered = false;
    };
}

function updateArrowsAndDots(total) {
    if (!leftArrow || !rightArrow) {
        return;
    }

    if (total <= 1) {
        leftArrow.classList.add('hidden-arrow');
        rightArrow.classList.add('hidden-arrow');
    } else {
        leftArrow.classList.remove('hidden-arrow');
        rightArrow.classList.remove('hidden-arrow');

        if (currentIndex === 0) {
            leftArrow.classList.add('hidden-arrow');
        }

        if (currentIndex === total - 1) {
            rightArrow.classList.add('hidden-arrow');
        }
    }

    var i;
    for (i = 0; i < dots.length; i++) {
        if (i < total) {
            dots[i].style.display = 'inline-block';
            if (i === currentIndex) {
                dots[i].classList.add('active');
            } else {
                dots[i].classList.remove('active');
            }
        } else {
            dots[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
    }
}

function updateGalleryImage() {
    if (!imageDefault || !imageHover || !imageContainer) {
        return;
    }

    var imagesForColor = galleryImages[currentColor];
    if (!imagesForColor) {
        return;
    }

    var total = imagesForColor.length;

    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (currentIndex > total - 1) {
        currentIndex = total - 1;
    }

    var overlay = document.createElement('img');

    overlay.className = 'overlay-image';

    if (cardIsHovered) {
        if (imageHover.src) {
            overlay.src = imageHover.src;
        } else {
            overlay.src = imageDefault.src;
        }
        overlay.style.transform = 'scale(1.15)';
    } else {
        overlay.src = imageDefault.src;
        overlay.style.transform = 'scale(1)';
    }

    imageContainer.appendChild(overlay);

    var entry = imagesForColor[currentIndex];

    imageDefault.src = entry.defaultSrc;
    imageHover.src = entry.hoverSrc;

    if (cardIsHovered) {
        imageDefault.style.opacity = '0';
        imageHover.style.opacity = '1';
    } else {
        imageDefault.style.opacity = '1';
        imageHover.style.opacity = '0';
    }

    setTimeout(function () {
        overlay.style.opacity = '0';
    }, 20);

    setTimeout(function () {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 420);

    updateArrowsAndDots(total);
}

for (var i = 0; i < colorSwatches.length; i++) {
    colorSwatches[i].onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var swatch = this;

        swatch.classList.add('clicked');
        setTimeout(function () {
            swatch.classList.remove('clicked');
        }, 150);

        var j;
        for (j = 0; j < colorSwatches.length; j++) {
            colorSwatches[j].classList.remove('selected');
        }

        swatch.classList.add('selected');
        currentColor = swatch.getAttribute('data-color');
        currentIndex = 0;
        updateGalleryImage();
    };
}

if (leftArrow) {
    leftArrow.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        currentIndex = currentIndex - 1;
        updateGalleryImage();
    };
}

if (rightArrow) {
    rightArrow.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        currentIndex = currentIndex + 1;
        updateGalleryImage();
    };
}

updateGalleryImage();