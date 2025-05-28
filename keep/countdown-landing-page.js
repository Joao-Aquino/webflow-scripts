const cycleStart = moment.tz("2025-05-23", "America/Toronto").startOf("day");

function getNextDeadline() {
  const now = moment.tz("America/Toronto");
  const days = now.diff(cycleStart, "days");
  const offset = (3 - (days % 3)) % 3 || 3;
  return now.clone().startOf("day").add(offset, "days").valueOf();
}

let deadline = getNextDeadline();
setInterval(() => {
  const nowMs = Date.now();
  if (nowMs >= deadline) {
    deadline = getNextDeadline();
  }
  const diff = deadline - nowMs;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(d).padStart(2, "0");
  document.getElementById("hours").innerText = String(h).padStart(2, "0");
  document.getElementById("seconds").innerText = String(s).padStart(2, "0");
}, 1000);
