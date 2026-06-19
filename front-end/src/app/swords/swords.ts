import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface swords {
  name: string;
  image: string;
  rarity: string;
  cost_beli: number;
  cost_fragments: number;
  npc: string;
  location: string;
  requirement: string;
}
@Component({
  selector: 'app-swords',
  imports: [CommonModule, FormsModule],
  templateUrl: './swords.html',
  styleUrl: './swords.css',
})
export class Swords implements OnInit{
  swordsArray: swords[] = [];
  searchText = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
       const savedData = localStorage.getItem('allswords');

      if(savedData){
        this.swordsArray = JSON.parse(savedData);
        console.log(this.swordsArray.length);
        
        console.log(savedData.length);
        
        console.log('loaded from local storage');
        return;
      } 

      this.http.get<{allswords: swords[]}>('assets/data/JSON/swords.json')
      .subscribe({
        next: (data) => {
          this.swordsArray = data.allswords
          localStorage.setItem('allswords', JSON.stringify(this.swordsArray));
        }
      })
    }
  filteredswords(): swords[] {
    if(!this.searchText.trim()) {
      return this.swordsArray;
    }
    return this.swordsArray.filter(sword => sword.name.toLowerCase().includes(this.searchText.toLowerCase()))
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

  openDetails(sword: swords){
    this.router.navigate(['/swords',sword.name]);
  }
}
