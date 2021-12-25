<template>
<div class="full-height">
  <textarea readonly class="input textarea readonly" style="height:90%">{{ prettyOutput }}</textarea>
  <br>
  <div class="field has-addons">
    <div class="control">
      <input type="text" class="input" v-model="replacedName" />
    </div>
    <div class="control">
      <a class="button is-info" @click="download">Download</a>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { StandCustomVehicle } from '@/converters/Stand.js'
import { defineComponent } from 'vue'
import NullifyConverter from '@/converters/custom/nullify'

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
      if (!this.output) return
      downloadFile(this.replacedName, this.output)
    }
  },
  computed: {
    output (): StandCustomVehicle | null {
      return this.content ? NullifyConverter(this.content) : null
    },
    prettyOutput (): string {
      if (!this.output) return ''

      try {
        return JSON.stringify(this.output, null, 2)
      } catch (err) {
        return (err as Error).message
      }
    },
    replacedName () {
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
