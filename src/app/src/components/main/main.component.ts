import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as data from '../../../../data.json';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  data: any;
  secretWord: string = '';
  secretWordArray: any = [];
  progress = 5;
  score: any = 10;
  playerWins: any = '';
  choosenCategory: any = '';
  heartBeating: any = 8;
  gameIsPaused: boolean = false;

  letters: any = [];

  constructor(private router: Router, private modal: ModalService) {}

  ngOnInit() {
    this.choosenCategory = localStorage.getItem('choosenCategory');
    this.data = data;
    this.playerWins = null;

    this.generateNewGame();
  }

  setLetters() {
    this.letters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
  }
  openModal() {
    this.gameIsPaused = true;
    this.modal.open();
  }

  // pauseGame() {
  //   this.openModal();
  // }
  //generates new game
  generateNewGame = () => {
    this.setLetters();
    this.modal.close();
    this.playerWins = null;
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

  exitGame() {
    localStorage.removeItem('choosenCategory');
    this.router.navigate(['']);
  }

  choosenLetter(letter: string): any {
    for (let i = 0; i < this.secretWordArray.length; i++) {
      if (this.secretWordArray[i].key.toLowerCase() === letter) {
        this.secretWordArray[i].visible = true;
      }

      const checkForCorrectAnswer = this.secretWordArray.every((el: any) => {
        return el.visible === true;
      });

      if (checkForCorrectAnswer) {
        this.playerWins = true;
        this.modal.open();
      }
    }

    //decrease player score for every incorect attempt
    if (!this.secretWord.toLowerCase().includes(letter)) {
      this.score--;
      if (this.score >= 4) {
        this.heartBeating--;
      } else {
        this.heartBeating -= 0.5;
      }
    }

    //find index of the letter to remove
    let removeChoosenLetter = this.letters.filter((el: any) => el !== letter);
    this.letters = removeChoosenLetter;

    //display alert message if playes lose the game
    if (this.score === 0) {
      this.playerWins = false;
      this.modal.open();
      return;
    }

    if (!this.secretWord.toLowerCase().includes(letter)) {
      this.progress++;
    }
  }
}
