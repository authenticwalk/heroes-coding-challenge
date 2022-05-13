import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { WeaponPageComponent } from './pages/weapon-page/weapon-page.component';
import { ArmorPageComponent } from './pages/armor-page/armor-page.component';
import { WeaponDetailComponent } from './pages/weapon-page/weapon-detail/weapon-detail.component';
import { ArmorDetailComponent } from './pages/armor-page/armor-detail/armor-detail.component';
import { ItemDetailComponent } from './shared/components/item-detail/item-detail.component';
import { HeaderPageComponent } from './shared/components/header-page/header-page.component';
import { ListItemComponent } from './shared/components/list-item/list-item.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    ListItemComponent,
    WeaponPageComponent,
    HeaderPageComponent,
    ItemDetailComponent,
    ArmorPageComponent,
    WeaponDetailComponent,
    ArmorDetailComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
