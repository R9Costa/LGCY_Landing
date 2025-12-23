// Set launch date: Jan 1, 2026
const countdownDate = new Date("Jan 1, 2026 00:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const format = (num) => num < 10 ? "0" + num : num;

    document.getElementById("countdown").innerHTML = 
        format(days) + "d : " + format(hours) + "h : " + format(minutes) + "m : " + format(seconds) + "s";

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "WELCOME TO THE LEGACY";
    }
}, 1000);
