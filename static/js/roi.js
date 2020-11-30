const stockCalculator = new StockCalculator();
const discount = $('#discount');
const lowestFee = $('#lowestFee');
const discountType = $('#discountType');
const buyPrice = $('#buyPrice');
const sellPrice = $('#sellPrice');
const sheet = $('#sheet');
const type = $('#type');
const list = $('#list');
let buyOriginFee = 0;
let buyDiscount = 0;
let buyFee = 0;

let sellOriginFee = 0;
let sellDiscount = 0;
let sellFee = 0;
let sellTax = 0;

function details() {
    stockCalculator.setDiscount(discount.val());
    stockCalculator.setLowestFee(lowestFee.val());
    stockCalculator.setTaxPercen(0.3);

    if (type.val() == 'general') {
        stockCalculator.setTaxPercen(0.3);
    } else if (type.val() == 'dayTradingBuy' || type.val() == 'dayTradingSell') {
        stockCalculator.setTaxPercen(0.15);
    }

    let tmpBuyPrice = parseFloat(buyPrice.val());
    buyOriginFee = stockCalculator.getOriginFee(tmpBuyPrice, sheet.val());
    buyDiscount = stockCalculator.getDiscount(tmpBuyPrice, sheet.val());
    buyFee = (discountType.val() == 'day') ? (buyOriginFee - buyDiscount) : buyOriginFee;

    let tmpSellPrice = parseFloat(sellPrice.val());
    sellOriginFee = stockCalculator.getOriginFee(tmpSellPrice, sheet.val());
    sellDiscount = stockCalculator.getDiscount(tmpSellPrice, sheet.val());
    sellFee = (discountType.val() == 'day') ? (sellOriginFee - sellDiscount) : sellOriginFee;
    sellTax = stockCalculator.getTax(tmpSellPrice, sheet.val());


    let balance = parseInt(Math.round((tmpSellPrice * sheet.val() * 1000) - (tmpBuyPrice * sheet.val() * 1000) - ((buyOriginFee - buyDiscount) + (sellOriginFee - sellDiscount) + sellTax)));
    let rate = ((balance / Math.round(tmpBuyPrice * sheet.val() * 1000)) * 100).toFixed(2) + "%";

    let buyDetails = (type.val() == 'sell') ? ' - 回 補' : '';
    buyDetails = `
        <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入${buyDetails}</div>
        <table>
            <tr>
                <td>每股價格</td>
                <td>：${formatNumber(formatPoint(tmpBuyPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * 1000)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(Math.round(tmpBuyPrice * sheet.val() * 1000))}</td>
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
                <td>：${formatNumber(formatPoint(tmpSellPrice))}</td>
            </tr>
            <tr>
                <td>股數</td>
                <td>：${formatNumber(sheet.val() * 1000)}</td>
            </tr>
            <tr>
                <td>價金</td>
                <td>：${formatNumber(Math.round(tmpSellPrice * sheet.val() * 1000))}</td>
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
    if (type.val() == 'general' || type.val() == 'dayTradingBuy') {
        content = `
            <table>
            ${buyDetails}
            <hr />
            ${sellDetails}
            <hr />
            ${balanceDetails} <br />
        `;
    } else if (type.val() == 'dayTradingSell') {
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

    toast.fire('success', '試算完成');
}

function typeQuestion () {
    let content = `
        是的，目前僅提供現股和現股當沖試算。 <br />
        融資融券已在開發階段，請敬請期待！
    `;
    $.confirm({
        title: '只有現股和現股當沖?',
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