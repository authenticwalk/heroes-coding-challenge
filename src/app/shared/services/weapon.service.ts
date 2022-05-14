import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WEAPONS } from 'src/app/core/constants/mock-data';
import { Weapon } from 'src/app/core/models/weapon';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  constructor(private messageService: MessageService) {}

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    const weapon = WEAPONS.find((weapon) => weapon.id === id)!;
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return of(weapon);
  }
}
