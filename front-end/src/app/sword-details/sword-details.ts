import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Sword {
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
  selector: 'app-sword-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sword-details.html',
  styleUrl: './sword-details.css'
})
export class SwordDetails implements OnInit {

  sword: Sword | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    const swordName = this.route.snapshot.paramMap.get('name');

    const savedData = localStorage.getItem('allswords');

    if (savedData) {
      const swords: Sword[] = JSON.parse(savedData);

      this.sword =
        swords.find(
          s => s.name.toLowerCase() === swordName?.toLowerCase()
        ) || null;

      return;
    }

    this.http
      .get<{ allswords: Sword[] }>('assets/data/JSON/swords.json')
      .subscribe({
        next: (data) => {
          this.sword =
            data.allswords.find(
              s => s.name.toLowerCase() === swordName?.toLowerCase()
            ) || null;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/swords']);
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
}