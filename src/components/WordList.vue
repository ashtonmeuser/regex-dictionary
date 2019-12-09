<template>
  <ol>
    <li
      v-for="w in words"
      :key="w"
      :value="w"
    />
  </ol>
</template>

<script>
export default {
  props: {
    words: { type: Array, required: true },
  },
};
</script>

<style scoped lang="less">
@import "../assets/variables.less";
</style>
