import { xml2json } from 'xml-js'

export interface XMLNode {
  _text: string
}

export default class Converter {
  fromXML (input: string): Record<string, unknown> {
    return JSON.parse(xml2json(input, { compact: true }))
  }
}
