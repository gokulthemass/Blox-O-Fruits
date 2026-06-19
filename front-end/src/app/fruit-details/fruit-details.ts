  import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface fruits {
  name: string;
  image: string;
  rarity: string;
  fruit_type: string;
  trend: string;
  demand: number;
  price_beli: number;
  price_robux: number;
  best_for: string;
  moves: Array<{
    name: string;
    key: string;
    mastery: number;
    description: string;
  }>;
}
@Component({
  selector: 'app-fruit-details',
  imports: [CommonModule],
  templateUrl: './fruit-details.html',
  styleUrl: './fruit-details.css',
})
export class FruitDetails implements OnInit{

  fruit: fruits | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    const fruitName = this.route.snapshot.paramMap.get('name');

    const savedData = localStorage.getItem('allfruit');

    if (savedData) {
      const fruitsArray: fruits[] = JSON.parse(savedData);

      this.fruit = fruitsArray.find(
        fruit =>
          fruit.name.toLowerCase() === fruitName?.toLowerCase()
      );

      if (this.fruit) {
        return; 
      }
    }

    this.http
      .get<{ allfruit: fruits[] }>(
        'assets/data/JSON/fruits.json'
      )
      .subscribe({
        next: (data) => {
          this.fruit = data.allfruit.find(
            fruit =>
              fruit.name.toLowerCase() ===
              fruitName?.toLowerCase()
          );
        },
        error: (err) => {
          console.error(err);
        },
      });
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

