import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Armour } from '../armour';
import { ArmourService } from '../armour.service';

import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  armour: Armour | undefined;
  weapon: Weapon | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armourService: ArmourService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.heroDetail(hero));
  }

  heroDetail(hero: Hero): void {
    this.hero = hero;
    this.armourService.getArmour(hero.armour_id)
      .subscribe(armour => this.armour = armour);

    this.weaponService.getWeapon(hero.weapon_id)
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }
}
