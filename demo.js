$(document).ready(function () {
    // alert('abc');
	$(".load").fadeOut(1000);
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();

    // 新增按鈕
    $("#addbutton").click(function () {
        $("#dialog-addconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,// dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "新增": function (e) {

                    var url = "ajax/ajaxCard";
                    var cnname = $("#addcnname").val();
                    var enname = $("#addenname").val();
                    var sex = $('input:radio:checked[name="addsex"]').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                
                	if($("#addcnname").val()==""){
                    	alert("你尚未填寫中文姓名");
                    	/*eval("document.form1['addcnname'].focus()");*/  
                	}else if($("#addenname").val()==""){
                	    alert("你尚未填寫英文姓名");
                	    /*eval("document.form1['addenname'].focus()"); */  
                	}else if($("#addphone").val()==""){
                	    alert("你尚未填寫手機");
                	    /*eval("document.form1['addenname'].focus()"); */  
                	}else if(!(/^09\d{8}$/.test($("#addphone").val()))){
                	    alert("請輸入正確的手機號");
                	}else if($("#addmail").val()==""){
                	    alert("請輸入電子郵件");
                	}else if(!(/^([\w\.\-]){1,64}\@([\w\.\-]){1,64}\.([\w\.\-]){1,64}$/ .test($("#addmail").val()))){
                	    alert("請輸入正確的電子郵件");
                	}else{
                		 ajaxobj.add();
                	}
                   
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {
                    $("#addform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    // 搜尋按鈕
    $("#searchbutton").click(function () {
        $("#dialog-searchconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,// dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "搜尋": function (e) {
                    var url = "ajax/ajaxCard";
                    // var data = $("#searchform").serialize();
                    var cnname = $("#secnname").val();
                    var enname = $("#seenname").val();
                    var sex = $('input:radio:checked[name="sesex"]').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    
                    if($("#secnname").val()==""){
                    	alert("你尚未填寫中文姓名");
                    	/*eval("document.form1['addcnname'].focus()");*/  
                	}else if($("#seenname").val()==""){
                	    alert("你尚未填寫英文姓名");
                	    /*eval("document.form1['addenname'].focus()"); */  
                	}else if($("#sephone").val()==""){
                	    alert("你尚未填寫手機");
                	    /*eval("document.form1['addenname'].focus()"); */  
                	}else if(!(/^09\d{8}$/.test($("#sephone").val()))){
                	    alert("請輸入正確的手機號");
                	}else if($("#semail").val()==""){
                	    alert("請輸入電子郵件");
                	}else if(!(/^([\w\.\-]){1,64}\@([\w\.\-]){1,64}\.([\w\.\-]){1,64}$/ .test($("#semail").val()))){
                	    alert("請輸入正確的電子郵件");
                	}else{
                        ajaxobj.search();
                	}

                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {

                    $("#searchform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })  
    // 修改鈕
    $("#cardtable").on('click', '.modifybutton', function () {
        var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.modify_get();
    })
    //刪除鈕
    $("#cardtable").on('click', '.deletebutton', function () {
    	 $("#dialog-deleteconfirm").dialog({
    		 buttons:{
    			 "確認":function(e){
    				var deleteid = $(this).attr('id').substring(12);
			        var url = "ajax/ajaxCard";
			        var ajaxobj = new AjaxObject(url, 'json');
			        ajaxobj.id = deleteid;
			        ajaxobj.delete();
			        $(this).dialog("close");
    			 },
    	 		 "取消":function(){
    	 			 $(this).dialog("close");
    	 		 }
    		 }
    	 });
    })
    
    // 自適應視窗
    $(window).resize(function () {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);
    });
});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr class='cell'></tr>");
         
        
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html(item.cnname));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html(item.enname));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html(strsex));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html('<div style="font-size:16px;font-weight:bold;"><img class="modifybutton" id="modifybutton' + item.s_sn + '"src="modify.png"></div>'));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html('<div style="font-size:16px;font-weight:bold;"><img class="deletebutton" id="deletebutton' + item.s_sn + '"src="delete.png"></div>'));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html(item.phone));
        row.append($('<td onmouseover="over(this)" onmouseout="out(this)"></td>').html(item.Email));
        $("#cardtable").append(row);
    });
}
var http = "https://elmmaple.github.io/meet/";
function author(){
	var req= new XMLHttpRequest();
	article.style.visibility="visible";
	req.open("get",http+"author.html");
	req.onload = function(){//load事件，偵測連線的狀態結束
		//連線完成
		var intro = document.getElementById("intro");
		var X = document.getElementById("X");
		X.style.display = "inline";
		intro.innerHTML=this.responseText; 
	};
	req.send();
}
function closed(){
	article.style.visibility="hidden";
	X.style.display="none";
}
function over(x){
	var y=x.cellIndex+1;
    $("td:nth-child("+y+")").css("background-color","chartreuse");
}
function out(x){
	var y=x.cellIndex+1;
    $("td:nth-child("+y+")").css("background-color","transparent");
}
function initEdit(response) {
  var modifyid = $("#cardtable").attr('id').substring(12);
  $("#mocnname").val(response[0].cnname);
  $("#moenname").val(response[0].enname);
  if (response[0].sex == 0) {
      $("#modifyman").prop("checked", true);
      $("#modifywoman").prop("checked", false);
  }
  else {
      $("#modifyman").prop("checked", false);
      $("#modifywoman").prop("checked", true);
  }
  $("#modifysid").val(modifyid);
  $("#dialog-modifyconfirm").dialog({
      resizable: true,
      height: $(window).height() * 0.4,// dialog視窗度
      width: $(window).width() * 0.4,
      modal: true,
      buttons: {
          // 自訂button名稱
          "修改": function (e) {
              //$("#modifyform").submit();
              var url = "ajax/ajaxCard";
              var cnname = $("#mocnname").val();
              var enname = $("#moenname").val();
              var sex = $('input:radio:checked[name="mosex"]').val();
              var ajaxobj = new AjaxObject(url, 'json');
              ajaxobj.cnname = cnname;
              ajaxobj.enname = enname;
              ajaxobj.sex = sex;
              ajaxobj.id = modifyid;
              if($("#mocnname").val()==""){
              	alert("你尚未填寫中文姓名");
				}else if($("#moenname").val()==""){
				    alert("你尚未填寫英文姓名");
				}else if($("#mophone").val()==""){
				    alert("你尚未填寫手機");
				}else if(!(/^09\d{8}$/.test($("#mophone").val()))){
				    alert("請輸入正確的手機號");
				}else if($("#momail").val()==""){
				    alert("請輸入電子郵件");
				}else if(!(/^([\w\.\-]){1,64}\@([\w\.\-]){1,64}\.([\w\.\-]){1,64}$/ .test($("#momail").val()))){
				    alert("請輸入正確的電子郵件");
				}else{
				  ajaxobj.modify();
				}
              e.preventDefault(); // avoid to execute the actual submit of the form.
          },
          "重新填寫": function () {
              $("#modifyform")[0].reset();
          },
          "取消": function () {
              $(this).dialog("close");
          }
      },
      error: function (exception) { alert('Exeption:' + exception); }
  });
}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.phone ='';
AjaxObject.prototype.Email = '';
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}
AjaxObject.prototype.getall = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0987987987","Email":"XXX@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0987987987","Email":"XXX@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0987987987","Email":"XXX@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0987987987","Email":"XXX@gmail.com"}]';
  refreshTable(JSON.parse(response));
}
AjaxObject.prototype.add = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"},{"s_sn":"52","cnname":"新增帳號","enname":"New Acount","sex":"1"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-addconfirm").dialog("close");
}
AjaxObject.prototype.modify = function () {
  response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-modifyconfirm").dialog("close");
}
AjaxObject.prototype.modify_get = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"}]';
  initEdit(JSON.parse(response));
}

AjaxObject.prototype.search = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-searchconfirm").dialog("close");
}
AjaxObject.prototype.delete = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
  refreshTable(JSON.parse(response));
}