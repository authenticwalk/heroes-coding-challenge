import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Armour } from './armour';
import { ARMOURS } from './mock-armours';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class ArmourService {

  constructor(private messageService: MessageService) { }

  getArmours(): Observable<Armour[]> {
    const armours = of(ARMOURS);
    this.messageService.add('ArmourService: fetched armours');
    return armours;
  }

  getArmour(id: number): Observable<Armour> {
    const armour = ARMOURS.find(h => h.id === id)!;
    this.messageService.add(`ArmourService: fetched armour id=${id}`);
    return of(armour);
  }
}
