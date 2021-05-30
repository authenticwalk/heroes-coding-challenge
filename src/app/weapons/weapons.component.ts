import { Component, OnInit } from '@angular/core';

import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponesComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapones();
  }

  getWeapones(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }
}
