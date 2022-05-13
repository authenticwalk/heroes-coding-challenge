import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Weapon } from 'src/app/core/models/weapon';
import { WeaponService } from 'src/app/shared/services/weapon.service';

@Component({
  selector: 'app-weapon-page',
  templateUrl: './weapon-page.component.html',
  styleUrls: ['./weapon-page.component.css'],
})
export class WeaponPageComponent implements OnInit {
  weapons: Weapon[] = [];
  ngUnsubscribe = new Subject<void>();
  constructor(private weaponService: WeaponService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.weaponService
      .getWeapons()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((weapons) => (this.weapons = weapons));
  }

  goToDetail(weapon: Weapon): void {
    this.router.navigateByUrl(`/weapon/detail/${weapon.id}`);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
