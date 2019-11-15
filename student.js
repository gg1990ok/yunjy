/**
 * 学习区页面 脚本
 * 
 * 主要用于循环打开 各个课程
 * 页面匹配规则： /^http:\/\/px\.yx\.yunjy\.com\.cn.+student\/4227$/
 */
$(function () {
  var userId = $(".top-dl").text().match(/^[0-9]{10}([0-9]{7})/)[1];
  localStorage.setItem("userId", userId);

  // sIndex 中存放章节 id，一章一章循环刷。
  var aIndex = "aIndex" + userId;
  var exit = "exit" + userId;

  if (!localStorage.getItem(aIndex)) {
    localStorage.setItem(aIndex, 0);
  }

  if (!localStorage.getItem(exit)) {
    localStorage.setItem(exit, "[]");
  }
  var index = localStorage.getItem(aIndex);
  var aaaLen = $(".start-center-list").children().length;
  var element = $(".start-center-list").children().get(index);
  var $go = $(element).find(".go");
  var goLen = $go.length

  var arrayExit = JSON.parse(localStorage.getItem(exit));

  var listArray = [];
  for (var j = 0; j < goLen; j++) {
    var href = $go[j].href;
    var id = href.match(/\/([0-9]{5})\//)[1];
    if (/^http+/.test(href) && arrayExit.indexOf(id) == -1) {
      listArray.push(href);
    }
  }

  localStorage.setItem("lastone", "0");
  if (listArray.length > 0) {
    var win = window.open(listArray[0], "_blank", "channelmode=yes");
    if (listArray.length > 1) {

      for (var i = 1; i < listArray.length; i++) {
        setTimeout((function (i) {
          return function () {
            if (i == listArray.length - 1) {
              localStorage.setItem("lastone", "1");
            } else {
              localStorage.setItem("lastone", "0");
            }
            win.open(listArray[i], "_self");

          }
        })(i), i * 20 * 1000);
      }

    } else {
      localStorage.setItem("lastone", "1");
    }

  } else {
    var indexnew = localStorage.getItem(aIndex);
    var indexplus = Number(indexnew) + 1;
    if (indexplus < aaaLen - 1) {
      localStorage.setItem(aIndex, indexplus);
      location.reload();
    }
  }
})