import { xml2json } from 'xml-js'
import menyooCustom, { MenyooXML } from './custom/menyooCustom'
import nullifyCustom, { NullifyXMLVehicle } from './custom/nullifyCustom'
import { StandCustomVehicle } from './Stand.js'

export interface XMLNode {
  _text: string
}

export enum ConverterType {
  Nullify = 'Nullify',
  Menyoo = 'Menyoo'
}

export interface ConvertResult {
  vehicle: StandCustomVehicle,
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
        return { vehicle: menyooCustom(xml.root.SpoonerPlacements as MenyooXML), type: ConverterType.Menyoo }
      } else if (xml.root.Base) {
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
