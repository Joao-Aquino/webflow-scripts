const deadline = moment.tz("2025-05-23 23:59:59", "America/Toronto").valueOf();

const timerInterval = setInterval(() => {
  const now = Date.now();
  const diff = deadline - now;
  if (diff <= 0) {
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0"
  );
}, 1000);
