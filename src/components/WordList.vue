<template>
  <div class="wordlist">
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
    height: 7px;
    background-image: linear-gradient(to bottom, white, rgba(255, 255, 255, 0));
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
