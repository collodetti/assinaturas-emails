let nome = document.getElementById("nome");
let cargo = document.getElementById("cargo");
let cel = document.getElementById("cel")
let pCel = document.getElementById("p-cel")
let tel = document.getElementById("tel");
let skype = document.getElementById("skype");
let email = document.getElementById("email");
let linkCel = document.getElementById("link-cel");
let linkTel = document.getElementById("link-tel");
let linkSkype = document.getElementById("link-skype");
let linkEmail = document.getElementById("link-email");


let pessoaString = localStorage.getItem('pessoa');
// transformar em objeto novamente
let pessoaObj = JSON.parse(pessoaString);
const departamento = pessoaObj.departamento.toUpperCase().trim();
const obs = pessoaObj.obs.trim();

nome.textContent = pessoaObj.nome.toUpperCase().trim();
cargo.textContent = pessoaObj.cargo.trim();
tel.textContent = "+55 " + pessoaObj.tel.trim();
linkTel.href = "tel:+55" + pessoaObj.tel.replace("-", "").replaceAll(" ", "");

if (departamento === 'CONTABILIDADE') {
  pCel.textContent = obs;
} else if (pessoaObj.cel === "") {
  pCel.style.display = 'none';
} else {
  cel.textContent = "+55 " + pessoaObj.cel.trim();
  linkCel.href = "tel:+55" + pessoaObj.cel.replace("-", "").replaceAll(" ", "");
}

if (pessoaObj.skype === "") {
  linkSkype.style.display = 'none';
} else {
  skype.textContent = pessoaObj.skype;
  linkSkype.href = `skype:live:${pessoaObj.skype}?chat`;
}

if (pessoaObj.email === "") {
  linkEmail.style.display = 'none';
} else {
  email.textContent = pessoaObj.email;
  linkEmail.href = `mailto:${pessoaObj.email}`;
}