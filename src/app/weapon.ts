export class Weapon {
  public id: number;
  public name: string;
  public damage: number;

  constructor(id: number,name: string, damage: number) {
    this.id = id;
    this.name = name;
    this.damage = damage;
  }
}