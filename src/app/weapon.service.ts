import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Weapon } from './weapon';
import { WEAPONS } from './mock-weapons';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched Weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    // For now, assume that a Weapon with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const weapon = WEAPONS.find(h => h.id === id)!;
    this.messageService.add(`WeaponService: fetched Weapon id=${id}`);
    return of(weapon);
  }
}
