/*********************************************************************
 * Copyright © 2020 - 2021 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2021 HsiangYee 版權所有
 * 非經同意不得翻印轉載或以任何方式重製，以免侵犯臺灣智慧財產權須負責刑法與民法
 * 君子請自重 勿淪為小人，請勿以身試法，留下前科
 *********************************************************************/

const stockCalculator = new StockCalculator();
const discount = $('#discount');
const lowestFee = $('#lowestFee');
const unitType = $('#unit');
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
let unut = 1000;

let sellPrice = 0;
let sellOriginFee = 0;
let sellDiscount = 0;
let sellFee = 0;
let sellTax = 0;

let topNumber = 0;
let downNumber = 0;

function search () {
    unit = (unitType.prop('checked')) ? 1000 : 1;

    stockCalculator.setDiscount(discount.val());
    stockCalculator.setLowestFee(lowestFee.val());
    stockCalculator.setTaxPercen(0.1);
    stockCalculator.setUnit(unit);
    referencePoint = parseFloat(price.val());
    topNumber = parseFloat(price.val());
    downNumber = parseFloat(price.val());

    if (type.val() == 'buy') {
        buyPrice = parseFloat(price.val());
        buyOriginFee = stockCalculator.getOriginFee(buyPrice, sheet.val());
        buyDiscount = stockCalculator.getDiscount(buyPrice, sheet.val());
        buyFee = (discountType.val() == 'day') ? (buyOriginFee - buyDiscount) : buyOriginFee;

    } else if (type.val() == 'sell') {
        sellPrice = parseFloat(price.val());
        sellOriginFee = stockCalculator.getOriginFee(sellPrice, sheet.val());
        sellDiscount = stockCalculator.getDiscount(sellPrice, sheet.val());
        sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
        sellTax = stockCalculator.getTax(sellPrice, sheet.val());
    }
    
    setTable(price.val());
    showMoreTop();
    showMoreDown()

    toast.fire('success', '試算完成');
}

function setTable(price) {
    let tmpPrice = parseFloat(price);
    if (type.val() == 'buy') {
        sellPrice = parseFloat(tmpPrice);
        sellOriginFee = stockCalculator.getOriginFee(sellPrice, sheet.val());
        sellDiscount = stockCalculator.getDiscount(sellPrice, sheet.val());
        sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
        sellTax = stockCalculator.getTax(sellPrice, sheet.val());

    } else if (type.val() == 'sell') {
        buyPrice = parseFloat(tmpPrice);
        buyOriginFee = stockCalculator.getOriginFee(buyPrice, sheet.val());
        buyDiscount = stockCalculator.getDiscount(buyPrice, sheet.val());
        buyFee = (discountType.val() == 'day') ? (buyOriginFee - buyDiscount) : buyOriginFee;
    }

    let balance = parseInt(Math.round((sellPrice * sheet.val() * unit) - (buyPrice * sheet.val() * unit) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let bgClass = (referencePoint == tmpPrice) ? 'bg-light' : '';

    let content = `
        <tr class="curcursor-pointer ${bgClass}" onclick="details(${tmpPrice})">
            <td width="25%">${formatNumber(ETFFormatPoint(tmpPrice))}</td>
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
    } else if (type.val() == 'sell' && referencePoint != tmpPrice) {
        if (referencePoint > tmpPrice) {
            list.append(content);
        } else if (referencePoint < tmpPrice) {
            list.prepend(content);
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
    } else if (type.val() == 'sell') {
        buyPrice = parseFloat(tmpPrice);
        buyOriginFee = stockCalculator.getOriginFee(buyPrice, sheet.val());
        buyDiscount = stockCalculator.getDiscount(buyPrice, sheet.val());
        buyFee = (discountType.val() == 'day') ? (buyOriginFee - buyDiscount) : buyOriginFee;
    }

    let balance = parseInt(Math.round((sellPrice * sheet.val() * unit) - (buyPrice * sheet.val() * unit) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let rate = ((balance / Math.round(buyPrice * sheet.val() * unit)) * 100).toFixed(2) + "%";

    let buyDetails = (type.val() == 'dayTradingSell') ? ' - 回 補' : '';
    buyDetails = `
        <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入${buyDetails}</div>
        <table>
            <tr>
                <td>每股價格</td>
                <td>：${formatNumber(ETFFormatPoint(buyPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * unit)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(buyPrice * sheet.val() * unit)}</td>
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
                <td>：${formatNumber(ETFFormatPoint(sellPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * unit)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(sellPrice * sheet.val() * unit)}</td>
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
    } else if (type.val() == 'sell') {
        content = `
            <table>
            ${sellDetails}
            <hr />
            ${buyDetails}
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
            tmpPrice = ETFdownTick(topNumber);
            topNumber = tmpPrice;
            setTable(tmpPrice);
        }
    } else if (type.val() == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = ETFupTick(topNumber);
            topNumber = tmpPrice;
            setTable(tmpPrice);
        }
    }
}

function showMoreDown() {
    if (type.val() == 'buy') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = ETFupTick(downNumber);
            downNumber = tmpPrice;
            setTable(tmpPrice);
        }
    } else if (type.val() == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = ETFdownTick(downNumber);
            downNumber = tmpPrice;
            setTable(tmpPrice);
        }
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