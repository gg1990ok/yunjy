/**
 *  听课页面js
 * 匹配规则：/^http:\/\/px\.yx\.yunjy\.com\.cn.+learn/
 */


 // 重置alert方法，防止alert中断页面执行
window.alert = function (str) {
  layer.alert(str);
  console.log(str);
  // lastone 标识当前页面 是否是 当前章节最后一个 未听完的课程
  // 1 是最后一个，将关闭页面。
  if (localStorage.getItem("lastone") == '1') {
    localStorage.setItem("lastone", "0");
    window.open('', '_self'); window.close();
  } else if (str == "更新学习时间成功！") {
    // 更新成功 关闭窗口
    window.open('', '_self'); window.close();
  }
}

// 引入验证码识别库
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdn.jsdelivr.net/gh/naptha/tesseract.js@v1.0.14/dist/tesseract.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

// 引入layer
var script2 = document.createElement("script");
script2.type = "text/javascript";
script2.src = "https://cdn.bootcss.com/layer/2.3/layer.js";
document.getElementsByTagName('head')[0].appendChild(script2);

// 引入layer样式
var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.bootcss.com/layer/2.3/skin/layer.css";
document.getElementsByTagName('head')[0].appendChild(link);

//  看门狗标识，识别验证码只执行一次
var guo_flag = true;

// 识别验证码方法
function scanCode(callback) {
  callback = callback || function () { };
  // ====识别验证码开始====
  window.img_src = "http://px.yx.yunjy.com.cn/px/PX201908290001/validateCode?" + Math.random();
  console.log(img_src);
  Tesseract.recognize(img_src, {
    classify_bln_numeric_mode: 1
  }).then(function (result) {
    $("#inputvalcode1").val(result.text);
    // 提交
    callback();
  });
}

// 覆盖页面的 同名方法
function ChangeTime() {
  //  设置为最大时间20分钟
  TimeNum = 1200;
  if (TimeNum > 0) {
    timeStr = setTimeout("ChangeTime()", 1000);
    if (TimeNum > 5 && 7 > TimeNum) {//大于5s，隐藏计时框
      btnOclick();
    }

    if (TimeNum >= 0) {//大于10分钟测试
      //console.log($("#titleType").is(":visible"))
      //console.log($("#validateType").is(":visible"))
      if ($("#titleType").is(":visible")) {
        abledRadio();//设置单选框为可选状态 在courseTitle.ftl页面
      }
      if ($("#validateType").is(":visible")) {
        $("#comfirmButtonTo").show();
        ischeck = true;
      }
      if (timing_needs_code == 2) {
        $("#comfirmButtonTo").show();
      }
    }
  }
  document.getElementById("learnTime").value = +Math.floor(TimeNum / 60) + "分" + TimeNum % 60 + "秒";

  // 只会执行一次
  if (guo_flag && !$("#inputvalcode1").is(':hidden')) {
    guo_flag = false;

    // ====识别验证码开始====
    scanCode(function () {
      // 识别后 提交
      $("#comfirmButtonTo").click();
    })

    // ====识别验证码结束====

  }
}

$(function () {
  // 在学习区会先保存 用户id
  var userId = localStorage.getItem("userId");
  // locaStroage 中存放 已经学完的id，下次不再打开。
  var exit = "exit" + userId;
  if ($("#learnTime").length == 0) {
    // 记录已经看完的 课程id
    var array = JSON.parse(localStorage.getItem(exit));
    var id = location.href.match(/\/[0-9]\/([0-9]{5})/)[1];
    if (array.indexOf(id) == -1) {
      array.push(id);
      localStorage.setItem(exit, JSON.stringify(array));
    }

    // 如果是最后一个页面将关闭
    if (localStorage.getItem("lastone") == '1') {
      localStorage.setItem("lastone", "0");
      window.open('', '_self'); window.close();
    }
  }
})
