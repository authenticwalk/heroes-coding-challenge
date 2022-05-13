import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { WeaponPageComponent } from './pages/weapon-page/weapon-page.component';
import { ArmorPageComponent } from './pages/armor-page/armor-page.component';
import { ArmorDetailComponent } from './pages/armor-page/armor-detail/armor-detail.component';
import { WeaponDetailComponent } from './pages/weapon-page/weapon-detail/weapon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero/detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'armors', component: ArmorPageComponent },
  { path: 'armor/detail/:id', component: ArmorDetailComponent },
  { path: 'weapon/detail/:id', component: WeaponDetailComponent },
  { path: 'weapons', component: WeaponPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
