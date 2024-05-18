const errorsType = [
  "valueMissing",
  "typeMismatch",
  "rangeOverflow",
  "toolong",
  "patternMismatch",
];

const errorsMessageES = {
  name: {
    valueMissing: "El nombre del producto es requerido",
    toolong: "La cantidad de caracteres excede el permitido (19)",
    patternMismatch: "Solo se permite ingresar letras y espacios",
  },
  price: {
    valueMissing: "El precio del producto es requerido",
    rangeOverflow: "EL precio máximo permitido es (9999)",
    toolong: "La cantidad de caracteres excede el permitido (5)",
    patternMismatch: "Ingrese un precio valido (Números)",
  },
  image: {
    valueMissing: "La URL de la imagen del producto es requerida",
    typeMismatch: "Ingrese un formato de URL correcto. EJ: http://...",
    toolong: "La cantidad de caracteres excede el permitido (400)",
  },
  description: {
    valueMissing: "La descripción del producto es requerida",
    toolong: "La cantidad de caracteres excede el permitido (500)",
  },
};

const errorsMessageEN = {
  name: {
    valueMissing: "Product name is required",
    toolong: "Character count exceeds the allowed limit (19)",
    patternMismatch: "Only letters and spaces are allowed",
  },
  price: {
    valueMissing: "Product price is required",
    rangeOverflow: "Maximum allowed price is (9999)",
    toolong: "Character count exceeds the allowed limit (5)",
    patternMismatch: "Enter a valid price (numbers)",
  },
  image: {
    valueMissing: "Product image URL is required",
    typeMismatch: "Enter a valid URL format. E.g., http://...",
    toolong: "Character count exceeds the allowed limit (400)",
  },
  description: {
    valueMissing: "Product description is required",
    toolong: "Character count exceeds the allowed limit (500)",
  },
};

const messages = {
  "en-US": errorsMessageEN,
  "es-ES": errorsMessageES,
};

const userLanguage = navigator.language || "en-US";

const errorsMessage = messages[userLanguage] || messages["en-US"];

export { errorsType, errorsMessage };
