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
  element;
  raf;

  constructor() {
    super();
    this.initVideo();
  }
  initVideo() {
    this.element = document.createElement("video");

    this.element.setAttribute("loop", "");
    this.element.setAttribute("playsinline", "");
    this.element.setAttribute("preload", "metadata");

    this.element.style.maxWidth = "100%";
    this.element.style.position = "fixed";
    this.element.style.transform = "translateX(100vw)";
    this.element.style.display = "none";

    const body = document.querySelector("body");
    body.appendChild(this.element);

    this.element.addEventListener("play", this.onPlay.bind(this));
    this.element.addEventListener("pause", this.onPause.bind(this));
    this.element.addEventListener(
      "loadedmetadata",
      this.onLoadedmetadata.bind(this)
    );
  }
  load(src) {
    this.element.setAttribute("src", src);
    this.element.load();
  }
  play() {
    this.element.play();
  }
  stop() {
    this.element.pause();
  }
  tick() {
    this.broadcast("newFrame", this.element);
    this.raf = requestAnimationFrame(() => this.tick());
  }
  onPlay() {
    this.raf = requestAnimationFrame(() => this.tick());
  }
  onPause() {
    cancelAnimationFrame(this.raf);
  }
  onLoadedmetadata() {
    this.broadcast("loadedmetadata", {
      videoWidth: this.element.videoWidth,
      videoHeight: this.element.videoHeight,
    });
  }
}
