let data = [];
let dolarObject = [];
let euroObject = [];
let currencyObject = [];
let getPesos = 0,
  getDolar = 0,
  getEuro = 0;

const pesosInput = document.getElementById("input-clp");
const convertBtn = document.getElementById("convert-currency-btn");
const conversion = document.getElementById("conversion");
const selectCurrency = document.getElementById("select-currency");
const chartExt = document.querySelector("#chart");

const convert = (monedaOriginal, convertirACurrency) => {
  const conversion = monedaOriginal / convertirACurrency;
  return conversion;
};

const indicatorOnClick = () => {
  getPesos = pesosInput.value;
  getDolar = dolarObject.valor;
  getEuro = euroObject.valor;
  if (selectCurrency.value == "dolar") {
    conversion.innerHTML = `${getPesos} pesos son ${convert(getPesos, getDolar).toFixed(2)} dolares`;
  } else if (selectCurrency.value == "euro") {
    conversion.innerHTML = `${getPesos} pesos son ${convert(getPesos, getEuro).toFixed(2)} euros`;
  }

  //conversion.innerHTML = convert(getPesos, getDolar);
};

const getMiIndicador = async () => {
  const resp = await fetch("https://mindicador.cl/api/");
  const json = await resp.json();
  dolarObject = json.dolar;
  euroObject = json.euro;
};

const getHistoricCurrency = async (currency) => {
  const resp = await fetch(`https://mindicador.cl/api/${currency}`);
  const json = await resp.json();
  currencyObject = json;
  console.log("moneda es: " + currency);
};

//comienza el grafico
const lineChart = (series, categories) => {
  const options = {
    series: [
      {
        name: "Desktops",
        data: series,
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
    },
  };
  chartExt.innerHTML = "";

  const chart = new ApexCharts(chartExt, options);
  chart.render();
};

const init = async (tipoCambio) => {
  await getMiIndicador();
  await getHistoricCurrency(tipoCambio);
  indicatorOnClick();
  console.log(currencyObject);
  let fechaCurrency = [];
  let valorCurrency = [];
  for (let i = 0; i < 10; i++) {
    fechaCurrency.push(currencyObject.serie[i].fecha);
    valorCurrency.push(currencyObject.serie[i].valor);
  }
  console.log(fechaCurrency);
  console.log(valorCurrency);
  lineChart(valorCurrency, fechaCurrency);
  //for (object of currencyObject.serie) console.log(object.fecha);

  //  lineChart(valorCurrency, fechaCurrency);
};

let currencySelected = "";
convertBtn.addEventListener("click", () => {
  currencySelected = selectCurrency.value;
  init(currencySelected);
});

/* const options = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Product Trends by Month",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
}; */

//const chart = new ApexCharts(document.querySelector("#chart"), options);
//chart.render();
