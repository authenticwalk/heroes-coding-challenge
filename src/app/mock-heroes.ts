import { Hero } from './hero';
import { Weapon } from './weapon';
import { Armour } from './armour';

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice', health: 49,weapon: new Weapon(1, "Weapon 1", 100),armour: new Armour(1, "Armour 1", 50) },
  { id: 12, name: 'Narco', health: 100,weapon: new Weapon(1, "Weapon 2", 100),armour: new Armour(1, "Armour 2", 100) },
  { id: 13, name: 'Bombasto', health: 100,weapon: new Weapon(1, "Weapon 3", 100),armour: new Armour(1, "Armour 3", 100) },
  { id: 14, name: 'Celeritas', health: 100,weapon: new Weapon(1, "Weapon 4", 100),armour: new Armour(1, "Armour 4", 100) },
  { id: 15, name: 'Magneta', health: 100,weapon: new Weapon(1, "Weapon 5", 100),armour: new Armour(1, "Armour 5", 100) },
  { id: 16, name: 'RubberMan', health: 100,weapon: new Weapon(1, "Weapon 6", 100),armour: new Armour(1, "Armour 6", 100) },
  { id: 17, name: 'Dynama', health: 100,weapon: new Weapon(1, "Weapon 7", 100),armour: new Armour(1, "Armour 7", 100) },
  { id: 18, name: 'Dr IQ', health: 100,weapon: new Weapon(1, "Weapon 8", 100),armour: new Armour(1, "Armour 8", 100) },
  { id: 19, name: 'Magma', health: 100,weapon: new Weapon(1, "Weapon 9", 100),armour: new Armour(1, "Armour 9", 100) },
  { id: 20, name: 'Tornado', health: 100,weapon: new Weapon(1, "Weapon 10", 100),armour: new Armour(1, "Armour 10", 100) }
];
