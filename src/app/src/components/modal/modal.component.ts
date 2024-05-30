import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isVisible = false;
  @Input() playerWins = false;
  @Input() generateNewGame!: () => void;
  @Input() gameIsPaused: boolean = false;
  @Input() secretWord: string = '';

  constructor(private modalService: ModalService, private router: Router) {
    this.modalService.modalVisibility$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

  continueGame() {
    this.isVisible = false;
    setTimeout(() => {
      this.gameIsPaused = true;
    }, 1000);
  }

  close() {
    this.gameIsPaused = false;
    this.modalService.close();
  }

  callGenerateNewGame() {
    this.generateNewGame();
  }

  toCategoryComponent() {
    this.router.navigate(['/category']);
  }

  quitGame() {
    this.router.navigate(['/']);
  }
}
