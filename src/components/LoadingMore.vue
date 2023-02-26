<template>
  <div>
    <div class="more" v-if="count > listLength">
      <Button type="text" @click="more" class="btn">加载更多</Button>
    </div>
    <div class="scroll" v-else>已加载全部</div>
  </div>
</template>
<script>
export default {
  name: 'LoadingMore',
  props: ['count','listLength'],
  data() {
    return {

    };
  },
  methods: {
    more(){
        this.$emit('nextPage')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>