"use strict";

(() => {
  // Função para atualizar o contador de itens no carrinho
  function updateCartItemCount() {
    // Seleciona o elemento que mostra a quantidade de itens no carrinho pelo atributo `data-count="text"`
    const cartCountElement = document.querySelector('[data-count="text"]');

    // Recupera o estado atual do carrinho do localStorage
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");

    // Calcula a quantidade total de itens no carrinho
    const itemCount = Object.keys(quoteItems).length;

    // Atualiza o conteúdo do elemento com a quantidade de itens
    if (cartCountElement) {
      cartCountElement.innerText = itemCount;
    }

    // Exibe no console para depuração
    console.log(`Quantidade total de itens no carrinho: ${itemCount}`);
  }

  // Inicializa a função ao carregar a página
  window.Webflow ||= [];
  window.Webflow.push(() => {
    updateCartItemCount(); // Atualiza a contagem de itens no carrinho ao carregar a página
  });
})();
