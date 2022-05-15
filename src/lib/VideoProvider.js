class ObservableInstance {
  instance;
  observer = {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  subscribe(key, callback) {
    if (!this.observer[key]) this.observer[key] = [];

    this.observer[key].push(callback);
  }
  unsubscribe(key, callback) {
    if (!this.observer[key]) return;

    this.observer[key] = this.observer[key].filter(
      (observer) => observer !== callback
    );
  }
  broadcast(key, data) {
    if (!this.observer[key]) return;

    this.observer[key].forEach((subscriber) => subscriber(data));
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
  stop() {
    this.videoEl.pause();
  }
  tick() {
    this.canvasCtx.drawImage(this.videoEl, 0, 0);
    this.broadcast("newFrame", this.canvasEl);
    this.raf = requestAnimationFrame(() => this.tick());
  }
  onPlay() {
    this.raf = requestAnimationFrame(() => this.tick());
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
