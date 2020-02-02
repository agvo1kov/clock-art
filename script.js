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
    if ((new Date()).getSeconds() == 0) {
        $regularSecondHand.forEach(hand => {
            hand.style.transform = `rotate(360deg)`;
        });
        setTimeout(() => {
            $regularSecondHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(0deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 1s`;
                hand.offsetHeight;
                hand.style.transform = `rotate(6deg)`;
            });
            secondsTimeout = setTimeout(() => { requestAnimationFrame(seconds) }, 1000);
        }, 1000);
    } else {
        if (windowWasBlurred) {
            $regularSecondHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(${sec-6}deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 1s`;
                hand.offsetHeight;
            });
        }
        $regularSecondHand.forEach(hand => {
            hand.style.transition = `all linear 1s`;
            hand.offsetHeight;
            hand.style.transform = `rotate(${sec}deg)`;
        });
        secondsTimeout = setTimeout(() => { requestAnimationFrame(seconds) }, 1000);
    }
}
function minutes(windowWasBlurred = false) {
    const min = (new Date()).getMinutes() / 60 * 360 + 6;
    if (((new Date()).getMinutes() == 0 && (new Date()).getSeconds() == 0)) {
        $regularMinuteHand.forEach(hand => {
            hand.style.transform = `rotate(360deg)`;
        });
        setTimeout(() => {
            $regularMinuteHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(0deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 60s`;
                hand.offsetHeight;
                hand.style.transform = `rotate(6deg)`;
            });
            minutesTimeout = setTimeout(() => { requestAnimationFrame(minutes) }, 60000);
        }, 60000);
    } else {
        if (windowWasBlurred) {
            $regularMinuteHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(${min-6}deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 60s`;
                hand.offsetHeight;
            });
        }
        $regularMinuteHand.forEach(hand => {
            hand.style.transform = `rotate(${min}deg)`;
        });
        minutesTimeout = setTimeout(() => { requestAnimationFrame(minutes) }, 60000);
    }
}
function hours(windowWasBlurred = false) {
    const hou = (new Date()).getHours() % 12 / 12 * 360 + ((new Date()).getMinutes() / 60 * 360 + (new Date()).getSeconds() / 60 * 6) / 12 + 30;
    if ((new Date()).getMinutes() == 0 && (new Date()).getSeconds() == 0) {
        $regularHourHand.forEach(hand => {
            hand.style.transform = `rotate(360deg)`;
        });
        setTimeout(() => {
            $regularHourHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(0deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 3600s`;
                hand.offsetHeight;
                hand.style.transform = `rotate(30deg)`;
            });
            hoursTimeout = setTimeout(() => { requestAnimationFrame(hours) }, 3600000);
        }, 3600000);
    } else {
        console.log("opa:", hou);
        if (windowWasBlurred) {
            $regularHourHand.forEach(hand => {
                hand.style.transition = `none`;
                hand.offsetHeight;
                hand.style.transform = `rotate(${hou-30}deg)`;
                hand.offsetHeight;
                hand.style.transition = `all linear 3600s`;
                hand.offsetHeight;
            });
        }
        $regularHourHand.forEach(hand => {
            hand.style.transform = `rotate(${hou}deg)`;
        });
        hoursTimeout = setTimeout(() => { requestAnimationFrame(hours) }, 3600000);
    }
}

$regularHourHand.forEach(hand => {
    hand.style.transition = `none`;
    hand.offsetHeight;
    hand.style.transform = `rotate(${hourDegs}deg)`;
    console.log(hourDegs);
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

let windowWasBlurred = false, oldSec = 0;
window.addEventListener('focus', () => {
    windowWasBlurred = true;
    const sec = (new Date()).getSeconds() / 60 * 360;
    if (windowWasBlurred) {
        windowWasBlurred = false;
        console.log('opaaa');

        clearTimeout(secondsTimeout);
        secondsTimeout = setTimeout(() => { requestAnimationFrame(() => { seconds(true) }) }, 1000);
        // $regularSecondHand.forEach(hand => {
        //     hand.style.transition = `none`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${sec-6}deg)`;
        //     hand.offsetHeight;
        //     hand.style.transition = `all linear 1s`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${sec}deg)`;
        //     secondsTimeout = setTimeout(() => { requestAnimationFrame(seconds) }, 1000);
        // });

        clearTimeout(minutesTimeout);
        const min = (new Date()).getMinutes() / 60 * 360 + 6;
        minutesTimeout = setTimeout(() => { requestAnimationFrame(() => { minutes(true) }) }, 60000);
        // $regularMinuteHand.forEach(hand => {
        //     hand.style.transition = `none`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${min-6}deg)`;
        //     hand.offsetHeight;
        //     hand.style.transition = `all linear 60s`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${min}deg)`;
        //     minutesTimeout = setTimeout(() => { requestAnimationFrame(minutes) }, 60000);
        // });

        clearTimeout(hoursTimeout);
        const hou = (new Date()).getHours() % 12 / 12 * 360 + ((new Date()).getMinutes() / 60 * 360 + (new Date()).getSeconds() / 60 * 6) / 12;
        hoursTimeout = setTimeout(() => { requestAnimationFrame(() => { hours(true) }) }, 3600000);
        // $regularHourHand.forEach(hand => {
        //     hand.style.transition = `none`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${hou-30}deg)`;
        //     hand.offsetHeight;
        //     hand.style.transition = `all linear 3600s`;
        //     hand.offsetHeight;
        //     hand.style.transform = `rotate(${hou}deg)`;
        // });
    }
});

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

const $superSeconds = document.getElementById('super-seconds');
for (let i = 0; i < 60; i++) {
    const $label = document.createElement('div');
    $label.classList.add('label');
    $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${60-i < 60 ? 60-i : 0}</div>`;
    $label.style.transform = `rotate(${i * 6 - 90}deg)`;
    $superSeconds.appendChild($label);
}

const $superMinutes = document.getElementById('super-minutes');
for (let i = 0; i < 60; i++) {
    const $label = document.createElement('div');
    $label.classList.add('label');
    $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${60-i < 60 ? 60-i : 0}</div>`;
    $label.style.transform = `rotate(${i * 6 - 90}deg)`;
    $superMinutes.appendChild($label);
}

const $superHours = document.getElementById('super-hours');
for (let i = 0; i < 12; i++) {
    const $label = document.createElement('div');
    $label.classList.add('label');
    $label.innerHTML = `<div style='transform: rotate(${90}deg)'>${12-i}</div>`;
    $label.style.transform = `rotate(${i * 30 - 90}deg)`;
    $superHours.appendChild($label);
}