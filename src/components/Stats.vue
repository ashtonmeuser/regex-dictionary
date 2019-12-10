<template>
  <div class="stats">
    <div
      v-for="s in stats"
      :key="s.key"
      :value="s.value"
      class="stat"
    >
      <div class="value">
        {{ s.value }}
      </div>
      <div class="key">
        {{ s.key }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadTime: { type: Number, required: true },
    matches: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  computed: {
    stats() {
      return [
        { key: 'Load Time', value: `${(this.loadTime / 1000).toFixed(3)}s` },
        { key: 'Matches', value: this.matches.toLocaleString() },
        { key: 'Total', value: this.total.toLocaleString() },
        { key: 'Percent', value: (this.matches / this.total * 100).toFixed(3) },
      ];
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/variables.less";

.stats {
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  .stat {
    @media ( max-width: 500px ) {
      flex-basis: calc(50% - 10px);
    }
    margin: 5px;
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
    .value {
      font-weight: bold;
      font-size: 1.2em;
    }
    .key {
      color: @secondary-text-color;
    }
  }
}
</style>
