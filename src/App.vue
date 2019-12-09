<template>
  <div id="app">
    <Header :loading="$store.state.loading" />
    <TextInput
      v-model="regex"
      placeholder="Regex"
    />
    <WordList :words="$store.state.words" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import TextInput from './components/TextInput.vue';
import WordList from './components/WordList.vue';

export default {
  components: {
    Header,
    TextInput,
    WordList,
  },
  computed: {
    regex: {
      get() {
        return this.$store.state.regex;
      },
      set(value) {
        this.$store.commit('setRegex', value);
      },
    },
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
