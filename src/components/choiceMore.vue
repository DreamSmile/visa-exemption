<template>
  <div class="choiceMore">
    <h1>添加人员</h1>
    <van-notice-bar left-icon="info-o" wrapable :scrollable="false" v-show="isMore" text="请注意选择人员，保存后人员将不能再修改！" />
    <van-notice-bar left-icon="info-o" wrapable :scrollable="false" v-show="!isMore" text="请注意选择人员，保存后人员将不能再修改！选择人员之后才会出来所排的班次，所选人员必须是一样的班次！" />
    <van-search v-model="searchVal" placeholder="请输入人员编号或姓名" />
    <!-- 选择部门 -->
    <div class="form">
      <h2>选择部门</h2>
      <div class="rows">
        <div class="problem">
          <span>部门</span><sup>*</sup>
        </div>
        <div class="answer" @click="openDep(true,true)">
          <span :class="{hasEdit:department}">{{department?department:'请选择'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" />
        </div>
      </div>
      <div class="rows">
        <div class="problem">
          <span>二级部门</span><sup>*</sup>
        </div>
        <div class="answer" @click="openDep(true,false)">
          <span :class="{hasEdit:secondary}">{{secondary?secondary:'请选择'}}</span>
          <van-icon name="arrow-down" color="#B1B1B1" />
        </div>
      </div>
    </div>
    <!-- 选择人员 -->
    <div class="form">
      <h2>选择人员</h2>
      <div class="table_title">
        <van-checkbox class="Checkboxs" v-model="all" shape="square" @change="changeAll"></van-checkbox>
        <span class="name">姓名</span>
        <span class="department">部门</span>
        <span class="station">岗位</span>
      </div>
      <div class="table_item">
        <van-checkbox-group v-model="checkList" ref="checkboxGroup">
          <ul>
            <li v-for="(item , i) in userList" :key="i">
              <van-checkbox class="Checkboxs" shape="square" :name="item"></van-checkbox>
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
              <span class="station">{{item.station}}</span>
            </li>
          </ul>
        </van-checkbox-group>
      </div>
    </div>
    <!-- 底部按钮组 -->
    <div class="fix">
      <van-button class="btn" type="default" @click="reset">清除</van-button>
      <van-button class="btn" type="info" @click="sure">确定 ({{checkList.length}})</van-button>
    </div>
    <!-- 选部门和二级部门 -->
    <van-popup v-model="showChoiceDep" position="bottom" :style="{ height: '50%' }">
      <van-picker title="部门" v-show="isDev" show-toolbar :columns="departmentColumns" @cancel="cancel" @confirm="confirmDepartment" />
      <van-picker title="二级部门" v-show="!isDev" show-toolbar :columns="secondaryColumns" @cancel="cancel" @confirm="confirmSecondary" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "choice",
  data() {
    return {
      searchVal: "",
      department: "", //部门
      secondary: "", //二级部门
      showChoiceDep: false, //打开部门选择
      isDev: true, //打来的选择是部门？
      departmentColumns: [
        "信息管理中心",
        "技术研发中心",
        "集团财务部",
        "行政部",
      ],
      secondaryColumns: [
        "二级部门1",
        "二级部门2",
        "二级部门3",
        "二级部门4",
        "二级部门5",
      ],
      secondaryColumns: ["行政管理专员", "运维管理", "软件开发", "硬件管理"],
      userList: [
        { name: "张三四", department: "信息管理中心", station: "软件开发专员" },
        { name: "林某", department: "信息管理中心", station: "行政管理专员" },
        { name: "陈某", department: "信息管理中心", station: "UI开发专员" },
        { name: "张三三", department: "信息管理中心", station: "软件开发专员" },
        { name: "林某某", department: "信息管理中心", station: "行政管理专员" },
        { name: "陈某某", department: "信息管理中心", station: "UI开发专员" },
      ],
      all: false, //是否全选
      checkList: [], //复选框数组
    };
  },
  props: {
    isMore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    // 取消选择部门
    cancel() {
      this.showChoiceDep = false;
    },
    // 清除选好的人员
    reset() {
      this.$utils
        .showDialog("确定清除所选信息？", "询 问", {
          confirmButtonText: "确定",
          showCancelButton: true,
          cancelButtonText: "取消",
        })
        .then((res) => {
          this.checkList = [];
          this.department = "";
          this.secondary = "";
        })
        .catch(() => {});
    },
    // 确定选择人员
    sure() {
      if (!this.department || !this.secondary || this.checkList.length < 1) {
        this.$utils.showDialog("请填写完整的部门信息并选择人员~");
        return;
      }
      if (this.isMore) {
        this.$emit("setUserListM", false, this.checkList);
      } else {
        this.$emit("setUserListS", false, this.checkList);
      }
    },
    // 控制是否打开部门人员选择
    openDep(isOpen, isDev) {
      this.showChoiceDep = isOpen;
      this.isDev = isDev;
    },
    // 确定选好二级部门
    confirmSecondary(val, index) {
      this.showChoiceDep = false;
      this.secondary = val;
    },
    // 确定选好部门
    confirmDepartment(val, index) {
      this.showChoiceDep = false;
      this.department = val;
    },
    //   全选或者取消
    changeAll(type) {
      this.$refs.checkboxGroup.toggleAll(type);
    },
  },
};
</script>S
<style scoped lang="less">
.choiceMore {
  margin-bottom: 64px;
  h1 {
    font-size: 20px;
    line-height: 28px;
    color: #262626;
    margin: 16px;
  }
  /deep/.van-notice-bar__content {
    font-size: 12px;
    line-height: 16px;
  }
  .form {
    padding: 12px 15px 0 15px;
    margin: 10px 15px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    box-shadow: 0px 4px 10px 0px rgba(238, 240, 245, 0.5);
    h2 {
      color: #262626;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .rows {
      height: 40px;
      // height: 54px;
      box-sizing: border-box;
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
      }
    }
    .table_title {
      background-color: #f4f4f4;
      width: 100%;
      height: 36px;
      line-height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .Checkboxs {
        width: 10%;
      }
      .name {
        width: 30%;
      }
      .department {
        width: 30%;
      }
      .station {
        width: 30%;
      }
    }
    .table_item {
      ul {
        li {
          color: #262626;
          width: 100%;
          height: 36px;
          line-height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          .Checkboxs {
            width: 10%;
          }
          .name {
            width: 30%;
          }
          .department {
            width: 30%;
          }
          .station {
            width: 30%;
          }
        }
      }
    }
  }
  .fix {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .btn:first-child {
      width: 30%;
    }
    .btn:last-child {
      margin-left: 18px;
      width: 65%;
    }
  }
}
</style>