import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_ARMOR_IMAGE } from 'src/app/core/constants/mock-data';
import { Armor } from 'src/app/core/models/armor';
import { ArmorService } from 'src/app/shared/services/armor.service';

@Component({
  selector: 'app-armor-detail',
  templateUrl: './armor-detail.component.html',
  styleUrls: ['./armor-detail.component.css'],
})
export class ArmorDetailComponent implements OnInit {
  armor: Armor | undefined;
  ngUnsubscribe = new Subject<void>();
  DEFAULT_ARMOR_IMAGE = DEFAULT_ARMOR_IMAGE;
  constructor(
    private route: ActivatedRoute,
    private armorService: ArmorService
  ) {}

  ngOnInit(): void {
    this.getArmor();
  }

  getArmor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.armorService
      .getArmor(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((armor) => (this.armor = armor));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
