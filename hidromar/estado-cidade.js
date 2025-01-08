document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM totalmente carregado");

  var estadosSelect = document.getElementById("estados");
  var municipiosSelect = document.getElementById("municipios");

  // Verificando se os elementos foram encontrados no DOM
  console.log("Elementos encontrados:", { estadosSelect, municipiosSelect });

  // Se os elementos não forem encontrados, sai do script
  if (!estadosSelect || !municipiosSelect) {
    console.error(
      "Erro: Elementos estados ou municípios não encontrados no DOM."
    );
    return;
  }

  // Lista de estados brasileiros com ID, sigla e nome
  const estadosBrasileiros = [
    { id: 12, sigla: "AC", nome: "Acre" },
    { id: 27, sigla: "AL", nome: "Alagoas" },
    { id: 16, sigla: "AP", nome: "Amapá" },
    { id: 13, sigla: "AM", nome: "Amazonas" },
    { id: 29, sigla: "BA", nome: "Bahia" },
    { id: 23, sigla: "CE", nome: "Ceará" },
    { id: 53, sigla: "DF", nome: "Distrito Federal" },
    { id: 32, sigla: "ES", nome: "Espírito Santo" },
    { id: 52, sigla: "GO", nome: "Goiás" },
    { id: 21, sigla: "MA", nome: "Maranhão" },
    { id: 51, sigla: "MT", nome: "Mato Grosso" },
    { id: 50, sigla: "MS", nome: "Mato Grosso do Sul" },
    { id: 31, sigla: "MG", nome: "Minas Gerais" },
    { id: 15, sigla: "PA", nome: "Pará" },
    { id: 25, sigla: "PB", nome: "Paraíba" },
    { id: 26, sigla: "PE", nome: "Pernambuco" },
    { id: 22, sigla: "PI", nome: "Piauí" },
    { id: 41, sigla: "PR", nome: "Paraná" },
    { id: 33, sigla: "RJ", nome: "Rio de Janeiro" },
    { id: 24, sigla: "RN", nome: "Rio Grande do Norte" },
    { id: 43, sigla: "RS", nome: "Rio Grande do Sul" },
    { id: 11, sigla: "RO", nome: "Rondônia" },
    { id: 14, sigla: "RR", nome: "Roraima" },
    { id: 42, sigla: "SC", nome: "Santa Catarina" },
    { id: 35, sigla: "SP", nome: "São Paulo" },
    { id: 28, sigla: "SE", nome: "Sergipe" },
    { id: 17, sigla: "TO", nome: "Tocantins" },
  ];

  // Preencher a lista suspensa de estados
  const estadosSelect = document.getElementById("estadosSelect");
  const municipiosSelect = document.getElementById("municipiosSelect");

  // Adicionar placeholder
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.text = "Selecione um estado";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  estadosSelect.appendChild(placeholderOption);

  estadosBrasileiros.forEach((estado) => {
    console.log("Adicionando estado:", estado);
    var option = document.createElement("option");
    option.value = estado.id;
    option.text = estado.sigla + " - " + estado.nome;
    estadosSelect.appendChild(option);
  });

  // Atualizar a lista suspensa de municípios com base no estado selecionado
  estadosSelect.addEventListener("change", function () {
    var estadoSelecionado = this.value;
    console.log("Estado selecionado:", estadoSelecionado);
    municipiosSelect.innerHTML = ""; // Limpar a lista suspensa de municípios

    if (!estadoSelecionado) {
      console.warn("Nenhum estado selecionado.");
      return;
    }

    // Carregar municípios a partir da API do IBGE com base no ID do estado selecionado
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta da API: " + response.status);
        }
        return response.json();
      })
      .then((municipios) => {
        console.log("Municípios carregados:", municipios);
        municipios.forEach((municipio) => {
          var municipioOption = document.createElement("option");
          municipioOption.value = municipio.nome;
          municipioOption.text = municipio.nome;
          municipiosSelect.appendChild(municipioOption);
        });
      })
      .catch((error) => console.error("Erro ao carregar municípios:", error));
  });
});
