"use strict";

(() => {
  // Função para carregar os itens do carrinho e exibi-los na página
  function loadCartItems() {
    const cartItemsContainer = document.getElementById("orcamento-container");
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");
    cartItemsContainer.innerHTML = "";

    if (Object.keys(quoteItems).length > 0) {
      Object.keys(quoteItems).forEach((key) => {
        const item = quoteItems[key];

        const itemElement = `
          <div class="orcamento_item-wrapper">
            <div class="orcamento_content-wrapper">
            <h3 class="heading-style-h5">${item.name}</h3>
            <button class="orcamento_remove" data-slug="${item.slug}">Remover</button>
            </div>
            <input type="number" value="${item.quantity}" min="1" class="orcamento_quantity-input" data-slug="${item.slug}">
          </div>
        `;
        cartItemsContainer.innerHTML += itemElement;
      });

      addCartEventListeners();
    } else {
      cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }
    console.log("Itens do carrinho carregados:", quoteItems);
  }

  // Função para adicionar os eventos de quantidade e remoção
  function addCartEventListeners() {
    const quantityInputs = document.querySelectorAll(
      ".orcamento_quantity-input"
    );
    quantityInputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        const slug = event.target.dataset.slug;
        const newQuantity = event.target.value;
        updateItemQuantity(slug, newQuantity);
      });
    });

    const removeButtons = document.querySelectorAll(".orcamento_remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const slug = event.target.dataset.slug;
        removeItemFromCart(slug);
      });
    });
  }

  // Função para atualizar a quantidade de um item no localStorage
  function updateItemQuantity(slug, quantity) {
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");

    if (quoteItems[slug]) {
      quoteItems[slug].quantity = parseInt(quantity);
      localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
      console.log(`Quantidade do item "${slug}" atualizada para ${quantity}`);
    }
  }

  // Função para remover um item do carrinho
  function removeItemFromCart(slug) {
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");

    if (quoteItems[slug]) {
      delete quoteItems[slug];
      localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
      loadCartItems();
      console.log(`Item "${slug}" removido do carrinho`);
    }
  }

  // Função para adicionar todos os itens do carrinho em um único campo de texto
  function addCartItemsToForm() {
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");
    const cartItemsHiddenFields = document.getElementById(
      "cart-items-hidden-fields"
    );
    cartItemsHiddenFields.innerHTML = ""; // Limpa o campo antes de adicionar

    // Cria a string formatada com os itens
    let cartSummary = "";

    if (Object.keys(quoteItems).length > 0) {
      Object.keys(quoteItems).forEach((key) => {
        const item = quoteItems[key];

        // Adiciona os detalhes do item na string formatada
        cartSummary += `Nome do Item: ${item.name}\nQuantidade: ${item.quantity}\n\n`;
      });

      // Cria um input hidden contendo todos os itens formatados
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "items-orcamento"; // Nome do input
      hiddenInput.value = cartSummary.trim(); // Remove espaços em branco extras

      // Adiciona o input ao formulário
      cartItemsHiddenFields.appendChild(hiddenInput);

      console.log(
        "Itens do carrinho adicionados ao formulário:\n",
        cartSummary
      );
    } else {
      console.warn("Nenhum item no carrinho para adicionar ao formulário.");
    }
  }

  // Função para capturar o envio do formulário
  function handleFormSubmit(event) {
    // Adiciona os itens do carrinho ao formulário
    addCartItemsToForm();

    // Permite o envio do formulário
    console.log("Formulário pronto para envio.");
  }

  // Inicializa a função ao carregar a página
  window.Webflow ||= [];
  window.Webflow.push(() => {
    loadCartItems(); // Carrega os itens do carrinho ao carregar a página

    // Captura o evento de envio do formulário
    const form = document.getElementById("quote-form");
    form.addEventListener("submit", handleFormSubmit);
  });
})();
