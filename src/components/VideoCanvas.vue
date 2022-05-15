<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import VideoProvider from "./../lib/VideoProvider";

const canvas = ref(null);
let context;

const onLoad = ({ videoWidth, videoHeight }) => {
  canvas.value.setAttribute("width", videoWidth);
  canvas.value.setAttribute("height", videoHeight);
};
const onNewFrame = (frame) => {
  context.drawImage(frame, 0, 0);
};

const video = VideoProvider.getInstance();
video.subscribe("loadedmetadata", onLoad);
video.subscribe("newFrame", onNewFrame);

onMounted(() => (context = canvas.value.getContext("2d", { alpha: false })));
onUnmounted(() => {
  video.unsubscribe("loadedmetadata", onLoad);
  video.unsubscribe("newFrame", onNewFrame);
});
</script>

<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style>
.canvas-wrapper {
  height: fit-content;
}
.canvas-wrapper canvas {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background-color: lightblue;
  vertical-align: bottom;
}
</style>
