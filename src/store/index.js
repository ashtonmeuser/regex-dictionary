import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import WebWorker from '../WebWorker';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    regex: '',
    worker: null,
    words: [],
    filtered: [],
    loadTime: 0,
  },
  mutations: {
    setRegex(state, regex) {
      state.regex = regex;
      state.loading = true;
    },
    setWords(state, words) {
      state.words = words;
    },
    setFiltered(state, { filtered, loadTime }) {
      state.filtered = filtered;
      state.loadTime = loadTime || NaN;
      state.loading = false;
    },
    setWorker(state, worker) {
      state.worker = worker;
    },
  },
  actions: {
    async fetchWords({ state, commit, dispatch }) {
      try {
        const { data } = await Axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt');
        const words = data.split('\n').filter((x) => x !== '');
        commit('setWords', words);
        dispatch('filterWords', state.regex);
      } catch (error) { /* FIXME: Handle error */ }
    },
    async filterWords({ state, commit }, regex) {
      if (state.worker) state.worker.terminate(); // Terminate existing worker
      commit('setRegex', regex);
      try {
        const startTime = new Date();
        const worker = new WebWorker((w, r, m = false) => { // Default to using RegExp.test()
          if (m) return w.filter((x) => x.match(r)); // Use String.match method
          const p = RegExp(r);
          return w.filter((x) => p.test(x));
        });
        commit('setWorker', worker);
        const filtered = await state.worker.run(state.words, regex);
        const loadTime = new Date() - startTime;
        commit('setFiltered', { filtered, loadTime });
      } catch (error) {
        commit('setFiltered', { filtered: [] });
      }
    },
  },
});
