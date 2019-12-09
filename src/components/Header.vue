<template>
  <div>
    {{ loading ? "wait" : "done" }}
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
  },
  computed: { },
  methods: { },
};
</script>

<style scoped lang="less">
@import "../assets/variables.less";
</style>
