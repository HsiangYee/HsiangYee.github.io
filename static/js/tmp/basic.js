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

function share () {
    let content = `
        <a target="_blank" title="股市計算機 | Line 分享" href="https://social-plugins.line.me/lineit/share?url=https://bit.ly/3mJTfBg" class="btn btn-sm btn-success w-100 py-2 my-1">
            分享到 LINE &nbsp;&nbsp;&nbsp;&nbsp;<img src="static/images/line-icon.png" style="width:20px">
        </a>
        <a target="_blank" title="股市計算機 | FB 分享" href="https://www.facebook.com/sharer/sharer.php?u=https://bit.ly/38a3drr" class="btn btn-sm btn-primary w-100 py-2 my-1">
            分享到 FB &nbsp;&nbsp;&nbsp;&nbsp;<img src="static/images/fb-icon.png" style="width:20px">
        </a>
        <button onclick="copy(this)" class="btn btn-sm btn-info w-100 border py-2 my-1" value="https://bit.ly/3mUmSA2">
            複製網址
        </button>
    `;
    $.confirm({
        title: '分享網站',
        type: 'green',
        columnClass: 'col-12 col-lg-4 col-md-6',
        content: content,
        buttons: {
            cancel: {
                text: '關 閉',
            }
        }
    });
}

function coffee () {
    let content = `
        <img src="../static/images/line-pay.jpg" class="w-100"> <br /><br />
        <div class="text-center text-dark" id="linePayCode" value="28830820040"><h5>28830820040</h5></div>
        <div class="text-center"><button class="btn btn-sm btn-ligth border" onclick="copy($('#linePayCode'))"> 複 製 </button></div>
    `;
    $.confirm({
        title: '請作者喝咖啡',
        type: 'blue',
        columnClass: 'col-12 col-lg-4 col-md-6',
        content: content,
        buttons: {
            cancel: {
                text: '關 閉',
            }
        }
    });
}