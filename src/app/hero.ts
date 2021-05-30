import { Armour } from './armour';
import { Weapon } from './weapon';

export class Hero {
  public id: number;
  public name: string;
  public health: number;
  public weapon?:Weapon;
  public armour?:Armour;

  constructor(id: number,name: string, health: number,weapon: Weapon,armour: Armour) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.weapon = weapon;
    this.armour = armour;
  }
}
