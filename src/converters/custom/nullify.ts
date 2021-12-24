import Converter, { XMLNode } from '../Converter'
import { VERSION, StandCustomVehicle, Entity } from '../Stand'

interface NullifyXMLObject {
  posx: XMLNode
  posy: XMLNode
  posz: XMLNode
  pitch: XMLNode
  yaw: XMLNode
  roll: XMLNode
  visible: XMLNode
  hash: XMLNode
}

type NullifyXMLVehicle = Record<string, NullifyXMLObject> & {
  Base: {
    count: XMLNode,
    basehash: XMLNode
  },
}

export default function (inputString: string): StandCustomVehicle {
  const converter = new Converter()
  const data = (converter.fromXML(`<root>${inputString}</root>`).root) as NullifyXMLVehicle
  const objects: Entity[] = Object.keys(data)
    .filter(key => key.startsWith('Object'))
    .map(key => {
      return {
        offset: {
          x: parseFloat(data[key].posx._text),
          y: parseFloat(data[key].posy._text),
          z: parseFloat(data[key].posz._text)
        },
        model: parseInt(data[key].hash._text, 16),
        name: undefined,
        rotation: {
          x: parseFloat(data[key].pitch._text),
          y: parseFloat(data[key].yaw._text),
          z: parseFloat(data[key].roll._text)
        }
      }
    })

  return {
    version: VERSION,
    base: {
      invisible: false,
      model: parseInt(data.Base.basehash._text),
      savedata: undefined
    },
    objects
  }
}
