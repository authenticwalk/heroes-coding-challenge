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

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();

    let width = window.innerWidth * 0.9;
    let height = window.innerHeight;
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
    const id = Number(Math.floor(Math.random() * 10));
    return this.heroService.getHero(id);
  }

  addHero() {
    const component = this;

      this.getHero().subscribe(hero=>{
        Konva.Image.fromURL(hero.imgSrc, function (heroImg: any) {
          heroImg.setAttrs({
            x: 200,
            y: 50,
            width: 150,
            height: 150,   
            draggable: true,       
          });
          component.layer.add(heroImg);
        });
      }     
      );  
  }

  startBattle(){

  }

  clearBattleGround(){
    this.layer.clear();
  }
}
