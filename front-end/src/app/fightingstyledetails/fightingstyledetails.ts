import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Fightingstyle {
  image: string;
  name: string;
  moves: string[];
  rarity: string;
  cost: {
    belly: number;
    fragments: number;
  };
  requirements: {
    mastery: number | null;
    other_styles: string[] | null;
    items: string[] | null;
  };
  where_to_buy: {
    npc: string;
    locations: string[];
  };
}

@Component({
  selector: 'app-fightingstyledetails',
  imports: [CommonModule],
  templateUrl: './fightingstyledetails.html',
  styleUrl: './fightingstyledetails.css',
})
export class Fightingstyledetails implements OnInit{
  style!: Fightingstyle;

constructor(
  private route: ActivatedRoute,
  private http: HttpClient
) {}


ngOnInit(): void {

  const fsname = this.route.snapshot.paramMap.get('name');

  const savedStyles = localStorage.getItem('fighting_styles');

  if (!savedStyles) {
    console.error('No fighting styles found in localStorage');
    return;
  }

  const styles: Fightingstyle[] = JSON.parse(savedStyles);

  const selected = styles.find(
    style => style.name === fsname
  );

  if (selected) {
    this.style = selected;
    console.log('Loaded from localStorage:', this.style);
  } else {
    console.error('Style not found:', fsname);
  }

}

    rarityClass(rarity: string) :string{
    switch(rarity) {
      case 'Common': return 'bg-yellow-400 text-yellow-900';
      case 'Uncommon': return 'bg-blue-400 text-blue-900';
      case 'Rare': return 'bg-purple-400 text-purple-900';
      case 'Epic': return 'bg-red-400 text-red-900';
      case 'Legendary': return 'bg-pink-500 text-pink-100';
      case 'Mythical': return 'bg-red-600 text-white';
      case 'mythical': return 'bg-red-600 text-white';
      default: return 'bg-gray-400 text-gray-900';
    }
  }
}
