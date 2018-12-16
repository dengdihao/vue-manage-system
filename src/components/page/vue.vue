<template>
  <div>
    <ul>
      <li v-for="(item,index) in message_array" :key="index">{{item}}</li>
    </ul>
    <input type="text" v-model="message">
    <button v-on:click="dealMessage">add</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message_array: [],
      message: ''
    }

  },
  methods: {
    dealMessage: function () {
      this.message_array.push(this.message);
      this.message = '';
    }
  }
}
</script>

<style lang="less" scoped>
</style>

