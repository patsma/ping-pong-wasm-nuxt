<template>
  <div>
    <canvas width="400" height="300" style="border: 1px solid black"></canvas>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import init, * as wasm from '/public/wasm_ping_pong.js';

onMounted(async () => {
  try {
    // Initialize the Wasm module

    await init({
      path: '/public/wasm_ping_pong_bg.wasm',
    });

    const {Ball} = wasm;
    if (!Ball) {
      console.error("Ball is not exported from the Wasm module");
      return;
    }

    // Create a ball instance
    const ball = Ball.new(200, 150); // Start at canvas center

    const width = 400; // Canvas width
    const height = 300; // Canvas height

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const render = () => {
      // Update ball's position using Wasm
      ball.update(width, height);

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Animate the next frame
      requestAnimationFrame(render);
    };

    // Start rendering
    render();
    console.log("Game started");
  } catch (err) {
    console.error("Error initializing Wasm module:", err);
  }
});
</script>

<style>
canvas {
  display: block;
  margin: auto;
}
</style>