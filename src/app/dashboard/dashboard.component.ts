import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { DEFAULT_IMAGE } from '../core/constants/mock-data';
import { DEFAULT_MONSTER_IMAGE } from '../core/constants/mock-monster';
import { Hero } from '../core/models/hero';
import { Level } from '../core/models/level';
import { Monster } from '../core/models/monster';
import { FightingService } from '../shared/services/fighting.service';
import { HeroService } from '../shared/services/hero.service';
import { LevelService } from '../shared/services/level.service';
import { MonterService } from '../shared/services/monter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  DEFAULT_IMAGE = DEFAULT_IMAGE;
  ngUnsubscribe = new Subject<void>();
  levels: Level[] = [];
  isReplay: boolean = false;
  isNextLevel: boolean = false;
  level: Level | any;
  monster: Monster | any;
  hero: Hero | any;
  loadMonster$ = new BehaviorSubject<any>(undefined);
  isPlay = true;

  constructor(
    private heroService: HeroService,
    private levelService: LevelService,
    private fightingService: FightingService,
    private monsterService: MonterService
  ) {
    this.loadMonster();
  }

  ngOnInit() {
    this.getHeroes();
    this.getListLevels();
    this.listenFighting();
    this.listenFinished();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 5)));
  }

  getListLevels(): void {
    this.levelService
      .getLevels()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((levels) => {
        this.levels = levels;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadHero(hero: Hero): void {
    var imageObj = new Image();
    imageObj.src = hero.imageSrc || DEFAULT_IMAGE;
    this.fightingService.drawHero(imageObj, 100, 40, hero.health);
    this.hero = hero;
  }

  loadLevel(level: Level): void {
    this.level = level;
    this.fightingService.reload();
    this.fightingService.addImageLevelLayer(level);
    this.loadMonster$.next(level);
  }

  loadMonster(): void {
    this.loadMonster$
      .pipe(
        filter((level) => !!level),
        switchMap((level: any) => {
          return combineLatest([
            this.monsterService.getMonster(level.monsterId),
            of(level),
          ]);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([monster, level]: [any, any]) => {
        const imageObj = new Image();
        this.monster = monster;
        imageObj.src = monster.imageSrc || DEFAULT_MONSTER_IMAGE;
        this.fightingService.drawMonster(imageObj, 100, 40, monster.health);
      });
  }

  Play(): void {
    this.fightingService.animationHero.start();
    this.fightingService.animationMonster.start();
  }

  listenFighting(): void {
    this.fightingService.fightLevel
      .pipe(
        filter((isFighting) => !!isFighting),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.fightingService.changeHealth.next({
          hero: this.hero,
          monster: this.monster,
        });
      });
  }

  listenFinished(): void {
    this.fightingService.isFinish$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isFinished) => {
        if (isFinished) {
          this.isReplay = !this.fightingService.isHeroWin;
          this.isNextLevel = this.fightingService.isHeroWin;
          this.isPlay = false;
        }
      });
  }
  //TODO load old hero and old monster
  Replay(): void {}

  NextLevel(): void {
    const nextLevel = this.levelService.getNextLevel(this.level.id);
    this.level = nextLevel;
    this.fightingService.reload();
    this.fightingService.addImageLevelLayer(nextLevel);
    this.loadMonster$.next(nextLevel);
    this.isPlay = true;
  }
}
