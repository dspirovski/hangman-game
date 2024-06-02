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
  playerLoose: any = '';
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
      { letter: 'a', visible: true },
      { letter: 'b', visible: true },
      { letter: 'c', visible: true },
      { letter: 'd', visible: true },
      { letter: 'e', visible: true },
      { letter: 'f', visible: true },
      { letter: 'g', visible: true },
      { letter: 'h', visible: true },
      { letter: 'i', visible: true },
      { letter: 'j', visible: true },
      { letter: 'k', visible: true },
      { letter: 'l', visible: true },
      { letter: 'm', visible: true },
      { letter: 'n', visible: true },
      { letter: 'o', visible: true },
      { letter: 'p', visible: true },
      { letter: 'q', visible: true },
      { letter: 'r', visible: true },
      { letter: 's', visible: true },
      { letter: 't', visible: true },
      { letter: 'u', visible: true },
      { letter: 'v', visible: true },
      { letter: 'w', visible: true },
      { letter: 'x', visible: true },
      { letter: 'y', visible: true },
      { letter: 'z', visible: true },
    ];
  }
  openModal() {
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

  choosenLetter(item: any): any {
    for (let i = 0; i < this.secretWordArray.length; i++) {
      if (this.secretWordArray[i].key.toLowerCase() === item.letter) {
        this.secretWordArray[i].visible = true;
      }

      const checkForCorrectAnswer = this.secretWordArray.every((el: any) => {
        return el.visible === true;
      });

      if (checkForCorrectAnswer) {
        this.playerWins = true;
        this.playerLoose = false;
        this.modal.open();
      }
    }

    //decrease player score for every incorect attempt
    if (!this.secretWord.toLowerCase().includes(item.letter)) {
      this.score--;
      if (this.score >= 4) {
        this.heartBeating--;
      } else {
        this.heartBeating -= 0.5;
      }
    }

    //find index of the letter to disable
    for (let i = 0; i < this.letters.length; i++) {
      if (this.letters[i].letter === item.letter) {
        this.letters[i].visible = false;
      }
    }

    //display alert message if playes lose the game
    if (this.score === 0) {
      this.playerLoose = true;
      this.modal.open();
      return;
    }

    if (!this.secretWord.toLowerCase().includes(item.letter)) {
      this.progress++;
    }
  }
}
