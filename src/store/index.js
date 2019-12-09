import Vue from 'vue';
import Vuex from 'vuex';

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
  },
  actions: {
  },
});
