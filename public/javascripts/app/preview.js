$(function () {

    // 上传成功
    window.onupload = function (path) {
        if (path) {
            typeChange.call(null, path);
        } else {
            alert('上传失败！');
        }
    };

    var typeChange = function (path) {
        var val = $('select').dropdown('get value')[0];
        var Figure = FIGURE[val];
        var Config = {
            id: 'canvas',
            width: '600',
            height: '400'
        };
        var bransh;
        if (Figure) {
            $.get(path, function (res) {
                $.extend(Config, res);
                $('textarea').val(JSON.stringify(Config));
                $('#' + Config.id).html('');
                bransh = new Figure(Config);
                bransh.render();
            });
        }
    };

    var refresh = function () {
        var Type = $('select').dropdown('get value')[0];
        var Figure = FIGURE[Type];
        var TextArea = $('textarea');
        var Config = {
            id: 'canvas',
            width: '400',
            height: '400'
        };
        $.extend(Config, JSON.parse(TextArea.val()));
        $('#' + Config.id).html('');
        bransh = new Figure(Config);
        bransh.render();
    };

    $('.type').change(function () {
        var val=$('select').dropdown('get value')[0];
        $('#download').attr('href','/download/'+val+'.json');
        typeChange.call(null, '/' + val + '.json');
    });

    $('#refresh').click(function () {
        refresh();
    });
    $('select.dropdown').dropdown();

});
