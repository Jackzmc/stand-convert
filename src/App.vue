<template>
  <div class="container full-height">
    <div class="columns full-height">
      <div class="column full-height">
        <InputModal />
      </div>
      <div class="column full-height">
        <textarea v-model="prettyOutput" class="input textarea" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputModal from '@/components/InputModal.vue'

import NullifyConverter from '@/converters/custom/nullify'
import { StandCustomVehicle } from './converters/Stand'
const data = '<Object0>  <posx>0</posx>  <posy>-5</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object0> <Object1>  <posx>0</posx>  <posy>-17</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object1> <Object2>  <posx>0</posx>  <posy>-28</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object2> <Object3>  <posx>0</posx>  <posy>-4</posy>  <posz>5</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object3> <Base>  <count>5</count>  <basehash>-233098306</basehash> </Base> <Object4>  <posx>0</posx>  <posy>-14</posy>  <posz>5</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object4>'

interface VueData {
  inputFile: {
    name: string | null,
    content?: string | null
  }
}

export default defineComponent({
  name: 'App',
  components: {
    InputModal
  },
  data (): VueData {
    return {
      inputFile: {
        name: null,
        content: null
      }
    }
  },
  methods: {
  },
  computed: {
    output (): StandCustomVehicle | null {
      return this.inputFile.content ? NullifyConverter(this.inputFile.content) : null
    },
    prettyOutput (): string {
      return JSON.stringify(this.output, null, 2)
    }
  }
})
</script>

<style>
html, body {
    height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
.full-height {
  height: 100%;
}
.textarea {
  height: 90%;
}
</style>
