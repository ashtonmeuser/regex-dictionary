<template>
  <div id="app">
    <TextInput
      v-model="regex"
      placeholder="Regular Expression"
    />
    <Stats
      :load-time="$store.state.loadTime"
      :matches="$store.state.filtered.length"
      :total="$store.state.words.length"
    />
    <WordList :words="$store.state.filtered" />
  </div>
</template>

<script>
import Stats from './components/Stats.vue';
import TextInput from './components/TextInput.vue';
import WordList from './components/WordList.vue';

export default {
  components: {
    Stats,
    TextInput,
    WordList,
  },
  computed: {
    regex: {
      get() {
        return this.$store.state.regex;
      },
      set(value) {
        this.$store.dispatch('filterWords', value);
      },
    },
  },
  created() {
    this.$store.dispatch('fetchWords');
  },
};
</script>

<style lang="less">
@import "./assets/variables.less";

body {
  color: @primary-text-color;
  margin: 0;
  padding: 0;
  #app {
    max-width: 900px;
    margin: 0 auto;
    height: 100vh;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
  }
}
</style>
