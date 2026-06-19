import { Component, OnInit } from '@angular/core';
import { Fruits } from '../../fruits/fruits';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  value: number | null;
} 

interface TradeSlot {
  fruit: fruits | null;
  quantity: number;
}

@Component({
  selector: 'app-fruit-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fruit-calculator.html',
  styleUrl: './fruit-calculator.css',
})
export class FruitCalculator implements OnInit{

  fruitArray: fruits[] = []; 

  showFruitSelector = false;

  selectedSide: 'you' | 'them' = 'you';
  selectedIndex = 0;

  yourSlots: TradeSlot[] = Array(9)
    .fill(null)
    .map(() => ({
      fruit: null,
      quantity: 1
    }));

  theirSlots: TradeSlot[] = Array(9)
    .fill(null)
    .map(() => ({
      fruit: null,
      quantity: 1
    }));

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.http
      .get<{ allfruit: fruits[] }>(
        'assets/data/JSON/fruits.json' 
      )
      .subscribe({
        next: (data) => {
          this.fruitArray = data.allfruit; 
        }
      });

  }

  openFruitSelector(
    side: 'you' | 'them',
    index: number
  ) {

    this.selectedSide = side;
    this.selectedIndex = index;

    this.showFruitSelector = true;
  }

  closeFruitSelector() {
    this.showFruitSelector = false;
  }

selectFruit(fruit: fruits) {

  const slots =
    this.selectedSide === 'you'
      ? this.yourSlots
      : this.theirSlots;

  const emptyIndex = slots.findIndex(
    slot => !slot.fruit
  );

  if (emptyIndex === -1) {
    return;
  }

  slots[emptyIndex] = {
    fruit,
    quantity: 1
  };

  this.showFruitSelector = false;
}

  getTotalValue(
    slots: TradeSlot[]
  ): number {

    return slots.reduce((total, slot) => {

      if (!slot.fruit?.value) {
        return total;
      }

      return total + (slot.fruit.value * slot.quantity);

    }, 0);
  }

  getTotalPrice(
    slots: TradeSlot[]
  ): number {

    return slots.reduce((total, slot) => {

      if (!slot.fruit) {
        return total;
      }

      return total + (slot.fruit.price_beli * slot.quantity);

    }, 0);
  }

  getTotalDemand(
    slots: TradeSlot[]
  ): number {

    const fruits = slots.filter(
      slot => slot.fruit
    );

    if (!fruits.length) {
      return 0;
    }

    const total = fruits.reduce(
      (sum, slot) =>
        sum + (slot.fruit?.demand ?? 0), 
      0
    );

    return +(total / fruits.length).toFixed(1);
  }

  searchTerm = '';

get filteredFruits(): fruits[] {

  if (!this.searchTerm.trim()) {
    return this.fruitArray;
  }

  return this.fruitArray.filter(fruit =>
    fruit.name
      .toLowerCase()
      .includes(
        this.searchTerm.toLowerCase()
      )
  );
}

removeFruit(
  side: 'you' | 'them',
  index: number
) {

  const slots =
    side === 'you'
      ? this.yourSlots
      : this.theirSlots;

  slots[index] = {
    fruit: null,
    quantity: 1
  };

}

formatNumber(value: number): string {

  if (value >= 1_000_000_000) {
    return (
      value / 1_000_000_000
    ).toFixed(1).replace('.0', '') + 'B';
  }

  if (value >= 1_000_000) {
    return (
      value / 1_000_000
    ).toFixed(1).replace('.0', '') + 'M';
  }

  if (value >= 1_000) {
    return (
      value / 1_000
    ).toFixed(1).replace('.0', '') + 'K';
  }

  return value.toString();
}

getYourValue(): number {
  return this.getTotalValue(this.yourSlots);
}

getTheirValue(): number {
  return this.getTotalValue(this.theirSlots);
}
getDifference(): number {
  return (
    this.getTotalValue(this.theirSlots) -
    this.getTotalValue(this.yourSlots)
  );
}

getProfitLoss(): number {
  return Math.abs(
    this.getDifference()
  );
}

getTradeResult(): string {

  const diff =
    this.getDifference();

  if (Math.abs(diff) <= 5_000_000) {
    return 'Fair Trade';
  }

  return diff > 0
    ? 'Win'
    : 'Loss';
}

getProfitLossLabel(): string {

  const diff =
    this.getDifference();

  if (Math.abs(diff) <= 50_000_000) {
    return 'No Profit / Loss';
  }

  return diff > 0
    ? 'Profit'
    : 'Loss';
}

getTradeStatusClasses(): string {

  const result =
    this.getTradeResult();

  if (result === 'Win') {
    return 'bg-emerald-950 border-emerald-500 text-emerald-400';
  }

  if (result === 'Loss') {
    return 'bg-red-950 border-red-500 text-red-400';
  }

  return 'bg-yellow-950 border-yellow-500 text-yellow-400';
}

getYourPercentage(): number {

  const yourValue =
    this.getTotalValue(this.yourSlots);

  const theirValue =
    this.getTotalValue(this.theirSlots);

  const total =
    yourValue + theirValue;

  if (total === 0) {
    return 50;
  }

  return (yourValue / total) * 100;
}

}