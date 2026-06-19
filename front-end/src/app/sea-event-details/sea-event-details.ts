import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface SeaEvent {
  name: string;
  image: string;
  type: string;
  location_seas: string[];
  danger_level: string;
  description: string;
  rewards: {
    fragments: string;
    belly: string;
    items: string[];
  };
  how_to_defeat?: string;
  how_to_escape?: string;
  how_to_get?: string;
  how_to_access?: string;
}

@Component({
  selector: 'app-sea-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sea-event-details.html',
  styleUrl: './sea-event-details.css',
})
export class SeaEventDetails implements OnInit {

  seaEvent!: SeaEvent;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const eventName = this.route.snapshot.paramMap.get('name');

    const savedEvents = localStorage.getItem('allSeaEvents');

    if (!savedEvents) {
      console.error('No sea events found in localStorage');
      return;
    }

    const events: SeaEvent[] = JSON.parse(savedEvents);

    const selected = events.find(
      event => event.name === eventName
    );

    if (selected) {
      this.seaEvent = selected;
      console.log('Loaded from localStorage:', this.seaEvent);
    } else {
      console.error('Sea Event not found:', eventName);
    }
  }

  dangerClass(level: string): string {

    switch (level.toLowerCase()) {

      case 'low':
        return 'bg-green-500';

      case 'low to medium':
        return 'bg-lime-500';

      case 'medium':
        return 'bg-yellow-500';

      case 'medium to high':
        return 'bg-orange-500';

      case 'high':
        return 'bg-red-500';

      default:
        return 'bg-purple-600';
    }
  }
}