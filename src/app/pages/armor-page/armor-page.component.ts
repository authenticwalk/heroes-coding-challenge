import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_ARMOR_IMAGE } from 'src/app/core/constants/mock-data';
import { Armor } from 'src/app/core/models/armor';
import { ArmorService } from 'src/app/shared/services/armor.service';

@Component({
  selector: 'app-armor-page',
  templateUrl: './armor-page.component.html',
  styleUrls: ['./armor-page.component.css'],
})
export class ArmorPageComponent implements OnInit {
  armors: Armor[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(private armorService: ArmorService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.armorService
      .getArmors()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((armors) => (this.armors = armors));
  }

  goToDetail(armor: Armor): void {
    this.router.navigateByUrl(`/armor/detail/${armor.id}`);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
