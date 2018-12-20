<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <router-link to="/">
      <div class="logo">案件管理</div>
    </router-link>
    <div class="header-left">
      <div class="header-user-con">
        <!-- 聊天室 -->
        <!-- <div class="btn-wxroo">
          <el-tooltip effect="dark" :content="fullscreen?`聊天室`:`聊天室`" placement="bottom">
            <i class="el-icon-phone-outline
"></i>
          </el-tooltip>
        </div>-->
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <div class="btn-phone">
          <el-tooltip effect="dark" :content="fullscreen?`聊天室`:`聊天室`" placement="bottom">
            <i class="el-icon-phone-outline"></i>
          </el-tooltip>
        </div>

        <!-- 用户头像 -->
        <!-- 用户名下拉菜单 -->
        <el-dropdown
          class="user-name"
          placement="bottom-end"
          trigger="click"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">
            <div class="user-avator">
              <img src="static/img/img.jpg">
            </div>
            <!-- {{username}} -->
            <i class="el-icon-caret-bottom" style="position: absolute;top: 15px;left: 70px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/person">
              <el-dropdown-item>个人信息</el-dropdown-item>
            </router-link>
            <router-link to="/tabs">
              <el-dropdown-item>我的消息</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input placeholder="请输入内容" v-model="searchinput">
          <el-button icon="el-icon-search" slot="append" @click="tosearch()"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../common/bus";
import { _logout } from "../../services/service.js";
import store from '../../store/store';
export default {
  data () {
    return {
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
      searchinput: ''
    };
  },
  computed: {
    username () {
      console.info(sessionStorage.getItem("ms_username"))
      debugger
      let username = JSON.parse(sessionStorage.getItem("ms_username")).username;
      return username ? username : this.name;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command == "loginout") {
      // let objlogout=new Object()
      // objlogout.Authorization=token
      // console.info(objlogout)
      console.info( store)
      _logout().then(res=>{
        this.$store.commit('del_token',localStorage.getItem('token'))
        this.$router.push('/login')
      }).catch(err=>{
        console.info(err)
      })
      // console.info(window.handleCommand)
      // let objlogout=new Object()
      // console.info( JSON.stringify(sessionStorage.getItem["ms_username"]).token)
      // objlogout.Authorization=sessionStorage.getItem("ms_username").token
      // console.info(objlogout)
        // sessionStorage.removeItem("ms_username");
        // this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 跳转高级搜索
    tosearch () {
      console.log(this.searchinput)

      this.$router.push({
        name: 'powersearch',
        query: { input: this.searchinput }
      })

      this.searchinput = ''
    }

  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 200px;
  line-height: 70px;
  color: #ffffff;
}
.header-left {
  float: left;
  padding-right: 50px;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-phone,
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 15px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-right: 40px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
