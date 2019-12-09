<template>
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
@import "../assets/variables.less";

.recycle-scroller {
  height: 400px;
  background-color: salmon;
}
.item {
  height: 32px;
}
</style>
