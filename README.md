<!-- PROJECT LOGO -->
<br />
<div id="encabezado" align="center">
    <img src="./assets//img/logoalura.svg" alt="Logo" width="80" height="80">

  <h3 align="center">Alurageek</h3>

  <p align="center">
    Challenge ONE | Alurageek
    <br />
    <a href="https://alexanderpolanco.github.io/challenge-one-alurageek/" target="_blank"><strong>Ver demo »</strong></a>
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## Acerca del proyecto

[![Vista desktop][product-screenshot-desktop]](https://alexanderpolanco.github.io/challenge-one-alurageek/)

Este proyecto es una actividad recomendada de realizar por el programa G6 ONE. La idea es poner en práctica lo aprendido con este challenge.

### Requisitos para la construcción del proyecto

#### Se debe aplicar todo lo aprendido hasta el momento:

- HTML 5
- CSS 3
- FLEXBOX
- JAVASCRIPT

### Demo en móvil

<p align="center">
<a href="https://alexanderpolanco.github.io/challenge-one-alurageek/" target="_blank"><img width="200px" src="./assets/img/demo.gif"/></a>
</p>

### Desarrollo

La intención del challenge es aprender a usar los leguajes y recursos bases de la plataforma web tales como lo son:

[![JavaScript][JavaScript]][JavaScript-url]
[![HTML5][HTML5]][HTML5-url]
[![CSS3][CSS3]][CSS3-url]

En este proyecto se uso el <a href="https://developer.mozilla.org/es/docs/Web/API/Document/createElement" target="_blank">DOM<a/> para la creación de elementos de forma dinámica, en este sentido se creó el archivo <i>cards.js</i> en el cual se desarrollaron funciones las cuales crean los componentes.

En las transiciones se usó la <a href="https://developer.chrome.com/docs/web-platform/view-transitions?hl=es-419" target="_blank">API de View Transición</a>, se implementaron transiciones básicas siguiendo la documentación oficial.

```js
function viewTransition(updateTheDOMSomehow) {
  if (!document.startViewTransition) {
    updateTheDOMSomehow();
    return;
  }

  document.startViewTransition(() => updateTheDOMSomehow());
}
```

También se utilizó la programación orientada a objetos para crear una clase la cual permitiera validar los elementos de un formulario, en este caso se aprovechó la <a href="https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation" target="_blank">API</a> que provee el browser.

```js
const $inputs = new validateInputs($inputElements, errorsType, errorsMessage);
```

Para los mensajes de errores personalizados, se uso de una manera simple la <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">API de Internacionalización</a> para tener la oportunidad de que los mensajes puedan estar en más de un idioma, además de la capacidad de detectar automáticamente el idioma de la configuración del usuario para mostrar los mensajes en el idioma apropiado.

```js
const messages = {
  "en-US": errorsMessageEN,
  "es-ES": errorsMessageES,
};

const userLanguage = navigator.language || "en-US";

const errorsMessage = messages[userLanguage] || messages["en-US"];

export { errorsType, errorsMessage };
```

Por último se creo una API rudimentaria pero funcional, para manejar los datos del <a href="https://developer.mozilla.org/es/docs/Web/API/Window/localStorage" target="_blank">localStorage</a> simulando una base de datos NoSQL, para de esta manera manejar más fácil la información de los productos guardados.
A continuación algunos ejemplos de la propuesta para manejar los datos con la API mencionada:

```js
const bd = new localBD("aluraGeek");
```

```js
/**
 * EXAMPLE INSERT (IF NOT EXIST THE TABLE, IT IS CREATE )
 */

const newData = {
  nombre: "nombre3",
  apellido: "apellido3",
};

bd.execute("tabla").insert(newData);
```

```js
/**
 * EXAMPLE UPDATE DATA
 */

const filter = {
  nombre: "nombre2",
  apellido: "apellido2",
};

const newData = {
  nombre: "nombre3",
  apellido: "apellido3",
};

bd.execute("tabla").update(filter, newData);
```

```js
/**
 * EXAMPLE DELETE WITH FILTER
 */

const filter = {
  nombre: "nombre1",
  apellido: "apellido1",
};

bd.execute("tabla").delete(filter);
```

```js
/**
 * EXAMPLE TO FIND (RETURNS A PROMISE)
 */

//RETURN ALL DATA FROM TABLE
console.log(await bd.execute("tabla").find());

//RETURN FILTERED DATA

const filter = {
  nombre: "nombre2",
  apellido: "apellido2",
};

console.log(await bd.execute("tabla").find(filter));
```

<i>La primera vez que se ejecuta la aplicación, se agregan a la base de datos unos productos de ejemplo.</i>

<!-- LICENSE -->

## Licencia

Distribuido bajo licencia GPL. Ver `LICENSE.txt` para más información.

<p align="right">(<a href="#encabezado">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[JavaScript]: https://img.shields.io/badge/javascript-grey?logo=javascript
[JavaScript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[HTML5]: https://img.shields.io/badge/html5-blue?logo=html5
[HTML5-url]: https://developer.mozilla.org/es/docs/Glossary/HTML5
[CSS3]: https://img.shields.io/badge/css3-orange?logo=css3
[CSS3-url]: https://developer.mozilla.org/es/docs/Web/CSS
[product-screenshot-desktop]: ./assets/img/shots_so.webp
