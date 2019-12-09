<template>
  <div id="app">
    <Stats
      :loading="$store.state.loading"
      :loadTime="$store.state.loadTime"
      :results="$store.state.filtered.length"
      :total="$store.state.words.length"
    />
    <TextInput
      v-model="regex"
      placeholder="Regex"
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

#app {
  display: flex;
  flex-direction: column;
}
</style>
