/*********************************************************************
 * Copyright © 2020 - 2023 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2023 HsiangYee 版權所有
 * 非經同意不得翻印轉載或以任何方式重製，以免侵犯臺灣智慧財產權須負責刑法與民法
 * 君子請自重 勿淪為小人，請勿以身試法，留下前科
 *********************************************************************/

const menuAndNavbar = $('#menuAndNavbar');
const menuContent = `
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>
    </nav>

    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <div class="brand-link text-center">
            <span class="brand-text font-weight-light">股市計算機</span>
        </div>

        <div class="sidebar">
            <nav class="mt-2" id="menu">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <a href="/views/index.html" title="股市計算機 | 首頁" class="nav-link">
                            <i class="fas fa-home custom-icon"></i>
                            <p>首頁</p>
                        </a>
                    </li>
                    <li class="nav-header">功能</li>
                    <li class="nav-item">
                        <a href="/views/roi.html" title="股市計算機 | 報酬率快速算" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>報酬率快速算 <span class="text-danger"><small></small></span></p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/views/balance.html" title="股市計算機 | 損益平衡試算" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>損益平衡試算 <span class="text-danger"><small></small></span></p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/views/dayTrading.html" title="股市計算機 | 現股當沖試算" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>現股當沖試算</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/views/dayTradingMini.html" title="股市計算機 | 現股當沖試算(Mini)" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>現股當沖試算(Mini)</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/views/ETF.html" title="股市計算機 | ETF 試算" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>ETF 試算 <span class="text-danger"><small></small></span></p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/views/warrant.html" title="股市計算機 | 權證試算" class="nav-link">
                            <i class="fas fa-calculator custom-icon"></i>
                            <p>權證試算 <span class="text-danger"><small></small></span></p>
                        </a>
                    </li>
                    <li class="nav-header">網站資訊</li>
                    <li class="nav-item">
                        <a href="/views/question.html" title="股市計算機 | 常見問題" class="nav-link">
                        <i class="fas fa-question custom-icon"></i>
                            <p>常見問題</p>
                        </a>
                    </li>
                    <!--
                    <li class="nav-item">
                        <a href="/views/author.html" title="股市計算機 | 關於作者 & 網站" class="nav-link">
                            <i class="far fa-user-circle custom-icon"></i>
                            <p>關於作者 & 網站</p>
                        </a>
                    </li> -->
                </ul>
            </nav>
        </div>

        <!-- navbar -->
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-8969180932862200"
            data-ad-slot="9837343480"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </aside> 
`;

const content = $('#content');
const shareHTML = `
    <div class="shareSection">
        <!--<button class="round-icon btn btn-coffee text-white border" onclick="coffee()"><i class="fas fa-mug-hot"></i></button>-->
        <button class="round-icon btn btn-success border" onclick="share()"><i class="fas fa-share-alt"></i></button>
    </div>
`;

$(document).ready(function () {
    menuAndNavbar.html(menuContent);
    content.append(shareHTML);
});

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
};

ADcontent = [
    {
        'content': `<div class="text-center" style="line-height:36px;">
                        <H4><B>全新 2025 股市計算機 全新上線</B></h4>
                    </div>

                    <span style="font-size:18px;">
                        全新 2025 股市計算機 全新上線，新增了許多實用的功能，並且將網站改版成更現代化的樣式。
                        更簡潔更容易操作，且具備裝置儲存功能，與自定義表格等多種新功能。
                        在這邊作者邀請大家來體驗看看，並且提供一些寶貴的意見，讓我們一起打造更好的股市計算機。
                    </span>
                    `,
        'url': 'https://stock-calculator.net'
    }
];

ADnumber = getRandom(0, 3)
$.confirm({
    title: '',
    type: 'blue',
    columnClass: 'col-12 col-lg-4 col-md-6 p-3 overflow-scroll',
    content: ADcontent[ADnumber]['content'],
    buttons: {
        cancel: {
            text: '沒 興 趣',
        },
        sure: {
            text: '我 有 興 趣',
            btnClass: 'btn-primary',
            action: function () {
                window.open(ADcontent[ADnumber]['url'], '_blank');
            },
        }
    }
});