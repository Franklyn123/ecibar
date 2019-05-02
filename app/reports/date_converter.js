export function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export function calcularEdad(inputFormat) {
  var hoy = new Date();
  const cumpleanos = new Date(inputFormat);

  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}

export function getMes(inputFormat) {
  const d = new Date(inputFormat);
  return d.getMonth() + 1;
}

export function getDia(inputFormat) {
  const d = new Date(inputFormat);
  return d.getDate();
}
