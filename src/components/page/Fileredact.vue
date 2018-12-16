<template>
  <div>
    <el-card class="box-card-header">
      <div class="file-card-header">
        <span>xxxx标题</span>
        <el-dropdown trigger="click" style="float: right;">
          <el-button type="primary">
            更多菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <a @click="toPath('fileredact')">
              <el-dropdown-item>编辑文档</el-dropdown-item>
            </a>
            <a href>
              <el-dropdown-item>删除文档</el-dropdown-item>
            </a>
            <a href>
              <el-dropdown-item>新建文档</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-card>
    <el-card class="box-card-content">
      <div class="file-content">
        <el-form label-width="100px" v-model="fileForm">
          <el-form-item label="文档主题：">
            <el-input v-model="fileForm.theme"></el-input>
          </el-form-item>
          <el-form-item label="文档路径：">
            <el-input v-model="fileForm.url"></el-input>
          </el-form-item>
          <el-form-item label="文档内容:">
            <div
              class="upload_warp_right"
              @drop="drop($event)"
              @dragenter="dragenter($event)"
              @dragover="dragover($event)"
            >
              <mavon-editor
                v-model="fileForm.content"
                ref="md"
                @imgAdd="$imgAdd"
                @change="change"
                :toolbars="toolbars"
                @subfieldToggle="$subfieldToggle"
                :subfield="false"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>

    <div class="file-yuran">
      <h1>文件预览</h1>
      <div ref="yuran" v-html="fileForm.html"></div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data () {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览,
        defaultOpen: "edit",
        toolbarsFlag: false, subfield: false
      },
      fileForm: {
        theme: '',//主题
        content: '',
        html: '',
        configs: ''
      }
    }
  },
  components: {
    mavonEditor
  },

  created () {
    this.$subfieldToggle()
  },

  computed: {

  },
  methods: {
    /* 拖拽上传 */
    dragenter (el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover (el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop (el) {
      el.stopPropagation();
      el.preventDefault();
      //   this.fileList(el.dataTransfer);
    },
    /* 将图片上传到服务器，返回地址替换到md中 */
    $imgAdd (pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    },
    $subfieldToggle (status, value) {
      console.info(status + "" + value)
      status = !status;
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.fileForm.html = render;
    },
    submit () {
      console.log(this.fileForm.content);
      console.log(this.fileForm.html);
      this.$message.success("提交成功！");
    },
  }
}
</script>


<style lang="less" scoped>
.box-card-header {
  .file-card-header {
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    max-width: 800px;
    margin: 0px auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .file-card-foot {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 16px;
  }
}

.box-card-content {
  margin-top: 20px;
  .file-content {
    max-width: 800px;
    margin: 0 auto;
    h2 {
      padding-bottom: 20px;
    }
  }
}
.file-yuran {
  max-width: 800px;
  margin: 0 auto;
  h1 {
    margin: 10px 0px;
  }
  img {
    max-width: 100%;
    min-height: 100%;
  }
}
</style>
