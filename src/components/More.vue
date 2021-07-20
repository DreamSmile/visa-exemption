<template>
  <div class="more">
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
          <span>开始时间</span><sup>*</sup>
        </div>
        <div class="answer">
          <span :class="{hasEdit:startDateShow}" @click="openStart(true)">{{startDateShow?$utils.changeDate(startDateShow):'请选择开始时间'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" class="first_el" />
          <van-popup v-model="showstartTime" position="bottom" :style="{ height: '50%' }">
            <van-datetime-picker @cancel="openStart(false)" :formatter="formatter" @confirm="openStart(false,$event)" v-model="startDate" type="date" title="选择开始时间" />
          </van-popup>
          <van-popover v-model="showStart" trigger="click" :actions="startActions" @select="startSelect">
            <template #reference>
              <span :class="{hasEdit:start}">{{start?start:'请选择'}}</span>
              <van-icon name="arrow-down" color="#B1B1B1" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>结束时间</span><sup>*</sup>
        </div>
        <div class="answer">
          <span :class="{hasEdit:endDateShow}" @click="openEnd(true)">{{endDateShow?$utils.changeDate(endDateShow):'请选择开始时间'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" class="first_el" />
          <van-popup v-model="showEndTime" position="bottom" :style="{ height: '50%' }">
            <van-datetime-picker :min-date="minDate?minDate:new Date()" @cancel="openEnd(false)" :formatter="formatter" @confirm="openEnd(false,$event)" v-model="endDate" type="date" title="选择开始时间" />
          </van-popup>
          <van-popover v-model="showEnd" trigger="click" :actions="endActions" @select="endSelect">
            <template #reference>
              <span :class="{hasEdit:end}">{{end?end:'请选择'}}</span>
              <van-icon name="arrow-down" color="#B1B1B1" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>免签天数</span><sup>*</sup>
        </div>
        <div class="answer">
          <span class="hasEdit">{{dataSpace}}天</span>
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>选择人员</span><sup>*</sup>
        </div>
        <div class="answer" @click="openChoice">
          <span :class="{hasEdit:userList.length>0}">{{userList.length>0?`已选择${userList.length}人`:'请选择'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" />
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
          <span class="font_color">已选人员({{userList.length}})</span>
        </div>
        <div class="answer">
          <span class="font_blue" @click="clearAll">清除全部</span>
        </div>
      </div>
      <div class="user_box">
        <ul>
          <li v-for="(item,i) in userList" :key="i">
            <div class="items">
              <span>{{item.name}}</span>
              <van-icon @click="removeUer(i)" name="cross" color="#5177F4" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 保存按钮 -->
    <div class="fix" v-show="isBtnHidden">
      <van-button color="#5177F4" type="info" block>保存</van-button>
    </div>
    <!-- 选择人员弹出层 -->
    <van-popup v-model="showChoice" closeable position="bottom" :style="{ height: '90%' }">
      <choice-more :isMore="true" @setUserListM="setUserList" @close="close" :isBtnHidden="isBtnHidden"></choice-more>
    </van-popup>
  </div>
</template>
<script>
import ChoiceMore from "./choiceMore.vue";
export default {
  data() {
    return {
      time: "", //签卡日期
      userList: [], //签卡选中的人
      showstartTime: false,
      startDate: "", //开始时间，默认当天
      startDateShow: new Date(), //展示在页面的时间
      showStart: false, //开始时间下拉框
      start: "", //开始时间
      startActions: [{ text: "上午" }, { text: "下午" }],
      showEndTime: false,
      minDate: null, //结束时间最少从某处选择
      endDate: "",
      endDateShow: new Date(),
      showEnd: false,
      end: "",
      endActions: [{ text: "上午" }, { text: "下午" }],
      reason: "", //免签事由
      showChoice: false, //选择人员弹出层
      once: false,
    };
  },
  components: { ChoiceMore },
  watch: {
    startDateShow: function (val) {
      //监听开始时间选择
      this.minDate = val;
    },
  },
  props: {
    isBtnHidden: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    dataSpace: function (val) {
      let time = this.endDateShow.getTime() - this.startDateShow.getTime();
      return Math.ceil(time / (24 * 60 * 60 * 1000));
    },
  },
  methods: {
    // 关闭选择人员弹窗
    close(isOpen) {
      this.showChoice = isOpen;
    },
    // 移除用户列表
    removeUer(index) {
      this.userList.splice(index, 1);
    },
    // 子组件选好的人员
    setUserList(isOpen, val) {
      this.showChoice = isOpen;
      val.length > 0 ? (this.userList = val) : "";
    },
    // 一键选择
    onceName() {
      if (!this.once) {
        this.userList.push({ name: "XXX" });
        this.once = true;
      }
    },
    // 打开选择人员弹出层
    openChoice() {
      this.showChoice = true;
    },
    // 开始时间上下午选择
    startSelect(action) {
      this.start = action.text;
    },
    //开始时间选择弹出层确定关闭，并且格式化时间
    openStart(type, time) {
      this.showstartTime = type;
      time ? (this.startDateShow = time) : "";
    },
    // 结束时间上下午选择
    endSelect(action) {
      this.end = action.text;
    },
    // 结束时间选择弹出层关闭，并且格式化时间
    openEnd(type, time) {
      this.showEndTime = type;
      time ? (this.endDateShow = time) : "";
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
    // 清除全部
    clearAll() {
      if (this.userList.length < 1) {
        return;
      }
      this.$utils
        .showDialog("确定清除所有已选人员？", "询 问", {
          confirmButtonText: "确定",
          showCancelButton: true,
          cancelButtonText: "取消",
        })
        .then((res) => {
          this.userList = [];
          this.once = false;
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="less">
.more {
  background-color: #fff;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
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
    .isOnce {
      background-color: #edeff2;
      color: #90929a;
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
        .font_color {
          color: #5f5f5f;
        }
        .hasEdit {
          color: #262626;
        }
        i {
          vertical-align: middle;
        }
        .first_el {
          margin-right: 16px;
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
      resize: none;
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
    max-width: 540px;
    margin: auto;
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