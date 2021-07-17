<template>
  <div class="home">
    <div class="tabs" :style="{backgroundImage:'url('+require(`../assets/imgs/tab_${tab}.png`) +')'}">
      <span @click="change('left')">多次免签</span>
      <span @click="change('right')">单次免签</span>
    </div>
    <more v-show="tab=='left'"></more>
    <single v-show="tab=='right'"></single>
  </div>
</template>
<script>
import More from "../components/More.vue";
import Single from "../components/Single.vue";
export default {
  components: { More, Single },
  data() {
    return {
      tab: "left",
    };
  },
  methods: {
    change(type) {
      this.tab = type;
    },
  },
};
</script>
<style scoped lang="less">
.home {
  background-color: #f7f7f7;
  padding: 20px 16px;
  height: 100%;
  .tabs {
    height: 38px;
    width: 100%;
    background-size: cover;
    background-position: 50%;
    font-size: 16px;
    span {
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 38px;
      font-weight: 500;
      color: #606268;
    }
    .tab_sel {
      color: #262626;
    }
  }
}
</style>