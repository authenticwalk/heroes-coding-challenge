import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LEVELS } from 'src/app/core/constants/mock-stage';
import { Level } from 'src/app/core/models/level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor() {}

  getLevels(): Observable<Level[]> {
    const heroes = of(LEVELS);
    return heroes;
  }

  getLevel(id: string): Observable<Level> {
    const hero = LEVELS.find((level) => level.id === id)!;
    return of(hero);
  }

  getNextLevel(id: string): Level {
    const indexCurrentLevel = LEVELS.findIndex((level) => level.id === id);
    return LEVELS[indexCurrentLevel + 1];
  }
}
