<template>
<div class="full-height">
  <textarea readonly class="input textarea readonly" style="height:90%">{{ prettyOutput }}</textarea>
  <br>
  <div class="columns">
    <div class="column">
      <div class="field has-addons">
        <div class="control">
          <input type="text" class="input" v-model="replacedName" />
        </div>
        <div class="control">
          <a class="button is-info" @click="download">Download</a>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <p class="is-pulled-right" v-if="output">
        <b>Detected Source:</b> {{output.type}}
      </p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Converter, { ConvertResult } from '../converters/Converter'

const converter = new Converter()

export default defineComponent({
  name: 'Output-Modal',
  props: {
    name: String,
    content: String
  },
  data () {
    return {
      overwriteName: ''
    }
  },
  methods: {
    download () {
      if (!this.output || !this.replacedName) return
      downloadFile(this.replacedName, this.output)
    }
  },
  computed: {
    output (): ConvertResult | null{
      if (!this.content) return null

      return converter.convert(this.content)
    },
    prettyOutput (): string {
      if (!this.output) return ''

      try {
        return JSON.stringify(this.output.vehicle, null, 2)
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
