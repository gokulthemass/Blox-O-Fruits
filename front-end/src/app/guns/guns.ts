import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface guns{
  name: string;
  image: string;
  rarity: string;
  cost_beli: number;
  cost_fragments: number;
  npc: string;
  location: string;
  requirements: string;
}
@Component({
  selector: 'app-guns',
  imports: [FormsModule, CommonModule],
  templateUrl: './guns.html',
  styleUrl: './guns.css',
})
export class Guns implements OnInit{
    gunArray: guns[] = [];
  searchText = '';

  constructor(private http: HttpClient, private router: Router) {}

 ngOnInit(): void {

  const savedContent = localStorage.getItem('allguns');

  if (savedContent) {
    try {
      this.gunArray = JSON.parse(savedContent);
      console.log('Loaded from local storage!');
      return;
    } catch (err) {
      console.error('Invalid localStorage value:', savedContent);
      localStorage.removeItem('allguns');
    }
  }

  this.http
    .get<{ allguns: guns[] }>('/assets/data/JSON/guns.json')
    .subscribe({
      next: (data) => {
        this.gunArray = data.allguns;

        localStorage.setItem(
          'allguns',
          JSON.stringify(this.gunArray)
        );

        console.log('Loaded from JSON!');
      }
    });
}

  filteredGuns(): guns[] {
    if(!this.searchText.trim()){
      return this.gunArray;
    }

    return this.gunArray.filter(gun => 
      gun.name.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
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

  openDetails(gun: guns){
    this.router.navigate(['/guns', gun.name]);
  }
}
