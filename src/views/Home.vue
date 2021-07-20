<template>
  <div id="home" class="home" ref="home">
    <!-- <van-button @click="clearUser">清除用户信息</van-button> -->
    <div class="tabs" :style="{backgroundImage:'url('+require(`../assets/imgs/tab_${tab}.png`) +')'}">
      <span @click="change('left')">多次免签</span>
      <span @click="change('right')">单次免签</span>
    </div>
    <more v-show="tab=='left'" :isBtnHidden="isBtnHidden"></more>
    <single v-show="tab=='right'" :isBtnHidden="isBtnHidden"></single>
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
      isBtnHidden: true, //是否弹出按钮
      pageHeight: document.body.clientHeight,
    };
  },
  mounted() {
    this.$utils.showToast("请稍等。。", { type: "loading" });
    this.wxInfo();
    window.onresize = () => {
      this.isBtnHidden =
        this.pageHeight > document.body.clientHeight ? false : true;
    };
  },
  methods: {
    change(type) {
      this.tab = type;
    },
    // 获得微信鉴权
    wxInfo() {
      this.$toast.clear();
      let { isGo = false, wxtoken } = this.$route.query;
      if (localStorage.getItem("VISA_USER") && this.$utils.overdue()) {
        this.$utils.showDialog(
          JSON.parse(localStorage.getItem("VISA_USER")).name
        );
        return;
      }
      // 当上一层是鉴权界面，就会携带isGo和wxtoken
      if (isGo && wxtoken) {
        this.$apis
          .getwxInfoBytoken({ action: "getUserInfoByToken", wxtoken: wxtoken })
          .then((res) => {
            console.log(res);
            if (res.errcode != 0) {
              this.$utils.showDialog(res.errmsg);
              return;
            }
            localStorage.setItem("VISA_TIME", new Date().getTime());
            localStorage.setItem("VISA_USER", JSON.stringify(res.data[0]));
            this.$utils.showDialog(
              JSON.parse(localStorage.getItem("VISA_USER")).name
            );
          })
          .catch((err) => {
            this.$utils.showDialog(err, "错误");
          });
        return;
      }
      // 当缓存中没有用户信息或者时间戳超过了三天，就重新鉴权
      if (!localStorage.getItem("VISA_USER") || !this.$utils.overdue()) {
        let { origin, pathname } = window.location;
        let backurl = encodeURIComponent(`${origin}${pathname}#/?isGo=true`);
        let url =
          "http://tm.lilanz.com/oa/api/WxAuthForLilanz.ashx?&action=wxAuth&configkey=1&backurl=";
        window.location.replace(url + backurl);
      }
    },
    // 清除用户信息
    clearUser() {
      localStorage.removeItem("VISA_USER");
      this.$utils.showToast("清除用户信息成功", { duration: 2000 });
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