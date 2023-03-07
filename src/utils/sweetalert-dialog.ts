import { SweetAlertOptions } from 'sweetalert2'
const normalButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--lapis-lazuli',
}
const dangerButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--danger',
}
export const success = (text: string): SweetAlertOptions => {
  return {
    icon: 'success',
    text: text,
    showConfirmButton: false,
    timer: 1500,
    heightAuto: false,
  }
}

export const error = (text: string): SweetAlertOptions => {
  return {
    icon: 'warning',
    text: text,
    showConfirmButton: false,
    timer: 1500,
    heightAuto: false,
  }
}

export const confirm = (
  text: string,
  confirmButtonText: string
): SweetAlertOptions => {
  return {
    title: 'Anda yakin ?',
    text: text,
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: confirmButtonText,
    customClass: normalButton,
    buttonsStyling: false,
    heightAuto: false,
  }
}
