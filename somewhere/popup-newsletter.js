document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector(".popup_component");
  const closeBtn = document.querySelector(".popup_close-button");
  const overlay = document.querySelector(".popup_background-overlay");
  const emailInput = document.getElementById("email-popup");
  const phoneWrapper = document.getElementById("phone-wrapper");
  const phoneInput = document.getElementById("phone-input");

  // Verificação se já exibiu nas últimas 12 horas
  const popupShownKey = "popup_last_shown";
  const twelveHours = 12 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const lastShown = localStorage.getItem(popupShownKey);

  // Mostrar popup após 3s se não foi mostrado nas últimas 12h
  if (!lastShown || now - parseInt(lastShown, 10) > twelveHours) {
    setTimeout(() => {
      if (popup) {
        popup.style.display = "flex";
        requestAnimationFrame(() => {
          popup.classList.add("show");
        });
        localStorage.setItem(popupShownKey, now.toString());
      }
    }, 3000);
  }

  // Função para fechar o popup com animação
  function closePopup() {
    if (popup) {
      popup.classList.remove("show");
      popup.classList.add("hide");
      setTimeout(() => {
        popup.style.display = "none";
        popup.classList.remove("hide");
      }, 500);
    }
  }

  // Fechar por botão ou overlay
  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (overlay) overlay.addEventListener("click", closePopup);

  // Fechar com tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  // Fechar automaticamente 3s após envio bem-sucedido
  const form = popup.querySelector("form");
  if (form) {
    const observer = new MutationObserver(() => {
      const successMessage = form.querySelector(".w-form-done");
      if (successMessage && successMessage.offsetParent !== null) {
        setTimeout(() => {
          closePopup();
        }, 3000);
      }
    });
    observer.observe(form, { childList: true, subtree: true });
  }

  // Exibir phone-wrapper após 3+ caracteres no email
  if (emailInput && phoneWrapper) {
    let phoneShown = false;
    emailInput.addEventListener("input", function () {
      if (!phoneShown && emailInput.value.length >= 3) {
        phoneWrapper.style.display = "block";
        requestAnimationFrame(() => {
          phoneWrapper.classList.add("show");
        });
        phoneShown = true;
      }
    });
  }

  // Máscara de telefone americano
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let input = e.target.value.replace(/\D/g, "");
      if (input.length > 10) input = input.substring(0, 10);

      let formatted = input;
      if (input.length > 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(
          6
        )}`;
      } else if (input.length > 3) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
      } else if (input.length > 0) {
        formatted = `(${input}`;
      }

      phoneInput.value = formatted;
    });
  }
});
