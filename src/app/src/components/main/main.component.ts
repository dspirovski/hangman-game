import { ModalService } from './../../services/modal.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as data from '../../../../data.json';
import { ModalComponent } from '../modal/modal.component';

interface Letter {
  letter: string;
  visible: boolean;
}

interface SecretWordCharacter {
  key: string;
  visible: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  data: any = data;
  secretWord: string = '';
  secretWordArray: SecretWordCharacter[] = [];
  progress = 0;
  score = 10;
  playerWins: boolean | null = null;
  playerLoose: boolean | null = null;
  choosenCategory: string | null = '';
  heartBeating = 8;
  gameIsPaused = false;
  letters: Letter[] = [];

  constructor(private router: Router, private modal: ModalService) {}

  ngOnInit() {
    this.choosenCategory = localStorage.getItem('choosenCategory');
    this.data = data;
    this.playerWins = null;

    this.generateNewGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const inputChar = event.key.toLowerCase();
    if (inputChar.length === 1 && /^[a-zA-Z]$/.test(inputChar)) {
      console.log(`Key pressed: ${inputChar}`);
      this.choosenLetter(inputChar);
    }
  }

  private setLetters(): void {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.letters = alphabet
      .split('')
      .map((letter) => ({ letter, visible: true }));
  }
  openModal(): void {
    this.gameIsPaused = true;
    this.modal.open();
  }

  //generates new game
  generateNewGame = () => {
    this.setLetters();
    this.modal.close();
    this.playerWins = null;
    this.playerLoose = null;
    this.gameIsPaused = false;
    this.score = 10;
    this.heartBeating = 8;
    this.letters = this.letters;
    const choosenCategory: any = localStorage.getItem('choosenCategory');
    const countItems = this.data[choosenCategory].length;
    const randomNumber = Math.floor(Math.random() * countItems);
    this.progress = 0;
    //choose random word
    if (
      this.data &&
      this.data[choosenCategory] &&
      this.data[choosenCategory][randomNumber]
    ) {
      this.secretWord = this.data[choosenCategory][randomNumber].toUpperCase();
    }
    const characters = this.secretWord.split('');
    if (this.secretWordArray.length > 1) {
      this.secretWordArray = [];
    }

    for (let i = 0; i < characters.length; i++) {
      if (characters[i] === ' ') {
        debugger;
        this.secretWordArray.push({
          key: characters[i],
          visible: true,
          hidden: true,
        });
      } else {
        this.secretWordArray.push({ key: characters[i], visible: false });
      }
    }
  };

  exitGame(): void {
    localStorage.removeItem('choosenCategory');
    this.router.navigate(['']);
  }

  choosenLetter(letter: any): void {
    debugger;
    const matchedLetters = this.secretWord
      .toLowerCase()
      .includes(letter.letter);

    if (!matchedLetters) {
      this.progress++;
      this.updateScore();
    }

    this.updateSecretWordArray(letter.letter);
    this.updateLetters(letter.letter);
    this.checkGameStatus();
  }

  private updateScore(): void {
    this.score--;
    this.heartBeating -= this.score >= 4 ? 1 : 0.5;
  }

  private updateSecretWordArray(letter: any): void {
    debugger;
    this.secretWordArray = this.secretWordArray.map((charObj) =>
      charObj.key.toLowerCase() === letter
        ? { ...charObj, visible: true }
        : charObj
    );
  }

  private updateLetters(letter: any): void {
    debugger;
    this.letters = this.letters.map((charObj) =>
      charObj.letter === letter ? { ...charObj, visible: false } : charObj
    );
  }

  private checkGameStatus(): void {
    if (this.secretWordArray.every((char) => char.visible)) {
      debugger;
      this.playerWins = true;
      this.playerLoose = false;
      this.modal.open();
    } else if (this.score <= 0) {
      this.playerLoose = true;
      this.modal.open();
    }
  }
}
