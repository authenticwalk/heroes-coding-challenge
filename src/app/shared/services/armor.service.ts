import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Armor } from 'src/app/core/models/armor';
import { ARMORS } from 'src/app/core/constants/mock-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ArmorService {
  constructor(private messageService: MessageService) {}

  getArmors(): Observable<Armor[]> {
    const armors = of(ARMORS);
    this.messageService.add('armorService: fetched weapons');
    return armors;
  }

  getArmor(id: number): Observable<Armor> {
    const armor = ARMORS.find((h) => h.id === id)!;
    this.messageService.add(`armorsService: fetched weapon id=${id}`);
    return of(armor);
  }
}
