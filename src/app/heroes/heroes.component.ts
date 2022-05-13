import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Hero } from '../core/models/hero';
import { HeroService } from '../shared/services/hero.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((heroes) => (this.heroes = heroes));
  }

  goToDetail(hero: Hero): void {
    this.router.navigateByUrl(`/hero/detail/${hero.id}`);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
