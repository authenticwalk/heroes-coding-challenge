import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import Konva from 'konva';

import { WeaponService } from '../weapon.service';
import { ArmourService } from '../armour.service';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  width: number = window.innerWidth*0.6;
  height: number = 500;
  numHero: number = 0;
  heroLeft: boolean = false;
  heroRight: boolean = false;
  hero1: any = {};
  hero2: any = {};
  inBattle: boolean = false;

  constructor(
    private heroService: HeroService,
    private armourService: ArmourService,
    private weaponService: WeaponService
  ) { }

  ngOnInit() {
    this.getHeroes();
    this.setUpConva();
  }

  setUpConva() {
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height
    });
    this.layer = new Konva.Layer();
    const _this = this;

    Konva.Image.fromURL('./assets/background.png', function (bgImage: any) {
      bgImage.setAttrs({
        id: null,
        category: 'background',
        x: 0,
        y: 0,
        width: _this.stage.width(),
        height: _this.stage.height(),
        draggable: false
      });
      _this.layer.add(bgImage);
    });

    this.stage.add(this.layer);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 8));
  }

  getHero(id: number): Object {
    let obj: Object = {};
    this.heroService.getHero(id)
      .subscribe(hero => Object.assign(obj, this.heroDetail(hero)));
    
    return obj;
  }

  heroDetail(hero: Hero): Object {
    let obj: Object = {
      id: hero.id,
      name: hero.name,
      hero_health: hero.health
    };
    this.armourService.getArmour(hero.armour_id)
      .subscribe(armour => Object.assign(obj, {
        armour_name: armour.name,
        armour_health: armour.health
      }));

    this.weaponService.getWeapon(hero.weapon_id)
      .subscribe(weapon => Object.assign(obj, {
        weapon_name: weapon.name,
        weapon_damage: weapon.damage
      }));

    return obj;
  }

  checkChildrenHero(id: number): boolean {
    const tr = this.layer.children?.find(item => item.attrs.id == id);
    if (tr) {
      return true;
    }

    return false;
  }

  deployHero(id: number): void {
    const _this = this;

    if (this.checkChildrenHero(id)) {
      const tr = this.layer.children?.find(item => item.attrs.id == id);

      if (tr?.attrs.scaleX == 1) {
        this.heroLeft = false;
      } else if (tr?.attrs.scaleX == -1) {
        this.heroRight = false;
      }

      tr?.destroy();
      this.numHero--;
      this.layer.draw();
    } else {
      Konva.Image.fromURL(`./assets/heroes/${id}.png`, function (heroImg: any) {
        if (_this.numHero != 2) {
          if (!_this.heroLeft) {
            heroImg.setAttrs({
              id: id,
              category: 'hero',
              x: 100,
              y: 100,
              width: 200,
              scaleX: 1,
              height: 400,
              draggable: false
            });
            _this.heroLeft = true;
            _this.layer.add(heroImg);
            _this.hero1 = _this.getHero(id);
            _this.numHero++;
          } else if (!_this.heroRight) {
            heroImg.setAttrs({
              id: id,
              category: 'hero',
              x: _this.width-100,
              y: 100,
              width: 200,
              height: 400,
              scaleX: -1,
              draggable: false
            });
            _this.heroRight = true;
            _this.layer.add(heroImg);
            _this.hero2 = _this.getHero(id);
            _this.numHero++;
          }
        }
      });
    }
  }

  isBattleOver(): boolean {
    if (this.hero1.hero_health == 0 || this.hero2.hero_health == 0) {
      return true;
    }
    return false;
  }

  timer(ms: number): Promise<void> {
    return new Promise(res => {
      setTimeout(res, ms);
    });
  }

  attackFromTo(attacker: any, target: any): any {
    if (target.armour_health > 0) {
      if (target.armour_health - attacker.weapon_damage > 0) {
        target.armour_health = target.armour_health - attacker.weapon_damage;
      } else {
        target.armour_health = 0;
        target.hero_health = target.hero_health - (attacker.weapon_damage - target.armour_health);
      }
    } else if (target.hero_health > 0) {
      if (target.hero_health - attacker.weapon_damage > 0) {
        target.hero_health = target.hero_health - attacker.weapon_damage;
      } else {
        target.hero_health = 0;
      }
    }
    return target;
  }

  async startBattle(): Promise<void> {
    if (this.numHero == 2) {
      this.inBattle = true;
      console.log("start");

      while(!this.isBattleOver()) {
        await this.timer(1000);
        this.hero2 = this.attackFromTo(this.hero1, this.hero2);
        this.hero1 = this.attackFromTo(this.hero2, this.hero1);
      }
      
    } else {
      alert('Please select two heroes');
    }
  }

}
