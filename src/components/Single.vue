<template>
  <div class="single">
    <!-- 一键选择本人签卡 -->
    <div class="once">
      <div class="once_info">
        <img src="../assets/imgs/icon_signcard.png">
        <div>
          <p class="title">本人签卡</p>
          <p class="msg">一键导入，快速添加本人签卡</p>
        </div>
      </div>
      <button :class="{isOnce:once}" @click="onceName">{{once?'已经选择':'一键选择'}}</button>
    </div>
    <!-- 表单编辑 -->
    <div class="form">
      <div class="rows">
        <div class="problem">
          <span>签卡日期</span><sup>*</sup>
        </div>
        <div class="answer">
          <span :class="{hasEdit:dateShow}" @click="open(true)">{{dateShow?dateShow:'请选择开始时间'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" />
          <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
            <van-datetime-picker @cancel="open(false)" :formatter="formatter" @confirm="open(false,$event)" v-model="datePicker" type="date" title="选择签卡日期" />
          </van-popup>
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>选择人员</span><sup>*</sup>
        </div>
        <div class="answer">
          <span :class="{hasEdit:userList.length>0}">{{userList.legth>0?`已选择${userList.lenght}人`:'请选择'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" />
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>签卡班次</span><sup>*</sup>
        </div>
        <div class="answer">
          <van-popover v-model="showSeason" trigger="click" :actions="seasonActions" @select="seasonSelect">
            <template #reference>
              <span :class="{hasEdit:season}">{{season?season:'请选择'}}</span>
              <van-icon name="arrow-down" color="#B1B1B1" />
            </template>
          </van-popover>
          <van-popover v-model="showFrequency" trigger="click" :actions="frequencyActions" @select="frequencySelect">
            <template #reference>
              <span :class="{hasEdit:frequency}">{{frequency?frequency:'请选择'}}</span>
              <van-icon name="arrow-down" color="#B1B1B1" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>免签事由</span>
        </div>
      </div>
      <textarea placeholder="请填写免签卡事由" v-model="reason"></textarea>
      <div class="rows">
        <div class="problem">
          <span>已选人员({{userList.lenght}})</span>
        </div>
        <div class="answer">
          <span class="font_blue">清除全部</span>
        </div>
      </div>
      <div class="user_box">
        <ul>
          <li v-for="(item,i) in userList" :key="i">
            <div class="items">
              <span>{{item.name}}</span>
              <van-icon name="cross" color="#5177F4" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 保存按钮 -->
    <div class="fix">
      <van-button color="#5177F4" type="info" block>保存</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "", //签卡日期
      userList: [{ name: "林某某" }], //签卡选中的人
      showSeason: false, //时令选择
      season: "", //时令
      seasonActions: [
        { text: "夏令制上午" },
        { text: "夏令制下午" },
        { text: "冬令制上午" },
        { text: "夏令制上午" },
      ],
      showFrequency: false, //班次选择
      frequency: "", //班次
      frequencyActions: [{ text: "上班" }, { text: "下班" }],
      reason: "", //免签事由
      once: false,
      dateShow: this.$utils.changeDate(new Date()), //展示在页面上的时间
      showTime: false, //是否打开时间选择
      datePicker: "",
    };
  },
  methods: {
    // 是否打开时间选择
    open(type, time) {
      this.showTime = type;
      time ? (this.dateShow = this.$utils.changeDate(time)) : "";
    },
    // 时间选择
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 一键选择
    onceName() {
      if (!this.once) {
        this.userList.push({ name: "XXX" });
        this.once = true;
      }
    },
    // 时令选择
    frequencySelect(action) {
      this.frequency = action.text;
    },
    // 班次选择
    seasonSelect(action) {
      this.season = action.text;
    },
  },
};
</script>
<style scoped lang="less">
.single {
  background-color: #fff;
  height: 100%;
  .once {
    margin: 0 15px 10px 15px;
    padding: 10px 12px 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    box-shadow: 0px 2px 8px 0px #f1f3f6;
    height: 60px;
    box-sizing: border-box;
    .once_info {
      display: flex;
      align-items: center;
      img {
        width: 20px;
      }
      div {
        margin-left: 12px;
        .title {
          color: #262626;
        }
        .msg {
          font-weight: 400;
          color: #888;
          font-size: 12px;
          margin-top: 6px;
        }
      }
    }
    button {
      padding: 9px 13px;
      color: #5177f4;
      background-color: #e8f1ff;
      border-radius: 4px;
    }
  }
  .form {
    padding: 0 15px;
    .rows {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;
      .problem {
        span {
          color: #5f5f5f;
        }
        sup {
          color: #eb3232;
          margin-left: 4px;
        }
      }
      .answer {
        vertical-align: middle;
        span {
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle;
          color: #aeaeae;
        }
        .hasEdit {
          color: #262626;
        }
        i {
          vertical-align: middle;
        }
        .font_blue {
          color: #5177f4;
        }
      }
    }
    textarea {
      height: 104px;
      border-radius: 4px;
      border: 1px solid #e8e8e8;
      width: 100%;
      padding: 10px 14px;
      color: #262626;
      box-sizing: border-box;
    }
    .user_box {
      padding: 10px 0;
      height: 172px;
      width: 100%;
      ul {
        display: flex;
        align-items: center;
        li {
          .items {
            padding: 7px 10px;
            background-color: #f3f6fd;
            color: #585858;
            border-radius: 4px;
            margin: 0 6px 4px 0;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            i {
              margin-left: 6px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .fix {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
    background-color: #fff;
  }
}
</style>