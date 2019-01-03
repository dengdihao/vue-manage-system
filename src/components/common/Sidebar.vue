<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
// import CaseDetailVue from '../page/CaseDetail.vue';
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页"
        },  
        {
          icon: "el-icon-lx-home",
          index: "createcase",
          title: "新建案件"
        },
        {
          icon: "el-icon-question",
          index: "powersearch",
          title: "高级搜索"
        },
        // {
        //   icon: "el-icon-document",
        //   index: "detailpages",
        //   title: "详情信息"
        // },
        {
          icon: "el-icon-tickets",
          index: "fileskeeping",
          title: "文档管理"
        },
        {
          icon: "el-icon-tickets",
          index: "hchat",
          title: "聊天室"
        },
        //wangeditor
        // {
        //   icon: "el-icon-lx-cascades",
        //   index: "table",
        //   title: "基础表格"
        // },
        {
          icon: "el-icon-lx-copy",
          index: "tabs",
          title: "消息通知"
        },
        // {
        //   icon: "el-icon-lx-calendar",
        //   index: "3",
        //   title: "表单相关",
        //   subs: [
        //     {
        //       index: "form",
        //       title: "基本表单"
        //     },
        //     {
        //       index: "3-2",
        //       title: "三级菜单",
        //       subs: [
        //         {
        //           index: "editor",
        //           title: "富文本编辑器"
        //         },
        //         {
        //           index: "markdown",
        //           title: "markdown编辑器"
        //         }
        //       ]
        //     },
        //     {
        //       index: "upload",
        //       title: "文件上传"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-rank",
        //   index: "drag",
        //   title: "拖拽列表"
        // },
        {
          icon: "el-icon-rank",
          index: "yuread",
          title: "文件预览"
        },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "6",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // },
        {
          icon: 'el-icon-view',
          index: 'person',
          title: '个人信息'
        }
      ]
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace("/", "");
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
