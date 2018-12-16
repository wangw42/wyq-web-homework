jQuery(document).ready(function($) {

    $('#button').mouseenter(function(event){
        clearAll();
    });

    $('#button').click(function(event){
        var lists = $('#control-ring-container li').toArray();

        var promise = [];
        for(let i = 0; i < lists.length; i++){
            promise[i] = liSequential($(lists[i]));
        }

        Promise.all([promise[0], promise[1], promise[2], promise[3], promise[4]])
            .then(() => showRes($('#info-bar')));
    });

    var ajaxLists = [];

    liSequential = (li) => new Promise(function(resolve, reject){
        if(li.find('.num').text()!='...') return;

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

});

