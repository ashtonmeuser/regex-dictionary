import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    regex: '',
    words: [],
  },
  mutations: {
    setRegex(state, regex) {
      state.regex = regex;
    },
    setWords(state, words) {
      state.words = words;
    },
  },
  actions: {
    async fetchWords({ commit }) {
      try {
        const words = await Axios.get('/words.txt');
        commit('setWords', words.data.split('\n'));
      } catch (error) { /* FIXME: Handle error */ }
    },
  },
});
