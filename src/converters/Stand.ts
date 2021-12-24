/* eslint-disable no-use-before-define */

export const VERSION = 'Jackz Custom Vehicle 1.0.0'

export interface StandCustomVehicle {
  version: string;
  base: BaseVehicle;
  objects: Entity[];
}

export interface Entity {
  offset: Vector3;
  model: number;
  name?: string;
  rotation: Vector3;
}

export interface Vector3 {
  x: number;
  z: number;
  y: number;
}

export interface BaseVehicle {
  invisible: boolean;
  model: number;
  savedata?: StandVehicle;
}

export interface StandVehicle {
  Livery: {
    Count: number;
    Style: number;
  };
  'Dirt Level': number;
  Name: string;
  'Window Tint': number;
  'Interior Color': number;
  Mods: Mods;
  'Engine Running': boolean;
  Manufacturer: string;
  Type: string;
  Colors: {
    Extras: Extras;
    Vehicle: VehicleColor;
    'Paint Fade': number;
    Primary: Primary;
    'Color Combo': number;
    Secondary: Primary;
  };
  Format: string;
  Model: number;
  Extras: Record<string, boolean>;
  'Bulletproof Tires': boolean;
  'Dashboard Color': number;
  Lights: {
    Neon: Neon;
    'Xenon Color': number;
  };
  'License Plate': {
    Type: number;
    Text: string;
  };
  'Tire Smoke': CustomColor;
}

interface Neon {
  Color: CustomColor;
  Right: boolean;
  Front: boolean;
  Back: boolean;
  Left: boolean;
}

interface Primary {
  'Custom Color': CustomColor;
  Custom: boolean;
}

interface CustomColor {
  g: number;
  r: number;
  b: number;
}

interface VehicleColor {
  g: number;
  b: number;
  Primary: number;
  r: number;
  Secondary: number;
}

interface Extras {
  pearlescent: number;
  wheel: number;
}

interface Mods {
  'Motorcycle Back Wheel Design': number;
  Horns: number;
  Engine: number;
  'Dial Design': number;
  Brakes: number;
  Transmission: number;
  'Trim Design': number;
  Hood: number;
  Plaques: number;
  Fender: number;
  'Steering Wheel': number;
  Ornaments: number;
  'Shifter Leavers': number;
  Toggles: Record<string, boolean>;
  Exhaust: number;
  'Front Bumper': number;
  Hydraulics: number;
  Roof: number;
  Livery: number;
  Armor: number;
  'Rear Bumper': number;
  Grille: number;
  Frame: number;
  Suspension: number;
  'Right Fender': number;
  'Plate Holders': number;
  'Side Skirt': number;
  'Wheels Design': number;
  Spoilers: number;
}
