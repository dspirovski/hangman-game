import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-name.component.html',
  styleUrl: './player-name.component.css',
})
export class PlayerNameComponent {
  playerName = '';

  constructor(private _location: Location, private router: Router) {}

  onInputChange() {
    localStorage.setItem('playerName', this.playerName);
  }

  backClicked() {
    this._location.back();
  }

  setPlayerName() {
    localStorage.setItem('playerName', this.playerName);
  }

  nextStep() {
    const playerName = localStorage.getItem('playerName');
    if (playerName === null) {
      alert('Please write player name');
      return;
    }
    this.router.navigate(['/main']);
  }
}
