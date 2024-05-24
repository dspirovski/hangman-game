import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() playerWins!: string;
  @Input() score!: number;
  @Input() secretWord!: string;
  @Input() newGame!: any;
  @ViewChild(MainComponent) mainComponent: MainComponent | undefined;
  @ViewChild(MainComponent) showDialog: MainComponent | undefined;
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  constructor(private router: Router) {}

  ngOnInit() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  startNewGame() {
    this.mainComponent?.generateNewGame();
  }
  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  quitGame() {
    this.router.navigate(['/']);
  }
}
