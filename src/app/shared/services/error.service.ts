import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  msgError(event: HttpErrorResponse) {
    if (event.error.message != null) {
      // mostrar mensaje de errores programados
      Swal.fire({
        icon: 'error',
        text: event.error.message,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500,
      });
    } else {
      // mostrar mensaje de errores desconocidos del backend
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong.',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500,
      });
    }
  }
}
