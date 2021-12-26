import { xml2json } from 'xml-js'
import * as menyoo from './menyoo'
import nullifyCustom, { NullifyXMLVehicle } from './custom/nullifyCustom'
import { StandCustomVehicle, StandVehicle } from './Stand.js'

export interface XMLNode {
  _text: string
}

export enum ConverterType {
  Nullify = 'Nullify',
  Menyoo = 'Menyoo'
}

export interface ConvertResult {
  vehicle: StandCustomVehicle | StandVehicle,
  type: ConverterType
}

export default class Converter {
  fromXML (input: string): Record<string, unknown> {
    return JSON.parse(xml2json(input, { compact: true }))
  }

  convert (input: string): ConvertResult | null {
    try {
      const xml = this.fromXML(`<root>${input}</root>`) as Record<string, Record<string, unknown>>
      if (xml.root.SpoonerPlacements) {
        console.debug('is menyoo custom')
        return { vehicle: menyoo.convertCustomVehicle(xml.root.SpoonerPlacements as menyoo.MenyooCustomXML), type: ConverterType.Menyoo }
      } else if (xml.root.Vehicle) {
        console.debug('is menyoo vehicle')
        const root = xml.root.Vehicle as Record<string, unknown | XMLNode>
        return {
          vehicle: menyoo.convertVehicle(
            root.VehicleProperties as menyoo.MenyooVehicleXML,
            'default',
            parseInt((root.ModelHash as XMLNode)._text, 16)
          ),
          type: ConverterType.Menyoo
        }
      } else if (xml.root.Base) {
        console.debug('is nullify vehicle')
        return { vehicle: nullifyCustom(xml.root as NullifyXMLVehicle), type: ConverterType.Nullify }
      }
      return null
    } catch {
      // Is not valid xml
      return null
    }
  }

  static tryConvert (converter: (input: string) => StandCustomVehicle, str: string): StandCustomVehicle | null {
    try {
      return converter(str)
    } catch (e) {
      return null
    }
  }
}
