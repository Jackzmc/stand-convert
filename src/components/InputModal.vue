<template>
<div>
  <textarea v-model="input" class="input textarea" />
  <div class="file">
    <label class="file-label">
      <input class="file-input" type="file" name="file" @change="onFileChange">
      <span class="file-cta">
      <span class="file-icon">
          <i class="fas fa-upload"></i>
      </span>
      <span class="file-label">
          Choose a file…
      </span>
      </span>
    </label>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface VueData {
    file: unknown | null,
    meta: {
        name: string | null,
        content: string | null
    }
}

export default defineComponent({
  name: 'Input-Modal',
  components: {

  },
  data (): VueData {
    return {
      file: null,
      meta: {
        name: null,
        content: null
      }
    }
  },
  methods: {
    addFile(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.meta = {
          name: file.name,
          content: reader.result?.toString()
        }
      })
    },
    onFileChange(event) {
      // TODO: Figure out the logic for file
      this.addFile(event.target)
    }
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
