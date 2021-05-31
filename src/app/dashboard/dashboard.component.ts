import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
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
  numHero: number = 0;

  constructor(private heroService: HeroService) { }

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

  deployHero(id: number): void {
    const _this = this;

    Konva.Image.fromURL(`./assets/heroes/${id}.png`, function (heroImg: any) {
      if (_this.numHero == 0) {
        heroImg.setAttrs({
          x:100,
          y: 100,
          width: 200,
          height: 400,
          draggable: false
        });
        _this.layer.add(heroImg);
        _this.numHero++;
      } else if (_this.numHero == 1) {
        heroImg.setAttrs({
          x: _this.width-100,
          y: 100,
          width: 200,
          height: 400,
          scaleX: -1,
          draggable: false
        });
        _this.layer.add(heroImg);
        _this.numHero++;
      }
    });

    this.stage.add(this.layer);
  }
}
