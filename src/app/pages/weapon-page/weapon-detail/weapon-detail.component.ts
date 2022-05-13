import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WEAPON_IMAGE } from 'src/app/core/constants/mock-data';
import { Weapon } from 'src/app/core/models/weapon';
import { WeaponService } from 'src/app/shared/services/weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css'],
})
export class WeaponDetailComponent implements OnInit {
  weapon: Weapon | undefined;
  ngUnsubscribe = new Subject<void>();
  DEFAULT_WEAPON_IMAGE = DEFAULT_WEAPON_IMAGE;
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService
  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }

  getWeapon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.weaponService
      .getWeapon(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((weapon) => (this.weapon = weapon));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
