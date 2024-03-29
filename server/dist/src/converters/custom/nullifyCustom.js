import { CUSTOM_VEHICLE_VERSION } from '../Stand';
export default function (data) {
    const objects = Object.keys(data)
        .filter(key => key.startsWith('Object'))
        .map(key => {
        return {
            offset: {
                x: parseFloat(data[key].posx._text) / 100,
                y: parseFloat(data[key].posy._text) / 100,
                z: parseFloat(data[key].posz._text) / 100
            },
            model: parseInt(data[key].hash._text),
            name: undefined,
            rotation: {
                x: parseFloat(data[key].pitch._text),
                y: parseFloat(data[key].yaw._text),
                z: parseFloat(data[key].roll._text)
            }
        };
    });
    return {
        version: CUSTOM_VEHICLE_VERSION,
        base: {
            invisible: false,
            model: parseInt(data.Base.basehash._text),
            savedata: undefined
        },
        objects
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbGlmeUN1c3RvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb252ZXJ0ZXJzL2N1c3RvbS9udWxsaWZ5Q3VzdG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxzQkFBc0IsRUFBOEIsTUFBTSxVQUFVLENBQUE7QUFvQjdFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsSUFBdUI7SUFDOUMsTUFBTSxPQUFPLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDVCxPQUFPO1lBQ0wsTUFBTSxFQUFFO2dCQUNOLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHO2dCQUN6QyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRztnQkFDekMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUc7YUFDMUM7WUFDRCxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JDLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDcEM7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSixPQUFPO1FBQ0wsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUN6QyxRQUFRLEVBQUUsU0FBUztTQUNwQjtRQUNELE9BQU87S0FDUixDQUFBO0FBQ0gsQ0FBQyJ9