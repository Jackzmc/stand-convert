/* eslint-disable no-use-before-define */
import Converter, { XMLNode } from '../Converter'
import { VERSION, StandCustomVehicle, Vector3, Entity } from '../Stand'

/* eslint-disable camelcase */
export interface MenyooXML {
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
  VehicleProperties?: VehicleProperties;
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

export interface VehicleProperties {
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

export default function (data: MenyooXML): StandCustomVehicle {
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
    version: VERSION,
    base: {
      invisible: false,
      model: parseInt(basePlacement.ModelHash._text, 16),
      savedata: undefined
    },
    objects
  }
}
