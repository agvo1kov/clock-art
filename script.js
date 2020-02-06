const $regularHourHand = document.querySelectorAll(".regular-hand-hour"),
    $regularMinuteHand = document.querySelectorAll(".regular-hand-minute"),
    $regularSecondHand = document.querySelectorAll(".regular-hand-second"),
    $calendarMonthHand = document.getElementById("calendar-month-hand"),
    $calendarDayHand = document.getElementById("calendar-day-hand"),
    $calendarShadowMonthHand = document.getElementById("month-shadow"),
    $calendarShadowDayHand = document.getElementById("day-shadow");

const today = new Date();
let secondDegs = today.getSeconds() / 60 * 360;
let minuteDegs = today.getMinutes() / 60 * 360 + today.getSeconds() / 60 * 6;
let hourDegs = today.getHours() % 12 / 12 * 360 + minuteDegs / 12;
let dayDegs = (today.getDay() == 0 ? 6 : today.getDay() - 1) / 7 * 360 + today.getHours() / 24 * 360 / 7;
let monthDegs = today.getMonth() / 12 * 360 + today.getDate() / 30 * 360 / 12;

let secondsTimeout, minutesTimeout, hoursTimeout;

function seconds(windowWasBlurred = false) {
    const sec = (new Date()).getSeconds() / 60 * 360;
    $regularSecondHand.forEach(hand => {
        hand.style.transition = `none`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${sec}deg)`;
        hand.offsetHeight;
        hand.style.transition = `all linear 60000s`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${sec+360000}deg)`;
    });
    secondsTimeout = setTimeout(() => { requestAnimationFrame(seconds) }, 60000000);
}
function minutes(windowWasBlurred = false) {
    const min = (new Date()).getMinutes() / 60 * 360;
    $regularMinuteHand.forEach(hand => {
        hand.style.transition = `none`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${min}deg)`;
        hand.offsetHeight;
        hand.style.transition = `all linear 36000s`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${min+3600}deg)`;
    });
    minutesTimeout = setTimeout(() => { requestAnimationFrame(minutes) }, 36000000);
}
function hours(windowWasBlurred = false) {
    const hou = (new Date()).getHours() % 12 / 12 * 360 + ((new Date()).getMinutes() / 60 * 360 + (new Date()).getSeconds() / 60 * 6) / 12;
    $regularHourHand.forEach(hand => {
        hand.style.transition = `none`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${hou}deg)`;
        hand.offsetHeight;
        hand.style.transition = `all linear 43200s`;
        hand.offsetHeight;
        hand.style.transform = `rotate(${hou+360}deg)`;
    });
    hoursTimeout = setTimeout(() => { requestAnimationFrame(hours) }, 43200000);
}

$regularHourHand.forEach(hand => {
    hand.style.transition = `none`;
    hand.offsetHeight;
    hand.style.transform = `rotate(${hourDegs}deg)`;
    hand.offsetHeight;
    hand.style.transition = `all linear 3600s`;
    hand.offsetHeight;
    requestAnimationFrame(hours);
});

$regularMinuteHand.forEach(hand => {
    hand.style.transition = `none`;
    hand.offsetHeight;
    hand.style.transform = `rotate(${minuteDegs}deg)`;
    hand.offsetHeight;
    hand.style.transition = `all linear 60s`;
    hand.offsetHeight;
    requestAnimationFrame(minutes);
});

$regularSecondHand.forEach(hand => {
    hand.style.transition = `none`;
    hand.offsetHeight;
    hand.style.transform = `rotate(${secondDegs}deg)`;
    hand.offsetHeight;
    hand.style.transition = `all linear 1s`;
    hand.offsetHeight;
    requestAnimationFrame(seconds);
});
$calendarMonthHand.style.transform = `rotate(${dayDegs}deg)`;
$calendarShadowMonthHand.style.transform = `rotate(${dayDegs}deg)`;
$calendarDayHand.style.transform = `rotate(${monthDegs}deg)`;
$calendarShadowDayHand.style.transform = `rotate(${monthDegs}deg)`;

// requestAnimationFrame(function months() {
//     $calendarMonthHand.style.transform = `rotate(${monthDegs}deg)`;
//     $calendarShadowMonthHand.style.transform = `rotate(${monthDegs}deg)`;
//     monthDegs = (monthDegs + 0.2) % 360;
//     setTimeout(() => { requestAnimationFrame(months) }, 1440000);
// });

// requestAnimationFrame(function week() {
//     $calendarDayHand.style.transform = `rotate(${dayDegs}deg)`;
//     $calendarShadowDayHand.style.transform = `rotate(${dayDegs}deg)`;
//     dayDegs = (dayDegs + 0.2) % 360;
//     setTimeout(() => { requestAnimationFrame(week) }, 336000);
// });

const $circles = document.getElementById('circles');
let smallCirclesArray = [];
for (let i = 0; i < 35; i++) {
    const $newCircle = document.createElement('div');
    $newCircle.classList.add('circle');

    let circleRandom = Math.pow(Math.random(), 5);
    let circleSize = circleRandom * 50 + 10;
    let circleLeft = circleRandom * window.innerWidth / 4 - circleSize / 2;
    let circleTop = Math.pow(Math.random(), 5) * 400 - circleSize / 2;
    
    const checkForIntersection = () => {
        let wrongRandom = false;
        smallCirclesArray.forEach(circle => {
            if (Math.sqrt(Math.pow(circleLeft - circle.left, 2) + Math.pow(circleTop - circle.top, 2)) < (circleSize + circle.size) / 2 + 5) {
                wrongRandom = true;
            }
        });
        return wrongRandom;
    }

    let i = 0;
    while (checkForIntersection() && i < 5) {
        circleRandom = Math.pow(Math.random(), 4);
        circleSize = circleRandom * 50 + 10;
        circleLeft = circleRandom * window.innerWidth / 4 - circleSize / 2;
        circleTop = Math.random() * 400 - circleSize / 2;
        i++;
    }

    $newCircle.style.width = `${circleSize}px`;
    $newCircle.style.height = `${circleSize}px`;

    $newCircle.style.left = `${circleLeft}px`;
    $newCircle.style.top = `${circleTop}px`;
    smallCirclesArray.push({
        left: circleLeft,
        top: circleTop,
        size: circleSize
    });

    $circles.appendChild($newCircle);
}

let bigCirclesArray = [];
const $sloganBlur = document.getElementById('slogan-blur');
const $logoBlur = document.getElementById('logo-blur');
for (let i = 0; i < 4; i++) {
    const $newCircle = document.createElement('div');
    $newCircle.classList.add('circle');

    let circleRandom = Math.pow(Math.random(), 1);
    let circleSize = 250 - circleRandom * 50;
    // let circleSize = circleRandom * 10 + 10;
    let circleRight = Math.pow(circleRandom, 2) * window.innerWidth / 3 * 1.3 - circleSize / 2;
    let circleTop = Math.pow(Math.random(), 1) * 150 - circleSize / 2;

    const checkForIntersection = () => {
        let wrongRandom = false;
        bigCirclesArray.forEach(circle => {
            // console.log(Math.sqrt(Math.pow(circleRight - circle.right, 2) + Math.pow(circleTop - circle.top, 2)));
            if (Math.sqrt(Math.pow(circleRight - circle.right, 2) + Math.pow(circleTop - circle.top, 2)) < (circleSize + circle.size) / 2 + 50) {
                wrongRandom = true;
                // console.log("YES");
            }
        });
        return wrongRandom;
    }

    let i = 0;
    while (checkForIntersection() && i < 5) {
        circleRandom = Math.pow(Math.random(), 1);
        circleSize = 250 - circleRandom * 50;
        circleRight = Math.pow(circleRandom, 2) * window.innerWidth / 3 * 1.3 - circleSize / 2;
        circleTop = Math.pow(Math.random(), 1) * 150 - circleSize / 2;
        i++;
    }

    if (!checkForIntersection()) {
        $newCircle.style.width = `${circleSize}px`;
        $newCircle.style.height = `${circleSize}px`;

        $newCircle.style.right = `${circleRight}px`;
        $newCircle.style.top = `${circleTop}px`;

        bigCirclesArray.push({
            right: circleRight,
            top: circleTop,
            size: circleSize
        });

        $circles.appendChild($newCircle);

        function offset(el) {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        const $newCircleForSloganBlur = document.createElement('div');
        $newCircleForSloganBlur.classList.add('circle');
        $newCircleForSloganBlur.style.width = `${circleSize}px`;
        $newCircleForSloganBlur.style.height = `${circleSize}px`;

        let newRight = circleRight - (window.innerWidth - ($sloganBlur.offsetLeft + $sloganBlur.offsetWidth));
        $newCircleForSloganBlur.style.right = `${newRight}px`;
        $newCircleForSloganBlur.style.top = `${circleTop - offset($sloganBlur).top}px`;

        $sloganBlur.appendChild($newCircleForSloganBlur);

        const $newCircleForLogoBlur = document.createElement('div');
        $newCircleForLogoBlur.classList.add('circle');
        $newCircleForLogoBlur.style.width = `${circleSize}px`;
        $newCircleForLogoBlur.style.height = `${circleSize}px`;

        newRight = circleRight - (window.innerWidth - ($logoBlur.offsetLeft + $logoBlur.offsetWidth));
        $newCircleForLogoBlur.style.right = `${newRight}px`;
        $newCircleForLogoBlur.style.top = `${circleTop - offset($logoBlur).top}px`;

        $logoBlur.appendChild($newCircleForLogoBlur);
    }
}

const editBtn = document.getElementById('edit-btn'),
    digitInputs = document.querySelectorAll('.digit-input');

editBtn.addEventListener('click', () => {
    digitInputs.forEach((item) => {
        item.classList.add('editable');
        setTimeout(() => {
            item.classList.remove('editable');
        }, 1000);
    });
});

// const $superSeconds = document.getElementById('super-seconds');
// for (let i = 0; i < 60; i++) {
//     const $label = document.createElement('div');
//     $label.classList.add('label');
//     $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${60-i < 60 ? 60-i : 0}</div>`;
//     $label.style.transform = `rotate(${i * 6 - 90}deg)`;
//     $superSeconds.appendChild($label);
// }

// const $superMinutes = document.getElementById('super-minutes');
// for (let i = 0; i < 60; i++) {
//     const $label = document.createElement('div');
//     $label.classList.add('label');
//     $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${60-i < 60 ? 60-i : 0}</div>`;
//     $label.style.transform = `rotate(${i * 6 - 90}deg)`;
//     $superMinutes.appendChild($label);
// }

// const $superHours = document.getElementById('super-hours');
// for (let i = 0; i < 12; i++) {
//     const $label = document.createElement('div');
//     $label.classList.add('label');
//     $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${12-i}</div>`;
//     $label.style.transform = `rotate(${i * 30 - 90}deg)`;
//     $superHours.appendChild($label);
// }

const $clockWrapper = document.getElementById('clock-wrapper');
const $section1 = document.getElementById('section-1');
const $section2 = document.getElementById('section-2');
const $section3 = document.getElementById('section-3');
const sections = [$section1, $section2, $section3];
// $clockWrapper.scrollLeft = window.innerWidth * 0.175 + 475 - window.innerWidth / 2;
// $clockWrapper.scrollLeft = window.innerWidth * 0.175 ;// - window.innerWidth / 2;
let i = 1;
$clockWrapper.scrollLeft = sections[i].offsetLeft - (window.innerWidth - sections[i].offsetWidth) / 2;
const xs = [];
for (i = 0; i < sections.length; i++) {
    xs.push(sections[i].offsetLeft - (window.innerWidth - sections[i].offsetWidth) / 2)
}

const closest = (array, goal) => {
    return array.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
};


// document.addEventListener('touchend', () => {
//     // $clockWrapper.scrollLeft = closest(xs, $clockWrapper.scrollLeft);
//     $clockWrapper.scroll({
//         top: 0,
//         left: closest(xs, $clockWrapper.scrollLeft),
//         behavior: 'smooth'
//     });
// });

const $buyPopup = document.getElementById('buy-popup');
const $okButton = document.getElementById('ok');
const $buyButtons = document.querySelectorAll('.buy');
$buyButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const model = this.getAttribute('data-model');

        var xhr = new XMLHttpRequest();
        if (model == '1') {
            xhr.open('GET', 'https://csscolor.ru/clock-art/variant1.php', false);
        }
        if (model == '2') {
            xhr.open('GET', 'https://csscolor.ru/clock-art/variant2.php', false);
        }
        if (model == '3') {
            xhr.open('GET', 'https://csscolor.ru/clock-art/variant3.php', false);
        }
        xhr.send();

        $buyPopup.classList.remove('hide');
    });
});

const $contact = document.getElementById('contact');
$okButton.addEventListener('click', function() {
    const contactText = $contact.innerText;
    const model = this.getAttribute('data-model');
    let url = new URL('https://csscolor.ru/clock-art/constants.php');
    url.searchParams.set('variant', model);
    url.searchParams.set('text', contactText);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    $buyPopup.classList.add('hide');
});

let isMobile = false;

const $photoviewer = document.getElementById('photoviewer');
$photoviewer.addEventListener('click', () => {
    $photoviewer.style.display = 'none';
});

const $photos = document.querySelectorAll('.photogallery > .photo');
const $image = document.getElementById('image');
$photos.forEach(($photo) => {
    $photo.addEventListener('click', function() {
        if (isMobile) {
            $image.setAttribute('src', this.getAttribute('src').replace('/min', ''));
            $photoviewer.style.display = 'flex';
        }
    });
});


function myFunction(x) {
    if (x.matches) { // If media query matches
        isMobile = false;
    } else {
        isMobile = true;
    }
  }
  
  var x = window.matchMedia("only screen and (max-device-width: 1125px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes