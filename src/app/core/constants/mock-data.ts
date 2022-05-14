import { Armor } from '../models/armor';
import { Hero } from '../models/hero';
import { Weapon } from '../models/weapon';

export const HEROES: Hero[] = [
  {
    id: 1,
    name: 'Hero keyboard',
    health: 100,
    damage: 1,
  },
  { id: 2, name: 'National hero', health: 100, damage: 20 },
  { id: 3, name: 'Sky knight', health: 100, damage: 20 },
  { id: 4, name: 'Iron Knight', health: 100, damage: 15 },
  { id: 5, name: 'Knight', health: 100, damage: 15 },
];

export const WEAPONS: Weapon[] = [
  {
    id: 1,
    name: 'Normal Sword',
    damage: 10,
    imageSrc:
      'assets/weapons/taiPNGmienphi-free-01829-thanh-kiem-sac-kiem-ngan.png',
  },
  {
    id: 2,
    name: 'Special Sword',
    damage: 15,
    imageSrc:
      'assets/weapons/pngtree-purple-sword-cartoon-illustration-image_1448188.jpeg',
  },
  {
    id: 3,
    name: 'Wooden sword',
    damage: 5,
    imageSrc:
      'assets/weapons/pngtree-metal-sword-cartoon-weapon-png-image_4600023.jpeg',
  },
  {
    id: 4,
    name: 'Iron Sword',
    damage: 8,
    imageSrc:
      'assets/weapons/taiPNGmienphi-free-01821-thanh-guom-thanh-kiem-sac-kiem-dep.png',
  },
];

export const ARMORS: Armor[] = [
  { id: 1, name: 'Iron armor', health: 55 },
  { id: 2, name: 'Normal armor', health: 50 },
  { id: 3, name: 'Special armor', health: 60 },
  { id: 4, name: 'Cloth armor', health: 40 },
];

export const DEFAULT_IMAGE =
  'assets/hero/png-transparent-all-might-my-hero-academia-drawing-chibi-all-might-chibi-manga-chibi-cartoon.png';

export const DEFAULT_WEAPON_IMAGE =
  'assets/weapons/taiPNGmienphi-free-01829-thanh-kiem-sac-kiem-ngan.png';

export const DEFAULT_ARMOR_IMAGE =
  'assets/armors/a1e084e46c4e7df16520fbac15b2eb74.png';
