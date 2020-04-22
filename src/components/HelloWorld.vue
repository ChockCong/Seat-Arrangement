<template>
  <div class="hello" ref="imageDom">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ 'Welcome To My Project !' }}</h1>
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <Test></Test>
    <UI></UI>
    <button @click="html2Img">转换</button>
    <img :src="imgUrl" /> -->
  </div>
</template>

<script>
// import Test from './test';
// import UI from './ui';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      opts: {
        logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
        allowTaint: true, // 否允许跨源图像污染画布
        backgroundColor: 'white', // 解决生成的图片有白边
        useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
      },
      imgUrl: ''
    }
  },
  // components: {Test, UI},
  methods: {
    html2Img() {
      this.html2canvas(this.$refs.imageDom, this.opts).then(canvas => {
        console.log(canvas)
        // 转成图片，生成图片地址
        this.imgUrl = canvas.toDataURL("image/png");
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
