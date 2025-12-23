// Define a data de lançamento: 1 de Janeiro de 2026
const countdownDate = new Date("Jan 1, 2026 00:00:00").getTime();

// Atualiza o contador a cada 1 segundo
const timer = setInterval(function() {

    // Obtém a data e hora atual
    const now = new Date().getTime();

    // Calcula a distância entre agora e a data de lançamento
    const distance = countdownDate - now;

    // Cálculos de tempo para dias, horas, minutos e segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formata os números para terem sempre dois dígitos (ex: 05 em vez de 5)
    const format = (num) => num < 10 ? "0" + num : num;

    // Mostra o resultado no elemento com id="countdown"
    document.getElementById("countdown").innerHTML = 
        format(days) + "d : " + format(hours) + "h : " + format(minutes) + "m : " + format(seconds) + "s";

    // Se a contagem terminar, mostra uma mensagem
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "WELCOME TO THE LEGACY";
    }
}, 1000);
