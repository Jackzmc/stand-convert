<template>
<div>
  <textarea readonly class="input textarea readonly">
    {{prettyOutput}}
  </textarea>
 <a class="button is-info">Download</a>
</div>
</template>

<script lang="ts">
import { StandCustomVehicle } from '@/converters/Stand.js'
import { defineComponent } from 'vue'
import NullifyConverter from '@/converters/custom/nullify';

export default defineComponent({
  name: 'Output-Modal',
  props: {
    inputData: String,
    inputName: String
  },
  computed: {
    output (): StandCustomVehicle | null {
      return this.inputData ? NullifyConverter(this.inputData) : null
    },
    prettyOutput (): string {
      return JSON.stringify(this.output, null, 2)
    }
  }
})
</script>
