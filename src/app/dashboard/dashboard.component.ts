import { getCurrencySymbol } from '@angular/common';
import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  heroesOnStage = new Map();
  heroOnStageIds: number[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();

    let width = window.innerWidth * 0.75;
    let height = window.innerHeight * 0.75;
    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }

  getHero(): Observable<Hero> {
    const id = this.heroesOnStage.size;
    return this.heroService.getHero(id);
  }

  addHero() {
    const component = this;

    this.getHero().subscribe((hero) => {
      Konva.Image.fromURL(hero.imgSrc, function (heroImg: any) {
        heroImg.setAttrs({
          x: 200,
          y: 50,
          width: 150,
          height: 150,
          draggable: true,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: {
            x: 5,
            y: 5,
          },
        });
        component.layer.add(heroImg);

        component.layer.draw();

        component.heroesOnStage.set(hero, heroImg);
      });
    });
  }

  startBattle() {
    this.setColor();
    this.playTime();
  }

  clearBattleGround() {
    this.layer.removeChildren();
    this.layer.draw();
    this.heroesOnStage.clear();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async playTime() {
    while (this.heroesOnStage.size > 1) {
      await this.sleep(1000);
      this.playOneAttack();
    }
  }

  playOneAttack() {
    let damageToEach = this.calculateToSubtract();
    this.reduceHealth(damageToEach);
    this.setColor();
    this.removeHeroes();
    this.declareWinner();
    this.layer.draw();
  }

  calculateToSubtract(): number {
    let damageCount = 0;
    for (let hero of this.heroesOnStage.keys()) {
      damageCount += hero.weapon.damage;
    }

    return damageCount;
  }

  reduceHealth(damage: number) {
    for (let hero of this.heroesOnStage.keys()) {
      damage -= hero.weapon.damage;
      hero.armour.health -= damage;

      if (hero.armour.health < 0) {
        hero.health += hero.armour.health;
        hero.armour.health = 0;
      }
    }
  }

  setColor() {
    for (let hero of this.heroesOnStage.keys()) {
      if (hero.health + hero.armour.health >= 50) {
        this.heroesOnStage.get(hero).fill('green');
      } else {
        this.heroesOnStage.get(hero).fill('red');
      }
    }
  }

  removeHeroes() {
    for (let hero of this.heroesOnStage.keys()) {
      if (hero.health + hero.armour.health <= 0) {
        this.heroesOnStage.get(hero).destroy();
        this.heroesOnStage.delete(hero);
      }
    }
  }

  declareWinner() {
    if (this.heroesOnStage.size === 1)
      for (let hero of this.heroesOnStage.keys()) {
        alert(`Winner is ${hero.name}`);
      }
  }
}
