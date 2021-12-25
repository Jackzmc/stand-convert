<template>
<div class="full-height">
  <textarea v-model="meta.content" class="input textarea" style="height:90%" />
  <br>
  <div :class="['file', {'has-name': meta.name}]">
    <label class="file-label">
      <input
        class="file-input"
        type="file"
        name="file"
        @change="onFileChange"
        accept="application/xml"
      />
      <span class="file-cta">
        <span class="file-icon">
            <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
            Choose a file…
        </span>
      </span>
      <span class="file-name" v-if="meta.name">
          {{meta.name}}
        </span>
    </label>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface VueData {
  meta: {
    name: string | null,
    content?: string | null
  }
}

export default defineComponent({
  name: 'Input-Modal',
  components: {

  },
  data (): VueData {
    return {
      meta: {
        name: null,
        content: null
      }
    }
  },
  watch: {
    'meta.content': function () {
      this.$emit('content', {
        name: this.meta.name,
        content: this.meta.content
      })
    }
  },
  methods: {
    addFile (file: File) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.addEventListener('load', () => {
        this.meta = {
          name: file.name,
          content: reader.result?.toString()
        }
      })
    },
    onFileChange (event: Event) {
      // TODO: Figure out the logic for file
      // console.log(target.files[0])
      const target = event.target as HTMLInputElement
      if (target && target.files) {
        this.addFile(target.files[0])
      }
    }
  }
})
</script>
