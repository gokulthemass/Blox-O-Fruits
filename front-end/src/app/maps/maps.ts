import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';


interface maps{
  name: string;
  image: string;
  requirement: number
}
@Component({
  selector: 'app-maps',
  imports: [FormsModule, CommonModule],
  templateUrl: './maps.html',
  styleUrl: './maps.css',
})
export class Maps implements OnInit{
  mapArray: maps[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
      const savedData = localStorage.getItem('allmaps');

      if(savedData){
        this.mapArray = JSON.parse(savedData);
        console.log('data from local storage');
        return
      }

      this.http.get<{allmaps: maps[]}>('assets/data/JSON/maps.json')
      .subscribe({
        next: (data) => {
          this.mapArray = data.allmaps;

          localStorage.setItem(
            'allmaps',
            JSON.stringify(this.mapArray)
          )
        }
      })

  }

    rarityClass(rarity: string): string {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'bg-gray-500';

      case 'uncommon':
        return 'bg-green-500';

      case 'rare':
        return 'bg-blue-500';

      case 'epic':
        return 'bg-purple-500';

      case 'legendary':
        return 'bg-orange-500';

      case 'mythical':
        return 'bg-red-500';

      default:
        return 'bg-gray-700';
    }
  }

  openDetails(map: maps){
    this.router.navigate(['/maps', map.name]);
  }
}


