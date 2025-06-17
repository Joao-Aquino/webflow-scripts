(function () {
  const { DateTime } = luxon;

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const rawDateString =
    "{{wf {&quot;path&quot;:&quot;date-for-countdown&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}";

  const targetDate = DateTime.fromFormat(rawDateString, "MM/dd/yyyy hh:mm a", {
    zone: "America/New_York",
  });

  function updateCountdown() {
    const now = DateTime.now().setZone("America/New_York");
    const diff = targetDate
      .diff(now, ["days", "hours", "minutes", "seconds"])
      .toObject();

    if (diff.seconds < 0) {
      clearInterval(interval);
      document.getElementById("days").innerText = "0";
      document.getElementById("hours").innerText = "0";
      document.getElementById("minutes").innerText = "0";
      document.getElementById("seconds").innerText = "0";
      const messageEl = document.getElementById("message");
      if (messageEl) messageEl.style.display = "block";
      return;
    }

    document.getElementById("days").innerText = Math.floor(diff.days);
    document.getElementById("hours").innerText = Math.floor(diff.hours);
    document.getElementById("minutes").innerText = Math.floor(diff.minutes);
    document.getElementById("seconds").innerText = Math.floor(diff.seconds);
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
})();
