import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories = [
    'countries',
    'animals',
    'movies',
    'tv shows',
    'capital cities',
    'sports',
  ];
  choosenCategory: string | null = '';

  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {
    this.choosenCategory = localStorage.getItem('choosenCategory');
  }

  backClicked() {
    this._location.back();
  }

  previousStep() {
    this._location.back();
  }

  chooseCategory(item: any) {
    this.choosenCategory = '';
    localStorage.setItem('choosenCategory', item);
    this.router.navigate(['/main']);
  }

  nextStep() {
    const selectedCategory = localStorage.getItem('choosenCategory');

    if (selectedCategory === null) {
      alert('Please select category');
      return;
    }

    this.router.navigate(['/how-to-play']);
  }
}
