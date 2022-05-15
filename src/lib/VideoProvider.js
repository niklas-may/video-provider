class ObservableInstance {
  instance;
  observer = {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  subscribe(event, callback) {
    if (!this.observer[event]) this.observer[event] = [];

    this.observer[event].push(callback);
  }
  unsubscribe(event, callback) {
    if (!this.observer[event]) return;

    this.observer[event] = this.observer[event].filter(
      (observer) => observer !== callback
    );
  }
  broadcast(event, data) {
    if (!this.observer[event]) return;

    this.observer[event].forEach((callback) => callback(data));
  }
}

export default class VideoProvider extends ObservableInstance {
  videoEl;
  canvasEl;
  canvasCtx;
  raf;

  constructor() {
    super();
    this.initVideoEl();
    this.initCanvasEl();
  }
  initVideoEl() {
    this.videoEl = document.createElement("video");

    this.videoEl.setAttribute("loop", "");
    this.videoEl.setAttribute("playsinline", "");
    this.videoEl.setAttribute("preload", "metadata");

    this.videoEl.style.maxWidth = "100%";
    this.videoEl.style.width = "100%";
    this.videoEl.style.position = "fixed";
    this.videoEl.style.transform = "translateX(100vw)";
    this.videoEl.style.display = "none";

    document.querySelector("body").appendChild(this.videoEl);

    this.videoEl.addEventListener("play", this.onPlay.bind(this));
    this.videoEl.addEventListener("pause", this.onPause.bind(this));
    this.videoEl.addEventListener(
      "loadedmetadata",
      this.onLoadedmetadata.bind(this)
    );
  }
  initCanvasEl() {
    this.canvasEl = document.createElement("canvas");

    this.canvasEl.style.maxWidth = "100%";
    this.canvasEl.style.width = "100%";
    this.canvasEl.style.position = "fixed";
    this.canvasEl.style.transform = "translateX(100vw)";
    this.canvasEl.style.display = "none";

    document.querySelector("body").appendChild(this.canvasEl);
    this.canvasCtx = this.canvasEl.getContext("2d", { alpha: false });
  }
  load(src) {
    this.videoEl.setAttribute("src", src);
    this.videoEl.load();
  }
  play() {
    this.videoEl.play();
  }
  pause() {
    this.videoEl.pause();
  }
  frame() {
    this.canvasCtx.drawImage(this.videoEl, 0, 0);
    this.broadcast("newFrame", this.canvasEl);
    this.raf = requestAnimationFrame(() => this.frame());
  }
  onPlay() {
    this.raf = requestAnimationFrame(() => this.frame());
  }
  onPause() {
    cancelAnimationFrame(this.raf);
  }
  onLoadedmetadata() {
    const meta = {
      videoWidth: this.videoEl.videoWidth,
      videoHeight: this.videoEl.videoHeight,
    };

    this.canvasEl.setAttribute("width", meta.videoWidth);
    this.canvasEl.setAttribute("height", meta.videoHeight);
    this.broadcast("loadedmetadata", meta);
  }
}
