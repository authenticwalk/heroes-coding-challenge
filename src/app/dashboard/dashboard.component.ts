import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';
import Konva from 'konva';

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

  constructor(private heroService: HeroService) { }

  public handleClick(component: MouseEvent) {
    console.log('Hello Circle', component);
  }

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

    Konva.Image.fromURL('https://static.wikia.nocookie.net/finalfantasy/images/8/8e/FFIV_PSP_Castle_Battle.png', function (bgImage: any) {
      bgImage.setAttrs({
        x: 0,
        y: 0,
        width: _this.stage.width(),
        height: _this.stage.height(),
        draggable: false
      });
      _this.layer.add(bgImage);
    })

    this.stage.add(this.layer);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
