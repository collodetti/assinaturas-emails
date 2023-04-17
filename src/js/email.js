let nome = document.getElementById("nome");
let cargo = document.getElementById("cargo");
let cel = document.getElementById("cel")
let pCel = document.getElementById("p-cel")
let tel = document.getElementById("tel");
let skype = document.getElementById("skype");
let linkSkype = document.getElementById("link-skype");
let email = document.getElementById("email");
let linkEmail = document.getElementById("link-email");


let pessoaString = localStorage.getItem('pessoa');
// transformar em objeto novamente
let pessoaObj = JSON.parse(pessoaString);
const departamento = pessoaObj.departamento.toUpperCase();
const obs = pessoaObj.obs;

nome.textContent = pessoaObj.nome.toUpperCase();
cargo.textContent = pessoaObj.cargo;
tel.textContent = "+55 " + pessoaObj.tel;

if (departamento === 'CONTABILIDADE') {
  pCel.textContent = obs;
} else if (pessoaObj.cel === "") {
  pCel.style.display = 'none';
} else {
  cel.textContent = "+55 " + pessoaObj.cel;
}

if (pessoaObj.skype === "") {
  linkSkype.style.display = 'none';
} else {
  skype.textContent = pessoaObj.skype;
  linkSkype.href = `skype:${pessoaObj.skype}?chat`;
}

if (pessoaObj.email === "") {
  linkEmail.style.display = 'none';
} else {
  email.textContent = pessoaObj.email;
  linkEmail.href = `mailto:${pessoaObj.email}`;
}