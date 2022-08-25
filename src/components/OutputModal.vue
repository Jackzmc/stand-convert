<template>
<div class="full-height">
  <textarea readonly class="input textarea readonly" style="height:90%" v-model="prettyOutput"></textarea>
  <br>
  <div class="columns">
    <div class="column">
      <div class="field has-addons">
        <div class="control">
          <input type="text" class="input" v-model="replacedName" />
        </div>
        <div class="control">
          <a :class="['button','is-info']" @click="download">Download</a>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <p class="is-pulled-right" v-if="source">
        <b>Detected Source:</b> {{source}}
      </p>
    </div>
  </div>
  <p>Place downloaded file in <b>%appdata%\Stand\Vehicles\Custom</b></p>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Converter, { ConverterType } from '../converters/Converter'
import { StandCustomVehicle, StandVehicle } from '../converters/Stand'

const converter = new Converter()

interface VueData {
  overwriteName: string,
  vehicleData: StandCustomVehicle | StandVehicle | null,
  source: ConverterType | null
}

export default defineComponent({
  name: 'Output-Modal',
  props: {
    name: String,
    content: String
  },
  data (): VueData {
    return {
      overwriteName: '',
      vehicleData: null,
      source: null
    }
  },
  methods: {
    download () {
      if (!this.vehicleData || !this.replacedName) return
      downloadFile(this.replacedName, this.vehicleData)
    }
  },
  watch: {
    content: function () {
      if (!this.content) return
      const convert = converter.convert(this.content)
      if (convert) {
        this.source = convert.type
        this.vehicleData = convert.vehicle
      }
    }
  },
  computed: {
    prettyOutput (): string {
      if (!this.vehicleData && this.content) {
        return '<Invalid or unsupported input source>'
      }

      try {
        return JSON.stringify(this.vehicleData, null, 2)
      } catch (err) {
        return (err as Error).message
      }
    },
    replacedName () {
      if (!this.content) return null
      if (this.overwriteName) return this.overwriteName
      if (!this.name) return `stand-vehicle-${Date.now()}.json`

      const name = this.name?.replace(/.xml$/, '.json')
      if (!name.endsWith('.json')) return `${name}.json`
      return name
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function downloadFile (filename: string, data: any) {
  const pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)))
  pom.setAttribute('download', filename)
  pom.style.display = 'none'
  document.body.appendChild(pom)
  pom.click()
  document.body.removeChild(pom)
}
</script>
