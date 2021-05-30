export interface hero {
  id: number;
  name: string;
  imgSrc?: string;
  health: number;
  weapon: weapon;
  armour: armour;
}

export interface weapon {
  id: number;
  name: string;
  damage: number;
}

export interface armour {
  id: number;
  name: string;
  health: number;
}
