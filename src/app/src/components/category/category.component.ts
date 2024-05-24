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
  categories = ['countries', 'animals', 'fruits'];
  choosenCategory: string | null = '';

  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {
    this.choosenCategory = localStorage.getItem('choosenCategory');
  }

  previousStep() {
    this._location.back();
  }

  chooseCategory(item: any) {
    this.choosenCategory = '';
    localStorage.setItem('choosenCategory', item);
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
