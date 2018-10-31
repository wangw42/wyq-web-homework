window.onload = function (){
	var pstart = 0;
	var pend = 0;
	var proute = [0, 0, 0, 0, 0];
	var twall = 0;
	var pcheat = 0;
	fgame();
	function fgame(){
		var start = document.getElementById('start');
		var end = document.getElementById("end");
		var route_ = document.getElementsByClassName("route");
		var wall = document.getElementById('wall');
		var cheat = document.getElementById('cheat');
		cheat.onmouseover = function(){
			//pcheat = 1;
			pstart = 0;
		}
		start.onmouseover= function(){
			if(pstart == 0){
				document.getElementById('result').textContent = " ";
				pned = 0;
				route = 0;
			}
			pstart = 1;
		}
		for(var i = 0; i < 5; i++){
			route_[i].onmouseover = function(){
				if(event.target.id == "one"){
					proute[0] = 1;
				}else if(event.target.id == "two"){
					proute[1] = 1;
				}else if(event.target.id == "three"){
					proute[2] = 1;
				}else if(event.target.id == "four"){
					proute[3] = 1;
				}else if(event.target.id == "five"){
					proute[4] = 1;
				}
			}
		}
		wall.onmouseover = function(){
			if(pstart == 1 && pend == 0){
			event.target.className += " touchwall";
			document.getElementById('result').textContent = "You Lose ";
			twall = 1;
			pstart = 0;
			}
		}
		wall.onmouseout = function(){
			event.target.className = "wall";
		}
		end.onmouseover = function(){
			pend = 1;
			if(pstart ==1 && proute[0] == 1 && proute[1] == 1 && proute[2] == 1 && proute[3] == 1 && proute[4] ==1){
				document.getElementById('result').textContent = "You win ";
			}else{
				document.getElementById('result').textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
			}
			pstart = 0;
			pend = 0;
			proute = [0, 0, 0, 0, 0];
		}
	}
}