<template>
  <div>
    {{ loading ? "wait" : "done" }}
    {{ loadTime }}
    {{ results }}
    {{ total }}
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
    loadTime: { type: Number, required: true },
    results: { type: Number, required: true },
    total: { type: Number, required: true },
  },
};
</script>

<style scoped lang="less">
@import "../assets/variables.less";
</style>
