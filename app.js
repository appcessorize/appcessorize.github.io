const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.5, // reduce input image size for gains in speed.
  maxNumBoxes: 3, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.8 // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const warningText = document.getElementById("warningText");
const bodyBg = document.getElementsByTagName("body");
let model;

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
        console.log("active");
        setInterval(runDetection, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
});

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions.length > 0) {
      audio.play();
      document.title = "🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️";
      document.body.style.backgroundColor = "black";
      document.body.style.color = "red";
      warningText.style.visibility = "visible";
      setInterval(() => {
        document.body.style.backgroundColor = "#f8f6e7";
        document.body.style.color = "#1f2227";
        document.title = "no touching";
        warningText.style.visibility = "hidden";
      }, 1500);
    }
    console.log(predictions);
    model.renderPredictions(predictions, canvas, context, video);
  });
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});
