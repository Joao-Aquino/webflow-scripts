document.addEventListener("DOMContentLoaded", function () {
  // Mapeamento dos meses em inglês para português (abreviados)
  const monthsMapping = {
    Jan: "Janeiro",
    Feb: "Fevereiro",
    Mar: "Março",
    Apr: "Abril",
    May: "Maio",
    Jun: "Junho",
    Jul: "Julho",
    Aug: "Agosto",
    Sep: "Setembro",
    Oct: "Outubro",
    Nov: "Novembro",
    Dec: "Dezembro",
  };

  // Seleciona todos os elementos que contêm datas através do atributo data-date
  const dateElements = document.querySelectorAll("[data-date]");

  dateElements.forEach(function (element) {
    // Obtém o texto da data a partir do atributo data-date
    let dateText = element.getAttribute("data-date").trim();

    // Separa a data em partes
    let dateParts = dateText.split(" ");
    if (dateParts.length === 2) {
      let day = dateParts[0];
      let month = dateParts[1];

      // Converte o mês para português
      let monthInPortuguese = monthsMapping[month];

      if (monthInPortuguese) {
        // Formata a data para o padrão brasileiro com meses abreviados (sem ano)
        let formattedDate = `${day} de ${monthInPortuguese}`;
        // Atualiza o texto do elemento
        element.textContent = formattedDate;
      }
    }
  });
});
