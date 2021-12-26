/* eslint-disable no-use-before-define */

export const CUSTOM_VEHICLE_VERSION = 'Jackz Custom Vehicle 1.0.0'
export const VEHICLE_VERSION = 'JSTAND 1.3'

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

export enum Mod {
  'Spoilers' = 1,
  'Front Bumper' = 2,
  'Rear Bumper' = 3,
  'Side Skirt' = 4,
  'Exhaust' = 5,
  'Frame' = 6,
  'Grille' = 7,
  'Hood' = 8,
  'Fender' = 9,
  'Right Fender' = 10,
  'Roof' = 11,
  'Engine' = 12,
  'Brakes' = 13,
  'Transmission' = 14,
  'Horns' = 15,
  'Suspension' = 16,
  'Armor' = 17,
  'Wheels Design' = 24,
  'Motorcycle Back Wheel Design' = 25,
  'Plate Holders' = 26,
  'Trim Design' = 28,
  'Ornaments' = 29,
  'Dial Design' = 31,
  'Steering Wheel' = 34,
  'Shifter Leavers' = 35,
  'Plaques' = 36,
  'Hydraulics' = 39,
  'Livery' = 49,
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
  Mods: StandMods;
  'Engine Running': boolean;
  Manufacturer?: string;
  Type?: string;
  Colors: {
    Extras: Extras;
    Vehicle: VehicleColor;
    'Paint Fade': number;
    Primary: PaintColor | PaintColorCustom;
    'Color Combo': number;
    Secondary: PaintColor | PaintColorCustom;
  };
  Format?: string;
  Model: number;
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

enum StandExtras {
  UNK17 = 17,
  'Turbo Turning' = 18,
  UNK19 = 19,
  'Tire Smoke' = 20,
  UNK21 = 21,
  'Xenon Headlights' = 22
}

interface Neon {
  Color: CustomColor;
  Right: boolean;
  Front: boolean;
  Back: boolean;
  Left: boolean;
}

interface PaintColor {
  Custom: boolean,
  'Paint Type': number,
  'Color': number,
  'Pearlescent Color'?: number,
}

interface PaintColorCustom extends PaintColor {
  'Custom Color'?: CustomColor,
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

export interface StandMods {
  [key: string]: boolean | Record<string, boolean>
}
