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

var MSG_WIN = "Ура вы победили!";
var MSG_RESULT = "Список результатов:";

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = '#fff';
var TEXT_COLOR = '#000';
var TEXT_FONT = "16px PT Mono";

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

var renderPlayerStatistic = function (ctx, barPositionX, barPositionY, playerBarHeight, color) {
  ctx.fillStyle = color;
  ctx.fillRect(barPositionX, barPositionY, BAR_WIDTH, playerBarHeight);
};

var renderText = function (ctx, msg, positionX, positionY) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(msg, positionX, positionY);
};

var getRandom100 = function () {
  var result = Math.round(100 * Math.random());
  return result;
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, MSG_WIN, CLOUD_X + MSG_X_OFFSET, CLOUD_Y + MSG_Y_OFFSET);
  renderText(ctx, MSG_RESULT, CLOUD_X + MSG_X_OFFSET, CLOUD_Y + MSG_Y_OFFSET + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var currentPlayerName = players[i];
    var currentPlayerTime = times[i];
    var currentPlayerBarHeight = (BAR_HEIGHT * currentPlayerTime) / maxTime;
    var randomColor = 'hsl(240, ' + getRandom100() + '%, 50%)';
    var fillColor = (currentPlayerName === SELF_PLAYER) ? SELF_PLAYER_COLOR : randomColor;
    var barPositionX = CLOUD_X + BAR_OFFSET - GAP + (BAR_OFFSET + BAR_WIDTH) * i;
    var barPositionY = CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET + GAP - currentPlayerBarHeight;

    var playerTextPositionX = CLOUD_X + TEXT_OFFSET + (TEXT_WIDTH + TEXT_OFFSET) * i;
    var playerNamePositionY = CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT;
    var playerTimePositionY = CLOUD_Y + CLOUD_HEIGHT - 2 * TEXT_HEIGHT - currentPlayerBarHeight - GAP;

    renderPlayerStatistic(ctx, barPositionX, barPositionY, currentPlayerBarHeight, fillColor);
    renderText(ctx, currentPlayerName, playerTextPositionX, playerNamePositionY);
    renderText(ctx, Math.round(currentPlayerTime), playerTextPositionX, playerTimePositionY);
  }
};

