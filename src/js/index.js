let input = document.querySelector('#arquivo');
let preview = document.querySelector('#preview');
let btnListar = document.querySelector('#listar');
let btnGerar = document.querySelector('#gerar');

//desabilita o botão no início
btnGerar.disabled = true;
//cria um event listener que escuta mudanças no input
input.addEventListener("input", function (event) {

  //busca conteúdo do input
  var conteudo = input.value;

  //valida conteudo do input 
  if (conteudo !== null && conteudo !== '') {
    //habilita o botão
    btnGerar.disabled = false;
  } else {
    //desabilita o botão se o conteúdo do input ficar em branco
    btnGerar.disabled = true;
  }
});

input.addEventListener('change', function () {
  const arquivo = this.files[0];
  console.log(arquivo);
  const leitor = new FileReader();

  leitor.addEventListener('load', function () {
    preview.value = leitor.result;
  });

  if (arquivo) {
    leitor.readAsText(arquivo);
  }
});


btnGerar.addEventListener('click', () => {
  linksGeneration(JSON.parse(preview.value));
});

btnListar.addEventListener('click', () => {
  play();
});

const linksGeneration = (pessoas) => {
  // // Pegarndo a div que irá conter todos os links.
  const div = document.createElement('div');
  div.innerHTML = '<h1>Lista de Links</h1>';

  // Iteramos sobre todos os links.
  for (let i = 0; i < pessoas.length; i++) {
    const pessoa = pessoas[i];

    // Criar o elemento da iteração atual
    // e incluí-lo na div que criamos acima.
    const code = document.createElement('code');
    code.innerHTML = `<a id="${i}" class="signature" href="e-mail-signature.html" target="_blank">${pessoa.nome}</a><br>`;

    div.appendChild(code);
  }

  // Substituir todo o conteúdo do body
  // pela lista de links.
  document.body.innerHTML = div.outerHTML;

  linksAddActions(pessoas);
}

const linksAddActions = (pessoas) => {
  // Receber a string
  let links = document.querySelectorAll(".signature");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      let pessoa = pessoas[link.id];
      // Transformar o objeto em string e salvar em localStorage
      localStorage.setItem('pessoa', JSON.stringify(pessoa));
    })
  });
};

// carrega o arquivo dados.json
const play = () => {
  fetch("./dados.json", { mode: "no-cors" }) // disable CORS because path does not contain http(s)
    .then((res) => res.json())
    .then((data) => linksGeneration(data));
}