let input = document.querySelector('#arquivo');
let preview = document.querySelector('#preview');
let btnDownload = document.querySelector('#download');
let btnGerar = document.querySelector('#gerar');
let lista = [];
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
  const leitor = new FileReader();

  leitor.addEventListener('load', function () {
    preview.value = leitor.result;
  });

  if (arquivo) {
    leitor.readAsText(arquivo);
  }
});


const download = function () {
  const a = document.createElement('a');
  a.style = 'display: none';
  document.body.appendChild(a);
  return function (conteudo, nomeArquivo) {
    const blob = new Blob([conteudo], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = nomeArquivo;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}

btnDownload.addEventListener('click', () => {
  download()(preview.value, 'jogosV2.json');
});

btnGerar.addEventListener('click', () => {
  lista = [];
  lista = JSON.parse(preview.value);
  gerarLinks();
});

const gerarLinks = () => {
  // // Pegarndo a div que irá conter todos os links.
  const div = document.createElement('div');
  div.innerHTML = '<h1>Lista de Links</h1>';

  // Iteramos sobre todos os links.
  for (let i = 0; i < lista.length; i++) {
    const obj = lista[i];

    // Criar o elemento da iteração atual
    // e incluí-lo na div que criamos acima.
    const code = document.createElement('code');
    code.innerHTML = `<a id="${i}" class="signature" href="e-mail-signature.html" target="_blank">${obj.nome}</a><br>`;

    div.appendChild(code);
  }

  // Substituir todo o conteúdo do body
  // pela lista de links.
  document.body.innerHTML = div.outerHTML;

  linksActions();
}

const linksActions = () => {
  // Receber a string
  let links = document.querySelectorAll(".signature");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      let pessoa = lista[link.id];
      // Transformar o objeto em string e salvar em localStorage
      localStorage.setItem('pessoa', JSON.stringify(pessoa));
    })
  });
};