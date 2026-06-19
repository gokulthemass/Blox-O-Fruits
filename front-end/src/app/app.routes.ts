import { Routes } from '@angular/router';
import { Body } from './body/body';
import { Fruits } from './fruits/fruits';

import { Maps } from './maps/maps';
import { FightingStyles } from './fighting-styles/fighting-styles';
import { Swords } from './swords/swords';
import { Guns } from './guns/guns';
import { SeaEvents } from './sea-events/sea-events';
import { TierList } from './tier-list/tier-list';
import { Updates } from './updates/updates';
import { Login } from './credentials/login/login';
import { Register } from './credentials/register/register';
import { Fightingstyledetails } from './fightingstyledetails/fightingstyledetails';
import { FruitDetails } from './fruit-details/fruit-details';
import { SwordDetails } from './sword-details/sword-details';
import { GunDetails } from './gun-details/gun-details';
import { SeaEventDetails } from './sea-event-details/sea-event-details';
import { FruitCalculator } from './calculator/fruit-calculator/fruit-calculator';

// app.routes.ts - Fix path cases
export const routes: Routes = [
  { path: '', component: Body },
  { path: 'fruits', component: Fruits },  // lowercase
  { path: 'fruits/:name', component: FruitDetails},
  { path: 'calculator', component: FruitCalculator },
  { path: 'maps', component: Maps },
  { path: 'fighting-styles', component: FightingStyles },  // lowercase
  { path: 'swords', component: Swords },
  { path: 'swords/:name', component: SwordDetails},
  { path: 'guns', component: Guns },
  { path: 'guns/:name', component: GunDetails}, 
  { path: 'sea-events', component: SeaEvents },
  { path: 'sea-events/:name', component: SeaEventDetails},
  { path: 'tier-list', component: TierList },
  { path: 'updates', component: Updates },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'fighting-style/:name', component: Fightingstyledetails}, 
  { path: '**', redirectTo: '' }  // fallback
];
