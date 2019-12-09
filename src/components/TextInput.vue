<template>
  <input
    v-model="internalValue"
    type="text"
    autofocus
    :placeholder="placeholder"
    onblur="this.focus()"
  >
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: '' },
    value: { type: String, required: true },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/variables.less";

input {
  flex-shrink: 0;
  height: 30px;
}
</style>
