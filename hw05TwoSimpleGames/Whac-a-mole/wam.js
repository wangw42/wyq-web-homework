//修复setTimeout多次点击会多次执行方法导致运行速度加快的问题；
//ref:https://blog.csdn.net/qq_16660849/article/details/52181807
window.onload = function(){
	creat_hole();
	var game = document.getElementById('btn');
	var maingame = document.getElementById('maingame');
	var eachhole = maingame.childNodes;
	var gamestate = 0;
	var mytime = 30;
	var scores = 0;
	var mhole = document.getElementsByClassName('hole');
	for(var i = 0; i <= 60; i++){ //游戏未开始，初始化为不可点击
		eachhole[i].disabled = true;
	}
	function creat_hole(){
		var maingame = document.getElementById('maingame');
		for(var i = 0; i < 60; i++){
			var new_hole = document.createElement("input");
			new_hole.type = "radio";
			new_hole.name = "mouse";
			new_hole.className = "hole";
			maingame.appendChild(new_hole);
			new_hole.onmouseup = function(event){
				_click = this.checked;
			}
			new_hole.onclick = function(event){
				if(mytime != 0){
					if(_click == true){
						scores += 1;
						random_mouse();
					}else{
						scores -= 1;		
						mhole[currentTarget].checked = true; //原地鼠不消失，直至正确
					}
					document.getElementById("score").value = scores;
				}else{
					this.checked = false;
				}
			}
		}
	}

	var cishu1 = 0;
	var cishu2 = 1;

	game.onclick = function(event){
		if(gamestate == 0){ //start
			//---游戏开始，重置地鼠为可打---
			var maingame = document.getElementById('maingame');
			var eachhole = maingame.childNodes;
			for(var i = 0; i <= 60; i++){ 
				eachhole[i].disabled = false;
			}
			gamestate = 1;
			document.getElementById('result').value = 'Gaming';
			scores = 0;
			document.getElementById('score').value = scores;
			mytime = 30;
			document.getElementById('time').value = mytime;

			cishu2 = 0;
			if(cishu1 == cishu2){
				my_timer();
			}
			++cishu1;
			//my_timer();
			random_mouse();
		}else{
			mhole[currentTarget].checked = false; //不选中
			mytime = 0;
			document.getElementById('time').value = mytime;
			gamestate = 0;
			document.getElementById('result').value = 'Game over';
		}
	}

	function my_timer(event){
		document.getElementById('time').value = mytime;
		timer_ = setTimeout(my_timer, 1000);
		if(mytime == 0){
			cishu1 = 0;
			if(cishu1 == cishu2){
				clearInterval(timer_);
			}
			++cishu2; 					
			//clearInterval(timer_);		
			gamestate = 0;
			mhole[currentTarget].checked = false;
			document.getElementById('result').value = "Game over";
			document.getElementById('time').value = mytime;
			//---游戏结束，地鼠不可打---
			var maingame = document.getElementById('maingame');
			var eachhole = maingame.childNodes;
			for(var i = 0; i <= 60; i++){	
				eachhole[i].disabled = true;
			}
		}
		mytime = mytime -1;
	}
	function random_mouse(event){
		if(mytime != 0){
			currentTarget = parseInt(Math.random() * 60);
			mhole[currentTarget].checked = true; 
		}
	}
}