jQuery(document).ready(function($) {
    $('#button').mouseenter(function(event){
        clearAll();
    });

    $('#button').click(function(event){
        var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
        for(let i = 0,len = handlers.length; i < len; i++){
            let currentRandom = parseInt(Math.random() * (len - 1));
            let current = handlers[i];
            handlers[i] = handlers[currentRandom];
            handlers[currentRandom] = current;
        }
        robot(handlers, 0, 0);
    });

    var ajaxLists = [];

    liSequential = (li) => new Promise(function(resolve, reject){
        if(li.find('.num').text()!='...') return;
        if ($('#control-ring').attr('invalid')) return;

        li.removeClass('invalid')
        li.addClass('valid');
        li.find('span').show();
        $('.valid').addClass('numclick');
        $('ul li:not(.valid)').removeClass('numclick');
        $('ul li:not(.valid)').addClass('invalid');

        $('#control-ring').attr('invalid', 'invalid');

        var ajax = $.get('http://localhost:3000/', (data, status) => {
            li.find('.num').text(data.toString());
            li.addClass('hasnum');
            li.removeClass('valid');
            li.removeClass('numclick');

            li.siblings('.invalid:not(.hasnum)').addClass('numclick');
            li.siblings('.invalid:not(.hasnum)').removeClass('invalid');

            $('#control-ring').removeAttr('invalid');

            if(checkValid()){
                $('#info-bar').addClass('sumvalid');
            }
            console.log('Data: ' + data + '; Status: ' + status);

            resolve();
        });

        ajaxLists.push(ajax);

    });

    function showRes(infoBar) {
        if (!infoBar.hasClass('sumvalid')) return;

        var res = 0;
        var nums = $('#control-ring-container span').toArray();
        for(let i = 0; i < nums.length; i++){
             res += parseInt(nums[i].innerHTML);
        };
        $('#result').text(res);
    };

    function clearAll(){
        $('ul span').text('...');
        $('ul span').hide();
        $('#info-bar #result').text('');
        $('ul li').addClass('numclick');
        $('ul li').removeClass('valid');
        $('ul li').removeClass('invalid');
        $('ul li').removeClass('hasnum');
        $('#info-bar').removeClass('sumvalid');

        for(let i = 0; i < ajaxLists.length; i++){
            var ajax = ajaxLists.pop();
            ajax.abort();
        }
    }

    function checkValid(){
        var flag = 1;
        $('#control-ring-container ul').find('li').each(function(){
            if(!$(this).hasClass('hasnum')) flag = 0;
        });
        if(flag == 1) return 1;
        return 0;
    }

    function randomErr(){
        var num = Math.random();
        if(num < 0.5) return 1;
        else return 0;
    }

    function robot(handlers, index, currentSum){
        if(index > handlers.length) return;
        if(index == handlers.length) {
            bubbleHandler(currentSum, function(nextSum){
                robot(handlers, index+1, nextSum);
            }, function(error){
                $('#result').text(error.message, currentSum);
            });
        }

        handlers[index](currentSum, function(nextSum){
            robot(handlers, index+1, nextSum);
        }, function(error){
            $('#result').text(error.message, currentSum);
        });
    }

    function aHandler(currentSum, resolve, reject){
        var messages = ['这不是个天大的秘密', '这是个天大的秘密' ];
        $('#result').text(messages[1]);
        liSequential($('#control-ring .A')).then(data => {
            if(randomErr()) resolve(currentSum + parseInt(data));
        }).catch(error => reject({message: messages[0], currentSum}));
    }

    function bHandler(currentSum, resolve, reject){
        var messages = ['我知道', '我不知道'];
        $('#result').text(messages[1]);
        liSequential($('#control-ring .B')).then(data => {
            if(randomErr()) resolve(currentSum + parseInt(data));
        }).catch(error => reject({message: messages[0], currentSum}));
    }

    function cHandler(currentSum, resolve, reject){
        var messages = ['你知道', '你不知道'];
        $('#result').text(messages[1]);
        liSequential($('#control-ring .C')).then(data => {
            if(randomErr()) resolve(currentSum + parseInt(data));
        }).catch(error => reject({message: messages[0], currentSum}));
    }

    function dHandler(currentSum, resolve, reject){
        var messages = ['他知道', '他不知道'];
        $('#result').text(messages[1]);
        liSequential($('#control-ring .D')).then(data => {
            if(randomErr()) resolve(currentSum + parseInt(data));
        }).catch(error => reject({message: messages[0], currentSum}));
    }

    function eHandler(currentSum, resolve, reject){
        var messages = ['不怪', '才怪'];
        $('#result').text(messages[1]);
        liSequential($('#control-ring .E')).then(data => {
            if(randomErr()) resolve(currentSum + parseInt(data));
        }).catch(error => reject({message: messages[0], currentSum}));
    }

    function bubbleHandler(currentSum, resolve, reject){
        var messages = ['楼主异步调用战斗力感人，目测超过', '楼主异步调用战斗力感人，目测不超过'];
        if(randomErr()) $('#result').text(messages[1] + currentSum);
        else reject({message: messages[0] + currentSum, currentSum});
    }

});

