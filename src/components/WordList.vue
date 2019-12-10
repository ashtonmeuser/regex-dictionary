<template>
  <div class="wordlist">
    <div class="gradient" />
    <RecycleScroller
      v-slot="{ item }"
      class="recycle-scroller"
      :items="words"
      :item-size="32"
    >
      <div class="item">
        {{ item }}
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
  components: {
    RecycleScroller,
  },
  props: {
    words: { type: Array, required: true },
  },
};
</script>

<style scoped lang="less">
.wordlist {
  height: 100%;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 5px;
    background-image: linear-gradient(white, transparent);
  }
  .recycle-scroller {
    height: 100%;
    .item {
      text-align: center;
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>
