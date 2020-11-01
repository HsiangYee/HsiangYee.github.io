function copy(object) {
    var text = $(object).attr('value');
    var input = document.createElement('input');
    input.setAttribute('id', 'copyInput');
    input.setAttribute('value', text);
    document.getElementsByTagName('body')[0].appendChild(input);
    document.getElementById('copyInput').select();
    if (document.execCommand('copy')) {
        toast.fire('success', '複製成功');
    } else {
        toast.fire('error', '複製失敗');
    }
    document.getElementById('copyInput').remove();
}