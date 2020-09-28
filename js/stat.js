'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var MSG_X_OFFSET = 20;
var MSG_Y_OFFSET = 30;
var TEXT_HEIGHT = 20;
var TEXT_OFFSET = 40;
var TEXT_WIDTH = 50;

var BAR_WIDTH = 40;
var BAR_OFFSET = 50;
var BAR_HEIGHT = 150;

var SELF_PLAYER = "Вы";
var SELF_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var msg = ["Ура вы победили!", "Список результатов:"];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
    ctx,
    CLOUD_X + GAP,
    CLOUD_Y + GAP,
    'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  ctx.font = "16px PT Mono";
  for (var k = 0; k < msg.length; k++) {
    ctx.fillText(
      msg[k],
      CLOUD_X + MSG_X_OFFSET,
      CLOUD_Y + MSG_Y_OFFSET + TEXT_HEIGHT * k
    );
  }
  for (var i = 0; i < players.length; i++) {
    var curentPlayerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var randomColor = 'hsl(240, ' + 100 * Math.random() + '%, 50%)';
    var fillColor = (players[i] === SELF_PLAYER) ? SELF_PLAYER_COLOR : randomColor;
    ctx.fillStyle = fillColor;
    ctx.fillRect(
      CLOUD_X + BAR_OFFSET - GAP + (BAR_OFFSET + BAR_WIDTH) * i,
      CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET + GAP - curentPlayerBarHeight,
      BAR_WIDTH,
      curentPlayerBarHeight
    );
    ctx.fillStyle = '#000';
    ctx.fillText(
      players[i],
      CLOUD_X + TEXT_OFFSET + (TEXT_WIDTH + TEXT_OFFSET) * i,
      CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT
    );
    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + TEXT_OFFSET + (TEXT_WIDTH + TEXT_OFFSET) * i,
      CLOUD_Y + CLOUD_HEIGHT - 2 * TEXT_HEIGHT - curentPlayerBarHeight - GAP
    );
  }
};

