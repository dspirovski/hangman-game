import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalVisibilitySubject = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibilitySubject.asObservable();

  open() {
    this.modalVisibilitySubject.next(true);
  }

  close() {
    this.modalVisibilitySubject.next(false);
  }
}
