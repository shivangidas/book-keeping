"use strict";
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;
//let imageData = document.getElementById("image");

let canvas = document.getElementById("poseCanvas");
let context = canvas.getContext("2d");
let net, poseArray;
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  let video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: canvas.width,
      height: canvas.height
    }
  });
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}
async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}
async function loadModel() {
  net = await posenet.load();
  console.log("Model loaded ...");
}

async function generatePose(video) {
  poseArray = await net.estimateMultiplePoses(
    video,
    imageScaleFactor,
    flipHorizontal,
    outputStride
  );
  //console.log(poseArray);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSkeleton();
}

function drawSkeleton() {
  context.strokeStyle = "red";
  context.lineWidth = "5";
  poseArray.map(pose => {
    if (pose.score > 0.1) {
      drawHead(
        pose.keypoints[0].position.x,
        pose.keypoints[0].position.y,
        Math.abs(pose.keypoints[0].position.x - pose.keypoints[3].position.x)
      );
      drawAline(
        pose.keypoints[5].position.x,
        pose.keypoints[5].position.y,
        pose.keypoints[7].position.x,
        pose.keypoints[7].position.y
      );
      drawAline(
        pose.keypoints[5].position.x,
        pose.keypoints[5].position.y,
        pose.keypoints[6].position.x,
        pose.keypoints[6].position.y
      );
      drawAline(
        pose.keypoints[5].position.x,
        pose.keypoints[5].position.y,
        pose.keypoints[11].position.x,
        pose.keypoints[11].position.y
      );
      drawAline(
        pose.keypoints[12].position.x,
        pose.keypoints[12].position.y,
        pose.keypoints[6].position.x,
        pose.keypoints[6].position.y
      );
      drawAline(
        pose.keypoints[6].position.x,
        pose.keypoints[6].position.y,
        pose.keypoints[8].position.x,
        pose.keypoints[8].position.y
      );
      drawAline(
        pose.keypoints[7].position.x,
        pose.keypoints[7].position.y,
        pose.keypoints[9].position.x,
        pose.keypoints[9].position.y
      );
      drawAline(
        pose.keypoints[10].position.x,
        pose.keypoints[10].position.y,
        pose.keypoints[8].position.x,
        pose.keypoints[8].position.y
      );
      drawAline(
        pose.keypoints[11].position.x,
        pose.keypoints[11].position.y,
        pose.keypoints[12].position.x,
        pose.keypoints[12].position.y
      );

      drawAline(
        pose.keypoints[11].position.x,
        pose.keypoints[11].position.y,
        pose.keypoints[13].position.x,
        pose.keypoints[13].position.y
      );
      drawAline(
        pose.keypoints[14].position.x,
        pose.keypoints[14].position.y,
        pose.keypoints[12].position.x,
        pose.keypoints[12].position.y
      );
      drawAline(
        pose.keypoints[13].position.x,
        pose.keypoints[13].position.y,
        pose.keypoints[15].position.x,
        pose.keypoints[15].position.y
      );
      drawAline(
        pose.keypoints[14].position.x,
        pose.keypoints[14].position.y,
        pose.keypoints[16].position.x,
        pose.keypoints[16].position.y
      );
    }
  });
}

function drawAline(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
function drawHead(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.stroke();
}
async function letTheGameBegin() {
  loadModel();
  let video = await loadVideo();
  setInterval(function() {
    generatePose(video);
  }, 1000);
}

letTheGameBegin();
