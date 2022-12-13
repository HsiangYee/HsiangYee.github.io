/*********************************************************************
 * Copyright © 2020 - 2022 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2022 HsiangYee 版權所有
 * 非經同意不得翻印轉載或以任何方式重製，以免侵犯臺灣智慧財產權須負責刑法與民法
 * 君子請自重 勿淪為小人，請勿以身試法，留下前科
 *********************************************************************/

const stockCalculator = new StockCalculator();
const discount = $('#discount');
const lowestFee = $('#lowestFee');
const discountType = $('#discountType');
const price = $('#price');
const sheet = $('#sheet');
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
    stockCalculator.setTaxPercen(0.1);
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
    sellTax = stockCalculator.getTax(sellPrice, sheet.val())

    let balance = parseInt(Math.round((sellPrice * sheet.val() * 1000) - (buyPrice * sheet.val() * 1000) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let bgClass = (referencePoint == tmpPrice) ? 'bg-light' : '';

    let content = `
        <tr class="curcursor-pointer ${bgClass}" onclick="details(${tmpPrice})">
            <td width="25%">${formatNumber(warrantFormatPoint(tmpPrice))}</td>
            <td width="25%">${formatNumber(buyFee + sellFee)}</td>
            <td width="25%">${formatNumber(sellTax)}</td>
            <td width="25%">${coloring(formatNumber(balance))}</td>
        </tr>
    `;

    if (referencePoint == tmpPrice) {
        list.html(content);
    } else if (referencePoint != tmpPrice) {
        if (referencePoint > tmpPrice) {
            list.prepend(content);
        } else if (referencePoint < tmpPrice) {
            list.append(content);
        }
    }
}

function details(price) {
    let tmpPrice = parseFloat(price);

    sellPrice = parseFloat(tmpPrice);
    sellOriginFee = stockCalculator.getOriginFee(sellPrice, sheet.val());
    sellDiscount = stockCalculator.getDiscount(sellPrice, sheet.val());
    sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
    sellTax = stockCalculator.getTax(sellPrice, sheet.val());

    let balance = parseInt(Math.round((sellPrice * sheet.val() * 1000) - (buyPrice * sheet.val() * 1000) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let rate = ((balance / Math.round(buyPrice * sheet.val() * 1000)) * 100).toFixed(2) + "%";

    let buyDetails = `
        <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入</div>
        <table>
            <tr>
                <td>每股價格</td>
                <td>：${formatNumber(warrantFormatPoint(buyPrice))}</td>
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
                <td>：${formatNumber(warrantFormatPoint(sellPrice))}</td>
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

    let content = `
        <table>
        ${buyDetails}
        <hr />
        ${sellDetails}
        <hr />
        ${balanceDetails} <br />
    `;

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
    for (i = 0 ; i < 3 ; i ++) {
        tmpPrice = warrantDownTick(topNumber);
        topNumber = tmpPrice;
        setTable(tmpPrice);
    }
}

function showMoreDown() {
    for (i = 0 ; i < 3 ; i ++) {
        tmpPrice = warrantUpTick(downNumber);
        downNumber = tmpPrice;
        setTable(tmpPrice);
    }
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

function lowestFeeChange () {
    if (lowestFee.val() <= 0) {
        $('#lowestFeeAlert').html('提醒：證券商手續費通常最低是1元')
    } else {
        $('#lowestFeeAlert').html('')
    }
}

search();