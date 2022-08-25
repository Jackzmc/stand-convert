<template>
  <div class="container" style="height: 50%">
    <div class="content">
      <h4 class="title is-4">Convert Custom Vehicles to Jackz Custom Vehicles</h4>
      <p class="subtitle is-6">Currently supported sources:</p>
      <ul>
        <li>Nullify</li>
        <li>Menyoo* <em>vehicle properties are not 100% correct</em></li>
        <li>Some random type of Ini</li>
      </ul>
    </div>
    <div class="columns full-height">
      <div class="column full-height">
        <InputModal @content="onInput" />
      </div>
      <div class="column full-height">
        <OutputModal :name="inputFile.name" :content="inputFile.content" />
      </div>
    </div>
    <br>
    <template v-for="log in changelog" :key="log.version">
      <div class="box content">
        <b>Version {{log.version}}</b>
        <template v-if="log.notes">
          <p>Notes:</p>
          <ul>
            <li v-for="entry in log.notes" :key="entry">{{entry}}</li>
          </ul>
        </template>
        <template v-if="log.changes">
          <p>Changes:</p>
          <ul>
            <li v-for="entry in log.changes" :key="entry">{{entry}}</li>
          </ul>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputModal from '@/components/InputModal.vue'
import OutputModal from '@/components/OutputModal.vue'

interface VersionData {
  version: string,
  changes?: string[]
  notes?: string[]
}

interface VueData {
  inputFile: {
    name: string | null,
    content?: string | null
  },
  changelog: VersionData[]
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
      },
      changelog: []
    }
  },
  methods: {
    onInput (data: unknown) {
      this.inputFile = data as {
        name: string | null,
        content?: string | null
      }
    }
  },
  computed: {
    version () {
      return process.env?.VUE_APP_VERSION
    }
  },
  async created () {
    fetch('/changelog.json')
      .then(res => res.json())
      .then(json => {
        this.changelog = json
      })
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
  margin-top: 10px;
  height: 100%;
}
.full-height {
  height: 100%;
}
.textarea {
  height: 90%;
}
</style>
