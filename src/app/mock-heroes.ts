import { Hero } from './hero';
import { Armour } from './armour';
import { Weapons } from './mock-weapons'

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice', health: 100, weapon: Weapons[0], armour: new Armour(1, "abc", 100)},
  { id: 12, name: 'Narco', health: 100, weapon: Weapons[1], armour: new Armour(2, "abc", 100)},
  { id: 13, name: 'Bombasto', health: 100, weapon: Weapons[2], armour: new Armour(3, "abc", 100)},
  { id: 14, name: 'Celeritas', health: 100, weapon: Weapons[3], armour: new Armour(4, "abc", 100)},
  { id: 15, name: 'Magneta', health: 100,  weapon: Weapons[4], armour: new Armour(5, "abc", 100)},
  { id: 16, name: 'RubberMan', health: 100,  weapon: Weapons[5], armour: new Armour(6, "abc", 100)},
  { id: 17, name: 'Dynama', health: 100,  weapon: Weapons[6], armour: new Armour(7, "abc", 100)},
  { id: 18, name: 'Dr IQ', health: 100,  weapon: Weapons[7], armour: new Armour(8, "abc", 100)},
  { id: 19, name: 'Magma', health: 100,  weapon: Weapons[8], armour: new Armour(9, "abc", 100)},
  { id: 20, name: 'Tornado', health: 100,  weapon: Weapons[9], armour: new Armour(10, "abc", 100)},
];
