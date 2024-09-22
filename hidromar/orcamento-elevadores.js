"use strict";

(() => {
  // Função para adicionar itens ao carrinho usando atributo `data-orcamento`
  function addClickEventListenerToAddToQuoteButtons() {
    // Seleciona todos os botões com o atributo `data-orcamento="orcamento"`
    const addToQuoteButtons = document.querySelectorAll(
      '[data-orcamento="orcamento"]'
    );

    // Recupera o estado atual do carrinho do localStorage
    const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");

    // Verifica se há botões na página
    if (addToQuoteButtons.length > 0) {
      addToQuoteButtons.forEach((button) => {
        const { slug } = button.dataset;

        // Se o item já estiver no carrinho, adicione a classe "is-added" e atualize o texto do botão
        if (quoteItems[slug]) {
          button.innerText = "Adicionado ao carrinho";
          button.disabled = true;
          button.classList.add("is-added");
          console.log(
            `Botão para o item "${slug}" já marcado como "Adicionado ao carrinho".`
          );
        }

        // Adiciona o ouvinte de clique para adicionar itens ao carrinho
        button.addEventListener("click", async function handleClick(event) {
          const target = event.target;

          // Verifica se o elemento contém os atributos de dados do produto
          if (target && target.dataset.slug) {
            const { slug, name, description } = target.dataset;

            console.log(`Tentando adicionar o item: ${name} ao carrinho`);

            // Verifica se o item já está no carrinho
            if (quoteItems[slug]) {
              console.log(
                `O item "${name}" já está no carrinho. Nenhuma ação realizada.`
              );
            } else {
              // Se o item não estiver no carrinho, adiciona com quantidade inicial de 1
              quoteItems[slug] = { slug, name, description, quantity: 1 };
              console.log(
                `O item "${name}" foi adicionado ao carrinho com a quantidade de 1`
              );

              // Atualiza o localStorage com os itens adicionados ou atualizados
              localStorage.setItem("quoteItems", JSON.stringify(quoteItems));

              // Mudar o texto do botão para "Adicionado ao carrinho"
              target.innerText = "Adicionado ao carrinho";

              // Desativar o botão para evitar mais cliques
              target.disabled = true;

              // Adicionar a classe "is-added" ao botão
              target.classList.add("is-added");

              // Atualiza o contador de itens no carrinho instantaneamente
              updateCartItemCount(); // Chama a função que atualiza o contador

              // Verifica se a classe foi adicionada corretamente
              console.log(
                `Classe 'is-added' adicionada ao botão: ${target.classList}`
              );
            }

            // Exibe o estado atual do carrinho no console
            console.log("Estado atual do carrinho após clique:", quoteItems);
          } else {
            console.error(
              "Botão não contém o dataset necessário para adicionar ao carrinho."
            );
          }
        });
      });
    } else {
      console.error(
        "Nenhum botão com o atributo 'data-orcamento' foi encontrado."
      );
    }
  }

  // Inicializa a função ao carregar a página
  window.Webflow ||= [];
  window.Webflow.push(() => {
    addClickEventListenerToAddToQuoteButtons(); // Adiciona o evento aos botões com o atributo `data-orcamento="orcamento"`
  });
})();
