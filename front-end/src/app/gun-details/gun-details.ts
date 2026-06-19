import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Gun {
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
  selector: 'app-gun-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gun-details.html',
  styleUrl: './gun-details.css'
})
export class GunDetails implements OnInit {

  gun!: Gun;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const gunName = this.route.snapshot.paramMap.get('name');

    const savedGuns = localStorage.getItem('allguns');

    if (!savedGuns) {
      console.error('No guns found in localStorage');
      return;
    }

    const guns: Gun[] = JSON.parse(savedGuns);

    const selected = guns.find(
      gun => gun.name === gunName
    );

    if (selected) {
      this.gun = selected;
      console.log('Loaded from localStorage:', this.gun);
    } else {
      console.error('Gun not found:', gunName);
    }
  }
  

  rarityClass(rarity: string): string {
    switch (rarity) {
      case 'Common':
        return 'bg-yellow-400 text-yellow-900';

      case 'Uncommon':
        return 'bg-blue-400 text-blue-900';

      case 'Rare':
        return 'bg-purple-400 text-purple-900';

      case 'Epic':
        return 'bg-red-400 text-red-900';

      case 'Legendary':
        return 'bg-pink-500 text-pink-100';

      case 'Mythical':
        return 'bg-red-600 text-white';

      case 'mythical':
        return 'bg-red-600 text-white';

      default:
        return 'bg-gray-400 text-gray-900';
    }
  }
}