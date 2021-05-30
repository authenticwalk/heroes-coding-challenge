import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Weapon } from './weapon';
import { Weapons } from './mock-weapons';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(Weapons);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const weapon = Weapons.find(h => h.id === id)!;
    this.messageService.add(`WeaponService: fetched Weapon id=${id}`);
    return of(weapon);
  }
}
