const SVGA = require('svgaplayerweb');
console.log(SVGA)
var player = new SVGA.Player('#app');
var parser = new SVGA.Parser('#app'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。

parser.load(
  './images/main.svga',
  function (videoItem) {
    // player.setVideoItem(videoItem);
    // player.startAnimation();
  },
  function (error) {
    console.log(error);
  }
);