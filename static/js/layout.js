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
                    <a href="index.html" class="nav-link">
                        <i class="fas fa-home custom-icon"></i>
                        <p>首頁</p>
                    </a>
                </li>
                <li class="nav-header">功能</li>
                <li class="nav-item">
                    <a href="roi.html" class="nav-link">
                        <i class="fas fa-calculator custom-icon"></i>
                        <p>報酬率快速算</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="balance.html" class="nav-link">
                        <i class="fas fa-calculator custom-icon"></i>
                        <p>損益平衡試算</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="dayTrading.html" class="nav-link">
                        <i class="fas fa-calculator custom-icon"></i>
                        <p>現股當沖試算</p>
                    </a>
                </li>
                <li class="nav-header">網站資訊</li>
                <li class="nav-item">
                    <a href="author.html" class="nav-link">
                        <i class="far fa-user-circle custom-icon"></i>
                        <p>關於作者 & 網站</p>
                    </a>
                </li>
            </ul>
        </nav>
    </aside> 
`;

const content = $('#content');
const shareHTML = `
    <div class="shareSection">
        <!--<button class="round-icon btn btn-coffee text-white border" onclick="coffee()"><i class="fas fa-mug-hot"></i></button>-->
        <button class="round-icon btn btn-success border" onclick="share()"><i class="fas fa-share-alt"></i></button>
    </div>
`;




$(document).ready(function (){
    menuAndNavbar.html(menuContent);
    content.append(shareHTML);
});