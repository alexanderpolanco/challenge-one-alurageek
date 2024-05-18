import { createProductCard } from "./cards.js";
import { errorsType, errorsMessage } from "./errorsTypes.js";
import { validateInputs } from "./validateInputs.js";
import { rateProduct } from "./utilities.js";
import { localBD } from "./localBD.js";
import data from "../products-example.js";

const $containerProducts = document.querySelector(".container-products");

const $inputElements = document.querySelectorAll("[required]");

const $form = document.querySelector("form");

const $buttonSubmit = document.querySelector("#my-form-button-submit");

const $buttonReset = document.querySelector("#my-form-button-reset");

const $inputs = new validateInputs($inputElements, errorsType, errorsMessage);

const bd = new localBD("aluraGeek");

async function renderAll() {
  const products = await bd.execute("products").find();

  $containerProducts.innerHTML = "";
  products.forEach((product) => {
    appendProduct(product);
  });
}

function appendProduct(product) {
  const props = {
    productName: product.name,
    productDescription: product.description,
    productURL: product.image,
    priceProduct: product.price,
    cantStar: product.cantStar,
  };

  const filter = {
    _ID: product._ID,
  };

  const deleteProduct = () => {
    bd.execute("products").delete(filter);
  };

  const updateCalification = async (index) => {
    const product = await bd.execute("products").find(filter);

    product[0].votes[index]++;
    product[0].cantStar = rateProduct(product[0].votes);

    bd.execute("products").update(filter, product[0]);
    renderAll();
  };

  const productCard = createProductCard(
    props,
    deleteProduct,
    updateCalification
  );

  $containerProducts.appendChild(productCard);
}

$buttonSubmit.addEventListener("click", () => {
  $inputs.checkStatus();
});

$buttonReset.addEventListener("click", () => {
  $inputs.reset();
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  if ($inputs.checkStatus()) {
    let dataForm = {};

    $inputElements.forEach((element) => {
      const newElement = { [element.name]: element.value };
      dataForm = { ...dataForm, ...newElement };
    });

    const votes = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    dataForm = { votes, cantStar: 0, ...dataForm };

    const _ID = bd.execute("products").insert(dataForm);
    appendProduct({ _ID, ...dataForm });
    $form.reset();
  }
});

/**
 * SOLO SE EJECUTA LA PRIMERA VEZ PARA CARGAR LOS DATOS DE EJEMPLOS
 */
if (bd.getLastID === 0) {
  bd.importData(data);
}

renderAll();

/**
 * EXPLICAR EL PROTYECTO Y LAS API CREADAS EN EL MD
 * AGREGAR LINK DEL REPOSITORIO DE GITHUB
 * PUBLICAR EN LA COMUNIDAD Y PEDIR ESTRELLAS EN GITHUB
 */
