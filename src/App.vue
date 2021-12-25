<template>
  <div class="container full-height">
    <div class="columns full-height">
      <div class="column full-height">
        <InputModal @content="onInput" />
      </div>
      <div class="column full-height">
        <OutputModal :name="inputFile.name" :content="inputFile.content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputModal from '@/components/InputModal.vue'
import OutputModal from '@/components/OutputModal.vue'

interface VueData {
  inputFile: {
    name: string | null,
    content?: string | null
  }
}

export default defineComponent({
  name: 'App',
  components: {
    InputModal,
    OutputModal
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
    onInput (data: unknown) {
      console.log('inp[', data)
      this.inputFile = data as {
        name: string | null,
        content?: string | null
      }
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
