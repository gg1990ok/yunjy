/**
 * 选课页面过滤
 * 
 * 页面匹配规则： /^http:\/\/px\.yx\.yunjy\.com\.cn.+studentChooseCourse.+/
 * 
 */

$(function(){
  var userId = localStorage.getItem("userId");;
  var exit = "exit"+userId;
    var array = JSON.parse(localStorage.getItem(exit));
    var id = location.href.match(/e\/([0-9]{5})/)[1];
    if(array.indexOf(id) == -1) {
      array.push(id);
    	localStorage.setItem(exit, JSON.stringify(array));
    }
    
    if(localStorage.getItem("lastone") == '1') {
      localStorage.setItem("lastone", "0");
  		window.open('', '_self');window.close();
  	}
})
  