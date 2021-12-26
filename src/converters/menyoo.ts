/* eslint-disable no-use-before-define */
import Converter, { XMLNode } from './Converter'
import { CUSTOM_VEHICLE_VERSION, VEHICLE_VERSION, StandCustomVehicle, Vector3, Entity, StandVehicle, StandMods, Mod } from './Stand'

/* eslint-disable camelcase */
export interface MenyooCustomXML {
  ClearDatabase: XMLNode;
  ClearWorld: XMLNode;
  ClearMarkers: XMLNode;
  IPLsToLoad: {
    _attributes: {
      _load_mp_maps: XMLNode;
      _load_sp_maps: XMLNode;
    }
  }
  IPLsToRemove: XMLNode;
  WeatherToSet: XMLNode;
  StartTaskSequencesOnLoad: XMLNode;
  ReferenceCoords: Vector3;
  Placement: Placement[];
}

export interface Placement {
  ModelHash: XMLNode;
  Type: XMLNode;
  Dynamic: XMLNode;
  HashName: XMLNode;
  InitialHandle: XMLNode;
  ObjectProperties?: {
    TextureVariation: XMLNode;
  }
  OpacityLevel: XMLNode;
  LodDistance: XMLNode;
  IsVisible: XMLNode;
  MaxHealth: XMLNode;
  Health: XMLNode;
  IsOnFire: XMLNode;
  IsInvincible: XMLNode;
  IsBulletProof: XMLNode;
  IsCollisionProof: XMLNode;
  IsExplosionProof: XMLNode;
  IsFireProof: XMLNode;
  IsMeleeProof: XMLNode;
  IsOnlyDamagedByPlayer: XMLNode;
  PositionRotation: PositionRotation;
  Attachment: {
    _isAttached: XMLNode;
  }
  VehicleProperties?: MenyooVehicleXML;
}

export interface ObjectProperties {
  TextureVariation: XMLNode;
}

export interface PositionRotation {
  X: XMLNode;
  Y: XMLNode;
  Z: XMLNode;
  Pitch: XMLNode;
  Roll: XMLNode;
  Yaw: XMLNode;
}

export interface MenyooVehicleXML {
  Colours: Colours;
  Livery: XMLNode;
  NumberPlateText: XMLNode;
  NumberPlateIndex: XMLNode;
  WheelType: XMLNode;
  WheelsInvisible: XMLNode;
  EngineSoundName: XMLNode;
  WindowTint: XMLNode;
  BulletProofTyres: XMLNode;
  DirtLevel: XMLNode;
  PaintFade: XMLNode;
  RoofState: XMLNode;
  SirenActive: XMLNode;
  EngineOn: XMLNode;
  EngineHealth: XMLNode;
  LightsOn: XMLNode;
  IsRadioLoud: XMLNode;
  Neons: Neons;
  DoorsOpen: Doors;
  DoorsBroken: Doors;
  TyresBursted: TyresBursted;
  ModExtras: Record<string, XMLNode>;
  Mods: Record<string, XMLNode>
}

export interface Colours {
  Primary: XMLNode;
  Secondary: XMLNode;
  Pearl: XMLNode;
  Rim: XMLNode;
  Mod1_a: XMLNode;
  Mod1_b: XMLNode;
  Mod1_c: XMLNode;
  Mod2_a: XMLNode;
  Mod2_b: XMLNode;
  IsPrimaryColourCustom: XMLNode;
  IsSecondaryColourCustom: XMLNode;
  tyreSmoke_R: XMLNode;
  tyreSmoke_G: XMLNode;
  tyreSmoke_B: XMLNode;
  LrInterior: XMLNode;
  LrDashboard: XMLNode;
}

export interface Doors {
  BackLeftDoor: XMLNode;
  BackRightDoor: XMLNode;
  FrontLeftDoor: XMLNode;
  FrontRightDoor: XMLNode;
  Hood: XMLNode;
  Trunk: XMLNode;
  Trunk2: XMLNode;
}

export interface Neons {
  Left: XMLNode;
  Right: XMLNode;
  Front: XMLNode;
  Back: XMLNode;
  R: XMLNode;
  G: XMLNode;
  B: XMLNode;
}

export interface TyresBursted {
  FrontLeft: XMLNode;
  FrontRight: XMLNode;
  BackLeft: XMLNode;
  BackRight: XMLNode;
  [id: string]: XMLNode
}

export function convertCustomVehicle (data: MenyooCustomXML): StandCustomVehicle {
  let basePlacement: Placement | null = null
  const objects: Entity[] = []
  for (const placement of data.Placement) {
    if (placement.Type._text === '2') {
      basePlacement = placement
      continue
    }

    objects.push({
      model: parseInt(placement.ModelHash._text, 16),
      name: placement.HashName._text,
      offset: {
        x: parseFloat(placement.PositionRotation.X._text),
        y: parseFloat(placement.PositionRotation.Y._text),
        z: parseFloat(placement.PositionRotation.Z._text)
      },
      rotation: {
        x: parseFloat(placement.PositionRotation.Pitch._text),
        y: parseFloat(placement.PositionRotation.Roll._text),
        z: parseFloat(placement.PositionRotation.Yaw._text)
      }
    })
  }

  if (!basePlacement) {
    throw new Error('Could not find a valid base vehicle')
  }

  return {
    version: CUSTOM_VEHICLE_VERSION,
    base: {
      invisible: false,
      model: parseInt(basePlacement.ModelHash._text, 16),
      savedata: basePlacement.VehicleProperties
        ? convertVehicle(basePlacement.VehicleProperties, basePlacement.HashName._text, parseInt(basePlacement.ModelHash._text, 16))
        : undefined
    },
    objects
  }
}

export function convertVehicle (data: MenyooVehicleXML, vehName: string, modelId: number): StandVehicle {
  const Toggles: Record<string, boolean> = {}
  const Mods: Record<string, number> = {}
  for (const modId in data.Mods) {
    const id = parseInt(modId[1])
    const mod = Mod[id]
    if (data.Mods[modId]._text === 'true' || data.Mods[modId]._text === 'false') {
      Toggles[mod] = data.Mods[modId]._text === 'true'
    } else {
      Mods[mod] = parseInt(data.Mods[modId]._text)
    }
  }
  return {
    Format: VEHICLE_VERSION,
    Model: modelId,
    Colors: {
      Primary: {
        Custom: false,
        'Paint Type': parseInt(data.Colours.Primary._text),
        Color: parseInt(data.Colours.Primary._text),
        'Pearlescent Color': parseInt(data.Colours.Pearl._text)
      },
      Secondary: {
        Custom: false,
        'Paint Type': parseInt(data.Colours.Primary._text),
        Color: parseInt(data.Colours.Primary._text)
      },
      'Paint Fade': parseInt(data.PaintFade._text),
      'Color Combo': -1,
      Vehicle: {
        // r:
        Primary: parseInt(data.Colours.Primary._text),
        Secondary: parseInt(data.Colours.Secondary._text),
        r: 0,
        g: 0,
        b: 0
      },
      Extras: {
        pearlescent: parseInt(data.Colours.Pearl._text),
        wheel: parseInt(data.Colours.Rim._text)
      }
    },
    Livery: {
      Count: -1,
      Style: -1
    },
    'Dirt Level': parseInt(data.DirtLevel._text),
    Name: vehName,
    'License Plate': {
      Text: data.NumberPlateText._text,
      Type: parseInt(data.NumberPlateIndex._text)
    },
    'Window Tint': parseInt(data.WindowTint._text),
    'Bulletproof Tires': data.BulletProofTyres._text === 'true',
    'Engine Running': data.EngineOn._text === 'true',
    'Tire Smoke': {
      r: parseInt(data.Colours.tyreSmoke_R._text),
      g: parseInt(data.Colours.tyreSmoke_G._text),
      b: parseInt(data.Colours.tyreSmoke_B._text)
    },
    'Interior Color': parseInt(data.Colours.LrInterior._text),
    'Dashboard Color': parseInt(data.Colours.LrDashboard._text),
    Lights: {
      'Xenon Color': -1,
      Neon: {
        Left: data.Neons.Left._text === 'true',
        Right: data.Neons.Right._text === 'true',
        Front: data.Neons.Front._text === 'true',
        Back: data.Neons.Back._text === 'true',
        Color: {
          r: parseInt(data.Neons.R._text),
          g: parseInt(data.Neons.G._text),
          b: parseInt(data.Neons.B._text)
        }
      }
    },
    Mods: {
      ...Mods,
      Toggles
    }
  }
}
