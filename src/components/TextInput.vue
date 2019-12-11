<template>
  <input
    v-model="internalValue"
    type="text"
    autofocus
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    :placeholder="placeholder"
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
  appearance: none;
  margin: 10px 10px 0 10px;
  border-radius: 5px;
  border: 1px solid @secondary-text-color;
  flex-shrink: 0;
  height: 30px;
  outline: none;
  text-align: center;
  font-size: 1.2em;
  font-family: monospace;
}
</style>
