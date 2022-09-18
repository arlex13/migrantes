import dayjs from "dayjs";
import useDateUtils from "./hooks/useDateUtils";
const { dateAsDayjs } = useDateUtils();

export function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

export function email(value) {
  // Let's not start a debate on email regex! This one is quite standard
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return "Dirección de correo electrónico no válida.";
  }

  return null;
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Debe tener al menos ${min} caracteres.`;
    }

    return null;
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `No debe tener más de ${max} caracteres.`;
    }

    return null;
  };
}

export function required(value) {
  if (isEmpty(value)) {
    return "Este campo es requerido.";
  }

  return null;
}
export function password(value) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  if (!isEmpty(value) && !regex.test(value)) {
    return "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial.";
  }
  return null;
}

export function date(value) {
  if (!isEmpty(value) && !dayjs(dateAsDayjs(value)).isValid()) {
    return "Fecha invalida.";
  }
  return null;
}

export function greaterThenToday(value) {
  if (
    !isEmpty(value) &&
    dateAsDayjs(value).startOf("day").isBefore(dayjs().startOf("day"))
  ) {
    return "No se pueden seleccionar una fecha anteriores a hoy.";
  }
  return null;
}

export const composeValidators =
  (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

export function alphanumeric(value) {
  const regularExpression = /^[a-z0-9]+$/i;
  if (!isEmpty(value) && !regularExpression.test(value)) {
    return "Este campo solo debe contener números y letras";
  }
  return null;
}
