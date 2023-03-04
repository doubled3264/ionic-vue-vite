import { SweetAlertOptions } from 'sweetalert2'
const normalButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--verdigris',
}
const dangerButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--danger',
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
