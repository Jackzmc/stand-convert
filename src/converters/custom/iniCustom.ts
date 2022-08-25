/* eslint-disable eqeqeq, dot-notation */
// Eslint rules fucking suck by default vue
import Ini from 'ini'
import { CUSTOM_VEHICLE_VERSION, StandCustomVehicle, StandVehicle, VEHICLE_VERSION } from '../Stand'

export default function (data: Record<string, any>): StandCustomVehicle | null {
  const objects = []
  let objectIndex = 1
  while (data[`Attached Vehicle ${objectIndex}`]) {
    const objData = data[`Attached Vehicle ${objectIndex}`]
    objects.push({
      model: objData['model'],
      offset: {
        x: objData['x offset'],
        y: objData['y offset'],
        z: objData['z offset']
      },
      rotation: {
        x: objData['pitch'],
        y: objData['roll'],
        z: objData['yaw']
      },
      name: objData['model name']
    })
    objectIndex++
  }

  return {
    version: CUSTOM_VEHICLE_VERSION,
    base: {
      invisible: false,
      model: parseInt(data.Vehicle['model']),
      savedata: convertVehicle(data) ?? undefined
    },
    objects
  }
}

export function convertVehicle (data: Record<string, any>, filename?: string): StandVehicle | null {
  return {
    Model: data.Vehicle.model,
    Name: filename ?? 'Ini Vehicle',
    Format: VEHICLE_VERSION,
    'Dirt Level': data.Vehicle['dirt level'],
    'Window Tint': Number(data.Vehicle['window tint']),
    // 'Interior Color': data.Vehicle['']
    'Bulletproof Tires': data.Vehicle['bulletproof tyres'] == '1',
    'License Plate': {
      Type: Number(data.Vehicle['plate index']),
      Text: data.Vehicle['plate text']
    },
    Lights: {
      'Xenon Color': 0,
      Neon: {
        Color: {
          r: Number(data.Vehicle['neon red']),
          g: Number(data.Vehicle['neon green']),
          b: Number(data.Vehicle['neon blue'])
        },
        Left: data.Vehicle['neon 0'] == '1',
        Right: data.Vehicle['neon 1'] == '1',
        Front: data.Vehicle['neon 2'] == '1',
        Back: data.Vehicle['neon 3'] == '1'
      }
    },
    'Engine Running': false,
    'Interior Color': 0,
    'Dashboard Color': 0,
    'Tire Smoke': {
      r: Number(data.Vehicle['tyre smoke red']),
      g: Number(data.Vehicle['tyre smoke green']),
      b: Number(data.Vehicle['tyre smoke blue'])
    },
    Colors: {
      Vehicle: {
        Primary: Number(data.Vehicle['primary paint']),
        Secondary: Number(data.Vehicle['secondary paint']),
        r: 0,
        g: 0,
        b: 0
      },
      Primary: {
        Custom: Number(data.Vehicle['custom primary paint']) > 0,
        'Paint Type': Number(data.Vehicle['primary paint']),
        'Pearlescent Color': Number(data.Vehicle['pearlescent colour']),
        Color: Number(data.Vehicle['custom primary paint'])
      },
      Secondary: {
        Custom: Number(data.Vehicle['custom secondary paint']) > 0,
        'Paint Type': Number(data.Vehicle['secondary paint']),
        Color: Number(data.Vehicle['custom secondary paint'])
      },
      Extras: {
        wheel: Number(data.Vehicle['wheel colour'])
      }
    },
    /* eslint-disable quote-props */
    Mods: {
      'Spoilers': data['Vehicle Mods']['0'],
      'Front Bumper': data['Vehicle Mods']['1'],
      'Rear Bumper': data['Vehicle Mods']['2'],
      'Side Skirt': data['Vehicle Mods']['3'],
      'Exhaust': data['Vehicle Mods']['4'],
      'Frame': data['Vehicle Mods']['5'],
      'Grille': data['Vehicle Mods']['6'],
      'Hood': data['Vehicle Mods']['7'],
      'Fender': data['Vehicle Mods']['8'],
      'Right Fender': data['Vehicle Mods']['9'],
      'Roof': data['Vehicle Mods']['10'],
      'Engine': data['Vehicle Mods']['11'],
      'Brakes': data['Vehicle Mods']['12'],
      'Transmission': data['Vehicle Mods']['13'],
      'Horns': data['Vehicle Mods']['14'],
      'Suspension': data['Vehicle Mods']['15'],
      'Armor': data['Vehicle Mods']['16'],
      'Wheels Design': data['Vehicle Mods']['23'],
      'Motorcycle Back Wheel Design': data['Vehicle Mods']['24'],
      'Plate Holders': data['Vehicle Mods']['25'],
      'Trim Design': data['Vehicle Mods']['27'],
      'Ornaments': data['Vehicle Mods']['28'],
      'Dial Design': data['Vehicle Mods']['30'],
      'Steering Wheel': data['Vehicle Mods']['33'],
      'Shifter Leavers': data['Vehicle Mods']['34'],
      'Plaques': data['Vehicle Mods']['35'],
      'Hydraulics': data['Vehicle Mods']['38'],
      'Livery': data['Vehicle Mods']['48'],
      Toggles: {
        'Turbo Turning': data['Vehicle Toggles']['18'],
        'Xenon Headlights': data['Vehicle Toggles']['22'],
        'Tire Smoke': data['Vehicle Toggles']['20'],
        'UNK17': data['Vehicle Toggles']['17'],
        'UNK19': data['Vehicle Toggles']['19'],
        'UNK21': data['Vehicle Toggles']['21']
      }
    }
  }
}
