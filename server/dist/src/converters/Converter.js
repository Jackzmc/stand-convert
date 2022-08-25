import { xml2json } from 'xml-js';
import Ini from 'ini';
import * as menyoo from './menyoo';
import nullifyCustom from './custom/nullifyCustom';
import iniCustom from './custom/iniCustom';
export var ConverterType;
(function (ConverterType) {
    ConverterType["Nullify"] = "Nullify";
    ConverterType["Menyoo"] = "Menyoo";
    ConverterType["Ini"] = "IniFile";
})(ConverterType || (ConverterType = {}));
export default class Converter {
    fromXML(input) {
        return JSON.parse(xml2json(input, { compact: true }));
    }
    convert(input) {
        const xmlResult = this.convertXML(input);
        if (xmlResult)
            return xmlResult;
        const iniResult = this.convertIni(input);
        if (iniResult)
            return iniResult;
        return null;
    }
    convertIni(input) {
        const iniObject = Ini.parse(input);
        const result = iniCustom(iniObject);
        if (result) {
            return {
                vehicle: result,
                type: ConverterType.Ini
            };
        }
        return null;
    }
    convertXML(input) {
        try {
            const xml = this.fromXML(`<root>${input}</root>`);
            if (xml.root.SpoonerPlacements) {
                return { vehicle: menyoo.convertCustomVehicle(xml.root.SpoonerPlacements), type: ConverterType.Menyoo };
            }
            else if (xml.root.Vehicle) {
                const root = xml.root.Vehicle;
                return {
                    vehicle: menyoo.convertVehicle(root.VehicleProperties, 'default', parseInt(root.ModelHash._text, 16)),
                    type: ConverterType.Menyoo
                };
            }
            else if (xml.root.Base) {
                return { vehicle: nullifyCustom(xml.root), type: ConverterType.Nullify };
            }
            return null;
        }
        catch {
            // Is not valid xml
            return null;
        }
    }
    static tryConvert(converter, str) {
        try {
            return converter(str);
        }
        catch (e) {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnZlcnRlcnMvQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDakMsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBRXJCLE9BQU8sS0FBSyxNQUFNLE1BQU0sVUFBVSxDQUFBO0FBQ2xDLE9BQU8sYUFBb0MsTUFBTSx3QkFBd0IsQ0FBQTtBQUV6RSxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQTtBQU0xQyxNQUFNLENBQU4sSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3ZCLG9DQUFtQixDQUFBO0lBQ25CLGtDQUFpQixDQUFBO0lBQ2pCLGdDQUFlLENBQUE7QUFDakIsQ0FBQyxFQUpXLGFBQWEsS0FBYixhQUFhLFFBSXhCO0FBT0QsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQzVCLE9BQU8sQ0FBRSxLQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsT0FBTyxDQUFFLEtBQWE7UUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4QyxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQTtRQUUvQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLElBQUksU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFBO1FBRS9CLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELFVBQVUsQ0FBRSxLQUFhO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbEMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ25DLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTztnQkFDTCxPQUFPLEVBQUUsTUFBTTtnQkFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUc7YUFDeEIsQ0FBQTtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsVUFBVSxDQUFFLEtBQWE7UUFDdkIsSUFBSTtZQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBNEMsQ0FBQTtZQUM1RixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQTJDLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFBO2FBQ2xJO2lCQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBNEMsQ0FBQTtnQkFDbEUsT0FBTztvQkFDTCxPQUFPLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FDNUIsSUFBSSxDQUFDLGlCQUE0QyxFQUNqRCxTQUFTLEVBQ1QsUUFBUSxDQUFFLElBQUksQ0FBQyxTQUFxQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDaEQ7b0JBQ0QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO2lCQUMzQixDQUFBO2FBQ0Y7aUJBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDeEIsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLElBQXlCLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQzlGO1lBQ0QsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUFDLE1BQU07WUFDTixtQkFBbUI7WUFFbkIsT0FBTyxJQUFJLENBQUE7U0FDWjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFFLFNBQWdELEVBQUUsR0FBVztRQUM5RSxJQUFJO1lBQ0YsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDdEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBQ0YifQ==