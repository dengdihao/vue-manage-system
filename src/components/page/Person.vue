<template>
  <div class="person">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <div slot="header" class="clearfix">
            <h2>内容</h2>
          </div>
          <router-view></router-view>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <a href="头像"></a>
            <span>用户名</span>
          </div>
          <a v-for="(item,index) in personUl" :key="index">
            <div class="text item" @click="topath(item.name)">{{item.content}} {{item.name}}</div>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      personUl: [{ topath: 'user', content: "个人简介", name: 'user' },
      { topath: 'edituser', content: '编辑信息', name: 'edituser' }]
    };
  },
  methods: {
    topath (name) {
      console.info(1)
      console.info(this.personUl)
      console.info(name)
      this.$router.push({
        name: name,
        qurey: {
          id: '123456'
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.person-left-sidebar {
  padding: 10px 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
