import Chimee from 'chimee'
import './index.less'

new Chimee({
  wrapper: '#app',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
  controls: false,
  playsInline: true,
  preload: 'auto',
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: 'landscape|portrait',
  xWebkitAirplay: true,
  muted: true,
});