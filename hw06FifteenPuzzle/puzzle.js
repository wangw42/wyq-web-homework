//classname 拼图块位置
//id 每块拼图内容固定，用来判断
window.onload = function(){
	let startFlag = 0;
	let times = 0;
	let game = document.getElementById('restart');
	game.onclick = function start(){
		times = 0;
		startFlag = 1;
		//**** 修复移动拼图后重新开始拼图块重叠的bug
		document.getElementById('img_' + 15).className = 'img' + 15 +' bgimg';
		document.getElementById('result').innerText = times;

		let arr = [];
		for(let i = 0; i < 15; i++){
			arr[i] = i;
		}
	//***随机排列*** 
		for(;;){
			arr.randomsort();
			if(is_valid(arr) )break;
		}
		for(let i = 0; i < 15; i++){
			document.getElementById('img_' + i).className= 'img' + arr[i] +' bgimg' ;
		}

	/*点击go之后才能开始游戏*/
		let playgame = document.getElementsByClassName('bgimg');
		for(let i = 0; i < playgame.length; i++){
			playgame[i].onclick = play;
		
		}
		let cheat = document.getElementById('cheat');
		cheat.onclick = fcheat;
	}

	//打乱数组	//方法2 ref：https://www.cnblogs.com/idche/archive/2010/04/28/1722830.html
	Array.prototype.randomsort = function() {
		let value = this.valueOf();
		let len = this.length, temp, key;
		while(len--){
			key = Math.round(Math.random()*len);
			temp = value[key];
			value[key] = value[len];
			value[len] = temp;
		}
		return value;
	}

	//ref:https://blog.csdn.net/mindhawk/article/details/1445013
	//（排列逆序数+空白格的纵坐标+空白格的横坐标）的奇偶性相同
	function is_valid(arr){
		let x = 0; //blank所在位置决定
		let sum = 0;
		for(let i = 0; i < 15; i++){
			for(let j = i+1; j < 15; j++){
				if(arr[i] > arr[j]) sum++;
			}
		}
		return (sum+x)%2 === 0;
	}


	function play(event){
		//通过拼图块的css top left等属性比较是否相邻
		if(startFlag != 1) return;
		let blank_top = parseFloat(window.getComputedStyle(document.getElementById('img_15'))['top']);
		let blank_left = parseFloat(window.getComputedStyle(document.getElementById('img_15'))['left']);
		let this_top = parseFloat(window.getComputedStyle(this)['top']);
		let this_left = parseFloat(window.getComputedStyle(this)['left'])

		if((this_top == blank_top && Math.abs(this_left - blank_left) == 87.5) ||
			(this_left == blank_left && Math.abs(this_top - blank_top) == 87.5)){
			let temp = this.className;
			this.className = document.getElementById('img_15').className;
			document.getElementById('img_15').className = temp;
			times += 1;
			document.getElementById('result').innerText = times;
		}else{
			document.getElementById('result').innerText = "invalid click";
		}

	// is win 数字相同win
		let judge1 = 1;
		for(let i = 0; i < 16; i++ ){
			if(i < 10){
				var now_classnum = parseInt(document.getElementById('img_' + i).className.substring(3,4));
				var now_idnum = parseInt(document.getElementById('img_' + i).id.substring(4,5));
			}else{
				var now_classnum = parseInt(document.getElementById('img_' + i).className.substring(3,5));
				var now_idnum = parseInt(document.getElementById('img_' + i).id.substring(4,6));
			}
			if(now_idnum != now_classnum){
				judge1 = 0;
			}
		}
		if(judge1 == 1){
			document.getElementById('result').innerText = "You win! steps:" + times;
			startFlag = 0;
			times = 0;
		}

	}

	function fcheat(){
		document.getElementById('result').innerText = "Playing";
		for(let i =  0; i <= 15; i++){
			document.getElementById('img_' + i).className = 'img' + i +' bgimg';
		}
		document.getElementById('result').innerText = "You win! (by cheating)";
		startFlag = 0;
		times = 0;
	}
}