import { CUSTOM_VEHICLE_VERSION, VEHICLE_VERSION } from '../Stand';
export default function (data) {
    const objects = [];
    let objectIndex = 1;
    while (data[`Attached Vehicle ${objectIndex}`]) {
        const objData = data[`Attached Vehicle ${objectIndex}`];
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
        });
        objectIndex++;
    }
    return {
        version: CUSTOM_VEHICLE_VERSION,
        base: {
            invisible: false,
            model: parseInt(data.Vehicle['model']),
            savedata: convertVehicle(data) ?? undefined
        },
        objects
    };
}
export function convertVehicle(data, filename) {
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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pQ3VzdG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnZlcnRlcnMvY3VzdG9tL2luaUN1c3RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsc0JBQXNCLEVBQW9DLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVwRyxNQUFNLENBQUMsT0FBTyxXQUFXLElBQXlCO0lBQ2hELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7SUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLFdBQVcsRUFBRSxDQUFDLEVBQUU7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDWCxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN2QixNQUFNLEVBQUU7Z0JBQ04sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQ3RCLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUN0QixDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQzthQUN2QjtZQUNELFFBQVEsRUFBRTtnQkFDUixDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQ2xCO1lBQ0QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDNUIsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxFQUFFLENBQUE7S0FDZDtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLElBQUksRUFBRTtZQUNKLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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