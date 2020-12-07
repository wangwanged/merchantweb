module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': ['dynamic-import-node']
    }
  }
}

const wsBaseUrl = "wss://immediate.sosozhaofang.com/WebSocket";

//七牛云图片的地址。
const imgBaseUrl = "http://img.cdn.my012.com/";
const mapKey = "XmyjYVhns2v89LpukAkkvQ9VxSiNcjv0";
export { imgBaseUrl, mapKey, wsBaseUrl };
