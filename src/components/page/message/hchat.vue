<template>
  <div class="page">
    <el-card id="el-card">
      <div class="hchat-header">xxx聊天</div>
      <div class="hchat-content">
        <div class="hchat-left">
          <ul class="slide-ul">
            <li class="slide-li" v-for="(item,index) in 100" :key="index">
              <div class="slide-img">
                <img src="../../../assets/logo.png" alt>
              </div>
              <div class="slide-content">
                <div class="content-hr">xxx hr</div>
                <div class="content-date">时间</div>
              </div>
              <div class="slide-icon">x</div>
            </li>
          </ul>
        </div>
        <div class="hchat-right">
          <div class="hchat-right-header">
            <p>刘先生 HR</p>
            <p>沟通职位 JAVA工程师 10K-15K 上海</p>
          </div>
          <div class="hchat-right-main" ref="show">
            <div class="hchat-other">
              <div class="hchat-other-img">
                <img src="../../../assets/logo.png" alt>
              </div>
              <div class="hchat-other-text">
                BOSS直聘是权威领先的招聘网,
                开启人才网招聘求职新时代,让求职者与Boss直接开聊、加快面试、
                即时反馈,找工作就来BOSS直聘和Boss开聊吧!
              </div>
            </div>

            <div class="hchat-admin" v-for="(msgs,index) in msgArr" :key="index">
              <div class="hchat-admin-text">{{msgs}}</div>
              <div class="hchat-admin-img">
                <img src="../../../assets/logo.png" alt>
              </div>
            </div>
          </div>
          <div class="hchat-right-foot">
            <div class="hchat-right-icon">
              <div>
                <i class="el-icon-info"></i>
              </div>
              <div>
                <i class="el-icon-info"></i>
              </div>
              <div>
                <i class="el-icon-info"></i>
              </div>
              <div>
                <i class="el-icon-info"></i>
              </div>
              <div>
                <i class="el-icon-info"></i>
              </div>
            </div>
            <div class="hchat-right-content">
              <textarea v-model="msg">模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介绍模拟班组介</textarea>
              <el-button @click="dealMsg">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msgArr: [
        "msgs", "nishigpu"

      ],
      msg: ''
    }
  },
  methods: {
    dealMsg () {
      console.info(this.$refs.show)
      this.msgArr.push(this.msg)
      this.msg = ""
      this.$nextTick().then(() => {
        this.$refs.show.scrollTop = 100000;

      })


    }
  }
}
</script>


<style lang="less" scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 5px;
  max-height: 1280px;
  .el-card {
    background: #ffffff;
    height: 760px;
    .el-card__body {
      background: #ffffff;
      height: 760px;
      padding: 20px 0 0px 20px;
    }
  }

  .hchat-header {
    width: 200px;
    border-bottom: 1px solid #dddddd;
    margin: 00px 20px;
    padding: 10px 0px;
    font-size: 16px;
  }
  .hchat-content {
    display: flex;
    margin-top: 20px;
    .hchat-left {
      flex: 1;
      .slide-ul {
        overflow-y: auto;
        height: 705px;
        padding: 0 10px;
      }
      .slide-li {
        display: flex;
        height: 80px;
        justify-content: space-around;
        .slide-img {
          width: 80px;
          height: 80px;
          img {
            max-width: 80px;
            max-height: 80px;
          }
        }
        .slide-content {
          align-content: stretch;
          .content-hr {
            height: 40px;
            line-height: 40px;
          }
          .content-date {
            height: 40px;
            line-height: 40px;
          }
        }
        .slide-icon {
          line-height: 80px;
          font-size: 32px;
        }
      }
    }
    .hchat-right {
      flex: 2;
      .hchat-right-header {
        height: 80px;
        padding: 0 20px;
      }
      .hchat-right-main {
        height: 400px;
        padding: 0 20px;
        overflow-y: auto;
        .hchat-other {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          .hchat-other-img {
            width: 35px;
            height: 35px;
            img {
              max-width: 35px;
            }
          }
          .hchat-other-text {
            margin: 0 10px;
            max-width: 270px;
            font-size: 12px;
            background: rgb(245, 245, 250);
            line-height: 35px;
            padding: 0 10px;
            line-height: 1.5;
          }
        }
        .hchat-admin {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
          .hchat-admin-img {
            width: 35px;
            height: 35px;
            img {
              max-width: 35px;
            }
          }
          .hchat-admin-text {
            margin: 0 10px;
            max-width: 270px;
            font-size: 12px;
            background: rgb(245, 245, 250);
            line-height: 35px;
            padding: 0px 10px;
            line-height: 1.5;
          }
        }
      }
      /*     position: relative;
    height: 85px; */
      .hchat-right-foot {
        border-top: 1px solid #dddddd;
        height: 150px;
        .hchat-right-icon {
          display: flex;
          padding: 10px 0px 10px 10px;
          font-size: 20px;
          div {
            width: 40px;
            height: 40px;
            line-height: 40px;
          }
        }
        .hchat-right-content {
          position: relative;
          height: 155px;
          textarea {
            outline: none;
            resize: none;
            // position: absolute;
            // top: 0px;
            // left: 0px;
            // z-index: 12;height: 100%;
            height: 110px;
            width: 100%;
            border: none;
          }
          .el-button {
            position: absolute;
            bottom: 0px;
            right: 0px;
            margin-bottom: 10px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

/*  */
textarea::-webkit-scrollbar,
.hchat-right-main::-webkit-scrollbar,
.slide-ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
textarea::-webkit-scrollbar-thumb,
.hchat-right-main::-webkit-scrollbar-thumb,
.slide-ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
textarea::-webkit-scrollbar-thumb,
.hchat-right-main::-webkit-scrollbar-track,
.slide-ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>

