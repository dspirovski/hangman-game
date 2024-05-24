import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
@Component({
  selector: 'how-to-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.css',
})
export class HowToPlay {
  constructor(private _location: Location) {}

  rules = [
    {
      id: '01',
      header: 'choose a category',
      description:
        'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.',
    },
    {
      id: '02',
      header: 'guess letters',
      description:
        "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses.",
    },
    {
      id: '03',
      header: 'win or loose',
      description:
        'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.',
    },
  ];

  backClicked() {
    this._location.back();
  }
}
