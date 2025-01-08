// Esconder items duplicados lista dropdown
document.addEventListener("DOMContentLoaded", function () {
  // Seletor para os itens da lista CMS
  const items = document.querySelectorAll(".filters-list_form-checkbox");
  const seen = new Set();

  items.forEach((item) => {
    const text = item.textContent.trim();
    if (seen.has(text)) {
      item.parentElement.style.display = "none"; // Esconde o item duplicado
    } else {
      seen.add(text);
    }
  });
});
