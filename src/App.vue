<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="container">
    <div class="columns">
      <div class="column">
        <textarea v-model="input" class="textarea input" rows="100" />
      </div>
      <div class="column">
        <textarea v-model="prettyOutput" class="textarea input" rows="100"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NullifyConverter from '@/converters/custom/nullify'
import { StandCustomVehicle } from './converters/Stand'
const data = '<Object0>  <posx>0</posx>  <posy>-5</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object0> <Object1>  <posx>0</posx>  <posy>-17</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object1> <Object2>  <posx>0</posx>  <posy>-28</posy>  <posz>-3</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object2> <Object3>  <posx>0</posx>  <posy>-4</posy>  <posz>5</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object3> <Base>  <count>5</count>  <basehash>-233098306</basehash> </Base> <Object4>  <posx>0</posx>  <posy>-14</posy>  <posz>5</posz>  <pitch>0</pitch>  <yaw>0</yaw>  <roll>0</roll>  <visible>1</visible>  <hash>243282660</hash> </Object4>'

interface VueData {
  input: string
}

export default defineComponent({
  name: 'App',
  components: {
  },
  data (): VueData {
    return {
      input: data
    }
  },
  computed: {
    output (): StandCustomVehicle | null {
      return this.input ? NullifyConverter(this.input) : null
    },
    prettyOutput (): string {
      return JSON.stringify(this.output, null, 2)
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
