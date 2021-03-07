/*********************************************************************
 * Copyright © 2020 - 2021 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2021 HsiangYee 版權所有
 *********************************************************************/

const stockCalculator = new StockCalculator();
const discount = $('#discount');
const lowestFee = $('#lowestFee');
const discountType = $('#discountType');
const price = $('#price');
const sheet = $('#sheet');
const type = $('#type');
const list = $('#list');
let referencePoint = 0;
let buyPrice = 0;
let buyOriginFee = 0;
let buyDiscount = 0;
let buyFee = 0;

let sellPrice = 0;
let sellOriginFee = 0;
let sellDiscount = 0;
let sellFee = 0;
let sellTax = 0;

let topNumber = 0;
let downNumber = 0;

function search () {
    stockCalculator.setDiscount(discount.val());
    stockCalculator.setLowestFee(lowestFee.val());
    stockCalculator.setTaxPercen(0.3);
    referencePoint = parseFloat(price.val());
    topNumber = parseFloat(price.val());
    downNumber = parseFloat(price.val());

    buyPrice = parseFloat(price.val());
    buyOriginFee = stockCalculator.getOriginFee(buyPrice, sheet.val());
    buyDiscount = stockCalculator.getDiscount(buyPrice, sheet.val());
    buyFee = (discountType.val() == 'day') ? (buyOriginFee - buyDiscount) : buyOriginFee;

    setTable(price.val());
    showMoreTop();
    showMoreDown()

    toast.fire('success', '試算完成');
}

function setTable(price) {
    let tmpPrice = parseFloat(price);
    sellPrice = parseFloat(tmpPrice);
    sellOriginFee = stockCalculator.getOriginFee(sellPrice, sheet.val());
    sellDiscount = stockCalculator.getDiscount(sellPrice, sheet.val());
    sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
    sellTax = stockCalculator.getTax(sellPrice, sheet.val());


    let balance = parseInt(Math.round((sellPrice * sheet.val() * 1000) - (buyPrice * sheet.val() * 1000) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let bgClass = (referencePoint == tmpPrice) ? 'bg-light' : '';

    let content = `
        <tr class="curcursor-pointer ${bgClass}" onclick="details(${tmpPrice})">
            <td width="25%">${formatNumber(formatPoint(tmpPrice))}</td>
            <td width="25%">${formatNumber(buyFee + sellFee)}</td>
            <td width="25%">${formatNumber(sellTax)}</td>
            <td width="25%">${coloring(formatNumber(balance))}</td>
        </tr>
    `;

    if (referencePoint == tmpPrice) {
        list.html(content);
    } else if (type.val() == 'buy' && referencePoint != tmpPrice) {
        if (referencePoint > tmpPrice) {
            list.prepend(content);
        } else if (referencePoint < tmpPrice) {
            list.append(content);
        }
    }
}

function details(price) {
    let tmpPrice = parseFloat(price);
    if (type.val() == 'buy') {
        sellPrice = parseFloat(tmpPrice);
        sellOriginFee = stockCalculator.getOriginFee(sellPrice, sheet.val());
        sellDiscount = stockCalculator.getDiscount(sellPrice, sheet.val());
        sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
        sellTax = stockCalculator.getTax(sellPrice, sheet.val());
    }

    let balance = parseInt(Math.round((sellPrice * sheet.val() * 1000) - (buyPrice * sheet.val() * 1000) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let rate = ((balance / Math.round(buyPrice * sheet.val() * 1000)) * 100).toFixed(2) + "%";

    let buyDetails = (type.val() == 'sell') ? ' - 回 補' : '';
    buyDetails = `
        <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入${buyDetails}</div>
        <table>
            <tr>
                <td>每股價格</td>
                <td>：${formatNumber(formatPoint(buyPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * 1000)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(Math.round(buyPrice * sheet.val() * 1000))}</td>
            </tr>
            <tr>
                <td>手續費</td>
                <td>：${formatNumber(buyFee)}</td>
            </tr>
        </table>
    `;
    let sellDetails = `
        <div class="rounded text-center" style="background:#28a745;color:#fff">賣 出</div>
        <table>
            <tr>
                <td>每股價格</td>
                <td>：${formatNumber(formatPoint(sellPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * 1000)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(Math.round(sellPrice * sheet.val() * 1000))}</td>
            </tr>
            <tr>
                <td>手續費</td>
                <td>：${formatNumber(sellFee)}</td>
            </tr>
            <tr>
                <td>證交稅</td>
                <td>：${formatNumber(sellTax)}</td>
            </tr>
        </table>
    `;

    let monthDiscount = (discountType.val() == 'month') ? `
        <tr>
            <td>退佣</td>
            <td>：${formatNumber(buyDiscount + sellDiscount)}</td>
        </tr>
    ` : '';
    let balanceDetails = `
        <table>
            ${monthDiscount}
            <tr>
                <td>報酬率</td>
                <td>：${coloring(rate)}</td>
            </tr>
            <tr>
                <td>損益</td>
                <td>：${coloring(formatNumber(balance))}</td>
            </tr>
        </table>
    `;

    let content = '';
    if (type.val() == 'buy') {
        content = `
            <table>
            ${buyDetails}
            <hr />
            ${sellDetails}
            <hr />
            ${balanceDetails} <br />
        `;
    }

    $.confirm({
        title: '交易明細',
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

function showMoreTop() {
    if (type.val() == 'buy') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = downTick(topNumber);
            topNumber = tmpPrice;
            setTable(tmpPrice);
        }
    } else if (type.val() == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = upTick(topNumber);
            topNumber = tmpPrice;
            setTable(tmpPrice);
        }
    }
}

function showMoreDown() {
    if (type.val() == 'buy') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = upTick(downNumber);
            downNumber = tmpPrice;
            setTable(tmpPrice);
        }
    } else if (type.val() == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = downTick(downNumber);
            downNumber = tmpPrice;
            setTable(tmpPrice);
        }
    }
}

function typeQuestion () {
    let content = `
        是的，目前僅提供現股買入試算。 <br />
        融資融券已在開發階段，請敬請期待！
    `;
    $.confirm({
        title: '只有現股買入?',
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

function discountQuestion () {
    let content = `
        打 6 折請填 6 <br />
        打 28 折請填 2.8 <br />
        以此類推 <br />
    `;
    $.confirm({
        title: '如何填寫?',
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

function discountTypeQuestion () {
    let content = `
        日退 - 手續費會直接扣除折讓金額 <br />
        月退 - 手續費不會扣除折讓金額，並另外顯示月退金額 <br />
    `;
    $.confirm({
        title: '計算方式?',
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

search();