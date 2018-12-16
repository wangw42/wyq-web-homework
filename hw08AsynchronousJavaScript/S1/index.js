jQuery(document).ready(function($) {
    $('#button').mouseenter(function(event){
        clearAll();
    });

    var ajaxLists = [];

    $('#control-ring-container li').click(function(event){
        if($(this).find('.num').text()!='...') return;
        if ($('#control-ring').attr('invalid')) return;

        $(this).removeClass('invalid')
        $(this).addClass('valid');
        $(this).find('span').show();
        $('.valid').addClass('numclick');
        $('ul li:not(.valid)').removeClass('numclick');
        $('ul li:not(.valid)').addClass('invalid');

        $('#control-ring').attr('invalid', 'invalid');

        var ajax = $.get('http://localhost:3000/', (data, status) => {
            $(this).find('.num').text(data.toString());
            $(this).addClass('hasnum');
            $(this).removeClass('valid');
            $(this).removeClass('numclick');

            $(this).siblings('.invalid:not(.hasnum)').addClass('numclick');
            $(this).siblings('.invalid:not(.hasnum)').removeClass('invalid');

            $('#control-ring').removeAttr('invalid');

            if(checkValid()){
                $('#info-bar').addClass('sumvalid');
            }
            console.log('Data: ' + data + '; Status: ' + status);
        });

        ajaxLists.push(ajax);

    });

    $('#info-bar').click(function (event) {
        if (!$(this).hasClass('sumvalid')) return;

        var res = 0;
        var nums = $('#control-ring-container span').toArray();
        for(let i = 0; i < nums.length; i++){
             res += parseInt(nums[i].innerHTML);
        };
        $('#result').text(res);
    });

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

