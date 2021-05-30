import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArmourService } from '../armour.service';
import { Armour } from '../armour';

@Component({
  selector: 'app-armour-detail',
  templateUrl: './armour-detail.component.html',
  styleUrls: [ './armour-detail.component.css' ]
})
export class ArmourDetailComponent implements OnInit {
  armour: Armour | undefined;

  constructor(
    private route: ActivatedRoute,
    private armourService: ArmourService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArmour();
  }

  getArmour(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.armourService.getArmour(id)
      .subscribe(armour => this.armour = armour);
  }

  goBack(): void {
    this.location.back();
  }
}
