import { CUSTOM_VEHICLE_VERSION, VEHICLE_VERSION, Mod } from './Stand';
export function convertCustomVehicle(data) {
    let basePlacement = null;
    const objects = [];
    for (const placement of data.Placement) {
        if (placement.Type._text === '2') {
            basePlacement = placement;
            continue;
        }
        objects.push({
            model: parseInt(placement.ModelHash._text, 16),
            name: placement.HashName._text,
            offset: {
                x: parseFloat(placement.PositionRotation.X._text) / 100,
                y: parseFloat(placement.PositionRotation.Y._text) / 100,
                z: parseFloat(placement.PositionRotation.Z._text) / 100
            },
            rotation: {
                x: parseFloat(placement.PositionRotation.Pitch._text),
                y: parseFloat(placement.PositionRotation.Roll._text),
                z: parseFloat(placement.PositionRotation.Yaw._text)
            }
        });
    }
    if (!basePlacement) {
        throw new Error('Could not find a valid base vehicle');
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
    };
}
export function convertVehicle(data, vehName, modelId) {
    const Toggles = {};
    const Mods = {};
    for (const modId in data.Mods) {
        const id = parseInt(modId[1]);
        const mod = Mod[id];
        if (data.Mods[modId]._text === 'true' || data.Mods[modId]._text === 'false') {
            Toggles[mod] = data.Mods[modId]._text === 'true';
        }
        else {
            Mods[mod] = parseInt(data.Mods[modId]._text);
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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVueW9vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnZlcnRlcnMvbWVueW9vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQWdFLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQXVJcEksTUFBTSxVQUFVLG9CQUFvQixDQUFFLElBQXFCO0lBQ3pELElBQUksYUFBYSxHQUFxQixJQUFJLENBQUE7SUFDMUMsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFBO0lBQzVCLEtBQUssTUFBTSxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUN0QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNoQyxhQUFhLEdBQUcsU0FBUyxDQUFBO1lBQ3pCLFNBQVE7U0FDVDtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDWCxLQUFLLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzlCLE1BQU0sRUFBRTtnQkFDTixDQUFDLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRztnQkFDdkQsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUc7Z0JBQ3ZELENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHO2FBQ3hEO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3JELENB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