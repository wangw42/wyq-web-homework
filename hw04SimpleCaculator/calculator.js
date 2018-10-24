var num = 0; 
    function getn(num) {
        document.getElementById("textbox").value += document.getElementById(num).value;
    }
    function ans() {
    	var res = 0;
        var resfinal = 0;
        res = document.getElementById("textbox").value;
        //error
        try{
            resfinal = eval(res);
        }
        catch(error){
            alert("Error! ");
        }
        if(typeof(resfinal) == "undefined"){
            document.getElementById("textbox").value = "";
        }else if(resfinal=="Infinity"){
        	alert("Error! ");
        }else if(res.length >= 24){
            alert("Error!"); //添加了溢出屏幕的报错提醒,取消了报错后归零， 
                                   //即依然可以计算大数字，然后精度问题我查了查我用了eval的话是不是没法改了TUT,用栈的话我这会儿还来得及大改吗
        }
        //计算结果
		document.getElementById("textbox").value = "";
		document.getElementById("textbox").value = eval(res);
    }
    function back() {
        var arr = document.getElementById("textbox");
        arr.value = arr.value.substring(0, arr.value.length - 1);
    }
    function CE() {
        document.getElementById("textbox").value = null;
        document.getElementById("textbox").focus();
    }

