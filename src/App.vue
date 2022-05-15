<script setup>
import VideoCanvasVue from "./components/VideoCanvas.vue";
import VideoProvider from "./lib/VideoProvider";

const video = VideoProvider.getInstance();
video.load("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
</script>
<template>
  <div>
    <div class="controls">
      <button @click="video.play">play</button>
      <button @click="video.pause">pause</button>
    </div>
    <div class="canvas-grid">
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
      <VideoCanvasVue />
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.canvas-grid {
  display: flex;
  flex-wrap: wrap;
}
.canvas-grid .canvas-wrapper {
  width: 25%;
}

.controls {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
