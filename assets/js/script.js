let data = [];
let dolarObject = [];
let euroObject = [];
let getPesos = 0,
  getDolar = 0,
  getEuro = 0;

const pesosInput = document.getElementById("input-clp");
const convertBtn = document.getElementById("convert-currency-btn");
const conversion = document.getElementById("conversion");
const selectCurrency = document.getElementById("select-currency");

const convert = (monedaOriginal, convertirACurrency) => {
  const conversion = monedaOriginal / convertirACurrency;
  return conversion;
};

const getMiIndicador = async () => {
  const resp = await fetch("https://mindicador.cl/api/");
  const json = await resp.json();
  dolarObject = json.dolar;
  euroObject = json.euro;
};

const init = async () => {
  await getMiIndicador();
  convertBtn.addEventListener("click", () => {
    getPesos = pesosInput.value;
    getDolar = dolarObject.valor;
    getEuro = euroObject.valor;
    if (selectCurrency.value == "USD") {
      conversion.innerHTML = convert(getPesos, getDolar).toFixed(2);
    } else if (selectCurrency.value == "EUR") {
      conversion.innerHTML = convert(getPesos, getEuro).toFixed(2);
    }

    //conversion.innerHTML = convert(getPesos, getDolar);
  });
};

init();

//aqui viene el codigo funcional
