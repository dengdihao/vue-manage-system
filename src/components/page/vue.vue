<template>
  <div>
    <div ref="msgDiv">{{msg}}</div>
    <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
    <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
    <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
    <button @click="changeMsg">Change the Message</button>
    <br>
    <h1>set</h1>
    <ul>
      <h3>{{b}}</h3>
      <h3>{{obj}}</h3>
    </ul>
    <button @click="changeSet">111</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Hello Vue.',
      msg1: '',
      msg2: '',
      msg3: '',
      b: 2,
      obj: {
        c: 3
      }
    }
  },
  methods: {
    changeMsg () {
      this.msg = 'hello world'
      this.msg1 = this.$refs.msgDiv.innerHTML
      //   this.$nextTick(() => {
      //     this.msg2 = this.$refs.msgDiv.innerHTML
      //   })
      this.$nextTick().then(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    },
    changeSet () {
      this.$set(this.obj, "age", 2)
    }
  }
}
</script>
