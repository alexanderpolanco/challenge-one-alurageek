import { iconSvgTrash, iconSvgStart } from "./templates.js";

const imageLinkBroken = "./assets/img/broken-link.svg";

const backgroudColors = [
  "backgound-yellow",
  "backgound-pink",
  "backgound-blue",
];

function viewTransition(updateTheDOMSomehow) {
  if (!document.startViewTransition) {
    updateTheDOMSomehow();
    return;
  }

  document.startViewTransition(() => updateTheDOMSomehow());
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function removeProductCard(element) {
  element.classList.add("hidden");
  setTimeout(() => {
    element.remove();
  }, 1000);
}

function countStar(cantStar = 0, element) {
  const arrStar = [];
  const totalStar = 5;
  let count = 1;

  while (count <= totalStar) {
    element =
      count <= cantStar
        ? element
        : element.replaceAll("currentColor", "#B4B4B4");
    arrStar.push(element);
    count++;
  }

  return arrStar.join("");
}

function openModal(element) {
  const scrollTop = Math.round(window.scrollY);
  const $modal = document.createElement("div");

  $modal.classList.add("container-full-page");
  $modal.setAttribute("style", `top:${scrollTop}px;`);
  $modal.appendChild(element);

  const $body = document.querySelector("body");
  $body.classList.toggle("overflow-hidden");
  $body.appendChild($modal);
}

function closeModal() {
  const $body = document.querySelector("body");
  $body.classList.toggle("overflow-hidden");
  const $modal = document.querySelector(".container-full-page");
  $modal.style.viewTransitionName = "full-embed";

  const updateTheDOMSomehow = () => {
    $modal.remove();
  };

  viewTransition(updateTheDOMSomehow);
}

function createProductCardSingle(props, updateCalification) {
  const {
    productName,
    productDescription,
    productURL,
    backgroudColor,
    priceProduct,
    cantStar,
  } = props;

  const $article = document.createElement("article");
  $article.classList.add("product-card-single");

  const $img = document.createElement("img");
  $img.setAttribute("src", productURL); //Imagen del producto

  $img.onerror = () => {
    $img.setAttribute("src", imageLinkBroken);
  };

  const $productContent = document.createElement("div");
  $productContent.classList.add(backgroudColor);

  const $productName = document.createElement("h2");
  $productName.textContent = productName; //Nombre del producto

  const $productDescription = document.createElement("p");
  $productDescription.textContent = productDescription; //Descripcion del producto

  const $stars = document.createElement("div");
  $stars.classList.add("stars");
  $stars.classList.add("stars-hover");

  const totalStar = countStar(cantStar, iconSvgStart);
  $stars.innerHTML = totalStar;

  for (const [index, element] of $stars.childNodes.entries()) {
    element.addEventListener("click", () => {
      if (element.parentElement.classList.contains("stars-hover")) {
        setTimeout(() => {
          element.parentElement.classList.remove("stars-hover");
        }, 300);

        updateCalification(index + 1);
      }
    });
  }

  const $priceProduct = document.createElement("h3");
  $priceProduct.textContent = `$${priceProduct}`; //Precio del producto

  const $buttonDetalle = document.createElement("button");
  $buttonDetalle.classList.add("button-card");
  $buttonDetalle.textContent = "REGRESAR";

  $productContent.appendChild($productName);
  $productContent.appendChild($productDescription);
  $productContent.appendChild($stars);
  $productContent.appendChild($priceProduct);
  $productContent.appendChild($buttonDetalle);

  $article.appendChild($img);
  $article.appendChild($productContent);

  $buttonDetalle.addEventListener("click", () => {
    closeModal();
  });

  return $article;
}

function createProductCard(props, deleteCard, updateCalification) {
  const { productName, productURL, priceProduct, cantStar } = props;

  const $article = document.createElement("article");
  $article.classList.add("product-card");

  const $img = document.createElement("img");
  $img.classList.add("product-img");

  $img.setAttribute("src", productURL); //Imagen del producto

  $img.onerror = () => {
    $img.setAttribute("src", imageLinkBroken);
  };

  const $h4 = document.createElement("h4");
  $h4.classList.add("product-name");
  $h4.textContent = productName; //Nombre del producto

  const randomNum = getRandomInt(backgroudColors.length);
  const color = backgroudColors[randomNum];

  const $productContent = document.createElement("div");
  $productContent.classList.add("product-content");
  $productContent.classList.add(color); //Clase dinamina

  const $productPartialContent = document.createElement("div");
  $productPartialContent.classList.add("product-partial-content");

  const $h2 = document.createElement("h2");
  $h2.classList.add("product-price");
  $h2.textContent = `$${priceProduct}`; //Precio del producto

  const $div = document.createElement("div");
  $div.classList.add("product-spacer");

  const $svgTrash = document.createElement("div");
  $svgTrash.innerHTML = iconSvgTrash;

  const $stars = document.createElement("div");
  $stars.classList.add("stars");

  const totalStar = countStar(cantStar, iconSvgStart);
  $stars.innerHTML = totalStar;

  const $buttonDetalle = document.createElement("button");
  $buttonDetalle.classList.add("button-card");
  $buttonDetalle.textContent = "VER DETALLE";

  $productPartialContent.appendChild($h2);
  $productPartialContent.appendChild($div);
  $productPartialContent.appendChild($svgTrash);

  $productContent.appendChild($productPartialContent);
  $productContent.appendChild($stars);
  $productContent.appendChild($buttonDetalle);

  $article.appendChild($img);
  $article.appendChild($h4);
  $article.appendChild($productContent);

  $svgTrash.addEventListener("click", () => {
    deleteCard();
    removeProductCard($article);
  });

  const newProps = { ...props, backgroudColor: color };

  $buttonDetalle.addEventListener("click", () => {
    $article.style.viewTransitionName = "thumb-image";

    const updateTheDOMSomehow = () => {
      $article.style.viewTransitionName = "";
      openModal(createProductCardSingle(newProps, updateCalification));
    };

    viewTransition(updateTheDOMSomehow);
  });

  return $article;
}

export { createProductCard, createProductCardSingle };
