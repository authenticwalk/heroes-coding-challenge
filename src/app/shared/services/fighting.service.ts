import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FightingService {
  layer$: BehaviorSubject<any> = new BehaviorSubject({});
  stage: any;
  loadLevel = new BehaviorSubject(false);
  layer = new Konva.Layer();
  heroGroup = new Konva.Group({
    x: 50,
    y: 40,
  });
  healthHeroGroup = new Konva.Group({
    x: 0,
    y: 0,
  });
  monsterGroup = new Konva.Group({
    x: 750,
    y: 40,
  });
  healthMonsterGroup = new Konva.Group({
    x: 0,
    y: 0,
  });
  animationHero: any;
  animationMonster: any;
  fightLevel = new BehaviorSubject(false);
  changeHealth = new BehaviorSubject({});
  isHeroWin = false;
  isFinish$ = new BehaviorSubject(false);
  //Behavior load hero to get hero
  constructor() {
    this.initStageCanvas();
    this.listenHealth();
  }
  //TODO add background level to stage
  //TODO add hero to stage, Konvas.Group health = box health
  //TODO find monster
  initStageCanvas(): void {
    const width = 900;
    const height = 600;
    this.stage = new Konva.Stage({
      container: 'imageCanvas' || null,
      width: width,
      height: height,
    });
  }

  addImageLevelLayer(level: any) {
    const imageObj = new Image();
    // main Image:
    imageObj.src =
      level.background ||
      'assets/background/background-boxing-ring-illuminated-sports-area-fighting-dangerous-sport_33099-1023.webp';
    const backgroundLayer = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 900,
      height: 600,
    });

    this.layer.add(backgroundLayer);
    this.stage.add(this.layer);
  }

  drawHero(imageObj: any, height: number, width: number, health: number): void {
    this.drawHealth(this.heroGroup, this.healthHeroGroup, false, health);
    const heroImg = new Konva.Image({
      image: imageObj,
      x: 10,
      y: 300,
      width: height,
      height: width,
    });
    //get
    this.animationHero = new Konva.Animation((frame) => {
      if (this.heroGroup.x() < (750 + 60) / 2 - 60) {
        this.heroGroup.x((750 + 60) / 2 - 60);
      } else {
        this.animationHero.stop();
        this.fightLevel.next(true);
      }
    }, this.layer);
    this.heroGroup.add(heroImg);
    this.heroGroup.on('click', () => {
      this.heroGroup.destroy();
    });
    this.layer.add(this.heroGroup);
    this.stage.add(this.layer);
  }

  drawMonster(
    imageObj: any,
    height: number,
    width: number,
    health: number
  ): void {
    this.drawHealth(this.monsterGroup, this.healthMonsterGroup, false, health);
    const monsterImg = new Konva.Image({
      image: imageObj,
      x: 10,
      y: 300,
      width: height,
      height: width,
    });
    this.animationMonster = new Konva.Animation((frame) => {
      if (this.heroGroup.x() < (750 + 60) / 2 + 50) {
        this.monsterGroup.x((750 + 60) / 2 + 50);
      } else {
        this.animationMonster.stop();
        this.fightLevel.next(true);
      }
    }, this.layer);
    this.monsterGroup.add(monsterImg);
    this.layer.add(this.monsterGroup);
    this.stage.add(this.layer);
  }

  listenHealth(): void {
    this.changeHealth.pipe(delay(200)).subscribe((item: any) => {
      if (Object.values(item).length === 0) {
        return;
      }
      let hero = item.hero;
      let monster = item.monster;
      hero.health = hero.health - monster.damage;
      monster.health = monster.health - hero.damage;
      if (hero.health <= 0) {
        this.heroGroup.destroy();
        this.isHeroWin = false;
        this.isFinish$.next(true);
        return;
      }
      if (monster.health <= 0) {
        this.isHeroWin = true;
        this.monsterGroup.destroy();
        this.isFinish$.next(true);
        return;
      }
      this.drawHealth(this.heroGroup, this.healthHeroGroup, true, hero.health);
      this.drawHealth(
        this.monsterGroup,
        this.healthMonsterGroup,
        true,
        monster.health
      );
      this.fightLevel.next(true);
    });
  }

  drawHealth(
    parentGroup: Group,
    group: Group,
    isFighting?: boolean,
    width?: number
  ): void {
    if (isFighting) {
      group.destroy();
    }
    let colorhealth = 'green';
    if (width && width < 20) {
      colorhealth = 'red';
    }
    const bloodColumn = new Konva.Rect({
      x: 10,
      y: 280,
      width: width || 100,
      height: 20,
      name: 'health',
      fill: colorhealth,
    });
    const text = new Konva.Text({
      x: 45,
      y: 277,
      text: `${width || 100}`,
      fontFamily: 'Calibri',
      fontSize: 18,
      padding: 5,
      fill: 'white',
    });
    group.add(bloodColumn);
    group.add(text);
    parentGroup.add(group);
  }

  addLayer(layer: Layer): void {
    this.stage.add(layer);
  }
  addGroup(group: Group): void {
    this.layer.add(group);
  }

  reload(): void {
    this.layer.destroy();
    this.heroGroup = new Konva.Group({
      x: 50,
      y: 40,
    });
    this.healthHeroGroup = new Konva.Group({
      x: 0,
      y: 0,
    });
    this.monsterGroup = new Konva.Group({
      x: 750,
      y: 40,
    });
    this.healthMonsterGroup = new Konva.Group({
      x: 0,
      y: 0,
    });
    this.isHeroWin = false;
    this.isFinish$.next(false);
  }
}
