<template>
  <div>
    <div id="editorElem" ref="editorElem" style="text-align:left"></div>
    <button v-on:click="getContent">查看内容</button>

    <div ref="showEditor">{{editorContent}}</div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      editorContent: ""
    };
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    let editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.debug = true;
    // 关闭粘贴内容中的样式
    editor.customConfig.pasteFilterStyle = false;
    // 忽略粘贴内容中的图片
    editor.customConfig.pasteIgnoreImg = true;
    // 使用 base64 保存图片
    editor.customConfig.uploadImgShowBase64 = true;

    // 上传图片到服务器
    editor.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
    // editor.customConfig.uploadImgServer = "upload.do"; //设置上传文件的服务器路径
    // editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    // //自定义上传图片事件
    // editor.customConfig.uploadImgHooks = {
    //   before: function(xhr, editor, files) {},
    //   success: function(xhr, editor, result) {
    //     console.log("上传成功");
    //   },
    //   fail: function(xhr, editor, result) {
    //     console.log("上传失败,原因是" + result);
    //   },
    //   error: function(xhr, editor) {
    //     console.log("上传出错");
    //   },
    //   timeout: function(xhr, editor) {
    //     console.log("上传超时");
    //   }
    // };

    editor.create();
  }
};
</script>
