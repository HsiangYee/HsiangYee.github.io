let discount;
let discountType;
let fee;
let price;
let type;
let sheet;
let list = $('#list');

// 手續費
let priceFee;
let originPriceFee;
let monthPriceDiscount;

// 最上面 tick , 最下面 tick
let topNumber;
let downNumber;

function compute(tmpPrice) {
    let tax = 0;
    let balance = 0;

    // 手續費試算
    let tmpPriceFee = Math.floor(tmpPrice * sheet * 0.001425 * discount);
    tmpPriceFee = (tmpPriceFee < fee) ? fee : tmpPriceFee;

    tmpFee = priceFee + tmpPriceFee;

    // 損益試算, tax 證交稅
    if (type == 'buy') {
        tax = Math.floor(tmpPrice * sheet * 0.0015);
        balance = Math.round(tmpPrice * sheet) - Math.round(price * sheet) - tmpFee - tax;
    } else if (type == 'sell') {
        tax = Math.floor(price * sheet * 0.0015);
        balance = Math.round(price * sheet) - Math.round(tmpPrice * sheet) - tmpFee - tax;
    }

    // 產生 table
    let tmpList = '';
    if (price == tmpPrice) {
        tmpList = `
            <tr class="bg-light curcursor-pointer" onclick="alertConfirm(${tmpPrice})">
                <td width="25%">${formatNumber(formatPoint(tmpPrice))}</td>
                <td width="25%">${formatNumber(tmpFee)}</td>
                <td width="25%">${formatNumber(tax)}</td>
                <td width="25%">${coloring(formatNumber(balance))}</td>
            </tr>
        `;
        
        list.html(tmpList);
    } else {
        tmpList = `
            <tr class="curcursor-pointer" onclick="alertConfirm(${tmpPrice})">
                <td width="25%">${formatNumber(formatPoint(tmpPrice))}</td>
                <td width="25%">${formatNumber(tmpFee)}</td>
                <td width="25%">${formatNumber(tax)}</td>
                <td width="25%">${coloring(formatNumber(balance))}</td>
            </tr>
        `;
    }

    if (type == 'buy' && price != tmpPrice) {
        if (price < tmpPrice) {
            list.append(tmpList);
        } else if (price > tmpPrice) {
            list.prepend(tmpList);
        }
    } else if (type == 'sell' && price != tmpPrice) {
        if (price < tmpPrice) {
            list.prepend(tmpList);
        } else if (price > tmpPrice) {
            list.append(tmpList);
        }
    }
}

function alertConfirm(tmpPrice) {
    let tax = 0;
    let balance = 0;
    let rate;

    // 手續費試算
    let originTmpPriceFee = Math.floor(tmpPrice * sheet * 0.001425);
    let tmpPriceFee = Math.floor(tmpPrice * sheet * 0.001425 * discount);
    tmpPriceFee = (tmpPriceFee < fee) ? fee : tmpPriceFee;
    let monthTmpPriceDiscount = Math.floor(tmpPrice * sheet * 0.001425 * (1 - discount));
    monthTmpPriceDiscount = (tmpPriceFee <= fee) ? 0 : monthTmpPriceDiscount;

    tmpFee = priceFee + tmpPriceFee;

    // 損益試算, tax 證交稅
    if (type == 'buy') {
        tax = Math.floor(tmpPrice * sheet * 0.0015);
        balance = Math.round(tmpPrice * sheet) - Math.round(price * sheet) - tmpFee - tax;
        rate = ((balance / (Math.round(price * sheet) + tmpFee + tax)) * 100).toFixed(2);
        rate = reateColoring(rate);
    } else if (type == 'sell') {
        tax = Math.floor(price * sheet * 0.0015);
        balance = Math.round(price * sheet) - Math.round(tmpPrice * sheet) - tmpFee - tax;
        rate = ((balance / Math.round(tmpPrice * sheet)) * 100).toFixed(2);
        rate = reateColoring(rate);
    }

    if (type == 'buy') {
        if (discountType == 'day') {
            content = `
                <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入</div>
                <table>
                    <tr>
                        <td>持有成本</td>
                        <td>：${formatNumber(formatPoint(price * sheet))}</td>
                    </tr>
                    <tr>
                        <td>手續費</td>
                        <td>：${formatNumber(priceFee)}</td>
                    </tr>
                </table>
                <br />
                <div class="rounded text-center" style="background:#28a745;color:#fff">賣 出</div>
                <table>
                    <tr>
                        <td>沖銷金額</td>
                        <td>：${formatNumber(formatPoint(tmpPrice * sheet))}</td>
                    </tr>
                    <tr>
                        <td>手續費</td>
                        <td>：${formatNumber(tmpPriceFee)}</td>
                    </tr>
                    <tr>
                        <td>證交稅</td>
                        <td>：${formatNumber(tax)}</td>
                    </tr>
                </table>

                <hr />

                <table>
                    <tr>
                        <td>報酬率</td>
                        <td>：${rate}</td>
                    </tr>
                    <tr>
                        <td>損益</td>
                        <td>：${coloring(formatNumber(balance))}</td>
                    </tr>
                </table>
            `;
        } else if (discountType == 'month') {
            content = `
                <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入</div>
                    <table>
                        <tr>
                            <td>持有成本</td>
                            <td>：${formatNumber(formatPoint(price * sheet))}</td>
                        </tr>
                        <tr>
                            <td>手續費</td>
                            <td>：${formatNumber(originPriceFee)}</td>
                        </tr>
                    </table>
                    <br />
                    <div class="rounded text-center" style="background:#28a745;color:#fff">賣 出</div>
                    <table>
                        <tr>
                            <td>沖銷金額</td>
                            <td>：${formatNumber(formatPoint(tmpPrice * sheet))}</td>
                        </tr>
                        <tr>
                            <td>手續費</td>
                            <td>：${formatNumber(originTmpPriceFee)}</td>
                        </tr>
                        <tr>
                            <td>證交稅</td>
                            <td>：${formatNumber(tax)}</td>
                        </tr>
                    </table>

                    <hr />

                    <table>
                        <tr>
                            <td>折讓金額</td>
                            <td>：${formatNumber(monthPriceDiscount + monthTmpPriceDiscount)}</td>
                        </tr>
                        <tr>
                            <td>報酬率</td>
                            <td>：${rate}</td>
                        </tr>
                        <tr>
                            <td>損益</td>
                            <td>：${coloring(formatNumber(balance))}</td>
                        </tr>
                    </table>
                `;
        }
        
    } else if (type= 'sell') {
        content = `
            <div class="rounded text-center" style="background:#28a745;color:#fff">賣 出</div>
            <table>
                <tr>
                    <td>持有成本</td>
                    <td>：${formatNumber(formatPoint(price * sheet))}</td>
                </tr>
                <tr>
                    <td>手續費</td>
                    <td>：${formatNumber(priceFee)}</td>
                </tr>
                <tr>
                    <td>證交稅</td>
                    <td>：${formatNumber(tax)}</td>
                </tr>
            </table>
            <br />
            <div class="rounded text-center" style="background:#dc3545;color:#fff">買 入 - 回補</div>
            <table>
                <tr>
                    <td>沖銷金額</td>
                    <td>：${formatNumber(formatPoint(tmpPrice * sheet))}</td>
                </tr>
                <tr>
                    <td>手續費</td>
                    <td>：${formatNumber(tmpPriceFee)}</td>
                </tr>                
            </table>

            <hr />

            <table>
                <tr>
                    <td>報酬率</td>
                    <td>：${rate}</td>
                </tr>
                <tr>
                    <td>損益</td>
                    <td>：${coloring(formatNumber(balance))}</td>
                </tr>
            </table>
        `;
    }

    $.confirm({
        title: '交易明細',
        type: 'blue',
        content: content,
        buttons: {
            cancel: {
                text: '關 閉',
            }
        }
    });
}


function showMoreTop() {
    if (type == 'buy') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = downTick(topNumber);
            topNumber = tmpPrice;
            compute(tmpPrice);
        }
    } else if (type == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = upTick(topNumber);
            topNumber = tmpPrice;
            compute(tmpPrice);
        }
    }
}

function showMoreDown() {
    if (type == 'buy') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = upTick(downNumber);
            downNumber = tmpPrice;
            compute(tmpPrice);
        }
    } else if (type == 'sell') {
        for (i = 0 ; i < 3 ; i ++) {
            tmpPrice = downTick(downNumber);
            downNumber = tmpPrice;
            compute(tmpPrice);
        }
    }
}

function search() {
    discount = roundDecimal(($('#discount').val() / 10), 2);
    discountType = $('#discountType').val();
    fee = parseInt($('#fee').val());
    price = parseFloat($('#price').val());
    type = $('#type').val();
    sheet = parseInt($('#sheet').val()) * 1000;

    priceFee = Math.floor(price * sheet * 0.001425 * discount);
    priceFee = (priceFee < fee) ? fee : priceFee;

    originPriceFee = Math.floor(price * sheet * 0.001425);
    originPriceFee = (originPriceFee < fee) ? fee : originPriceFee;

    monthPriceDiscount = Math.floor(price * sheet * 0.001425 * (1 - discount));
    monthPriceDiscount = (priceFee <= fee) ? 0 : monthPriceDiscount;

    topNumber = price;
    downNumber = price;

    compute(price);
    showMoreTop();
    showMoreDown();
}

function upTick(price) {
    price = parseFloat(price);
    let tick = 0;
    if (price < 10){
        tick = 0.01;
    }

    if (price >= 10 && price < 50){
        tick = 0.05;
    }

    if (price >= 50 && price < 100){
        tick = 0.1;
    }

    if (price >= 100 && price < 500){
        tick = 0.5;
    }

    if (price >= 500 && price < 1000){
        tick = 1;
    }

    if (price >= 1000){
        tick = 5;
    }

    price = price + tick;
    return price.toFixed(2);
  }

  function downTick(price) {
    price = parseFloat(price);
    let tick = 0;
    if (price <= 10){
        tick = 0.01;
    }

    if (price > 10 && price <= 50){
        tick = 0.05;
    }

    if (price > 50 && price <= 100){
        tick = 0.1;
    }

    if (price > 100 && price <= 500){
        tick = 0.5;
    }

    if (price > 500 && price <= 1000){
        tick = 1;
    }

    if (price > 1000){
        tick = 5;
    }

    price = price - tick;
    return price.toFixed(2);
  }

function roundDecimal (val, precision) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}


function formatNumber(number) {
    var num = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
      
    while(pattern.test(num)){
      num = num.replace(pattern, "$1,$2");
    }
    return num;
}

function formatPoint (price) {
    price = parseFloat(price);
    if (price < 50){
        return price.toFixed(2);
    }

    if (price >= 50  && price <= 500){
        return price.toFixed(1);
    }

    if (price >= 500){
        return price.toFixed(0);
    }
}

function coloring (num) {
    if (num.indexOf('-') < 0) {
        return `<span style="color:#dc3545">${num}</span>`;
    } else {
        return `<span style="color:#28a745">${num}</span>`;
    }
}

function reateColoring (num) {
    if (num.indexOf('-') < 0) {
        return `<span style="color:#dc3545">${num} %</span>`;
    } else {
        return `<span style="color:#28a745">${num} %</span>`;
    }
}

search()


function discountQuestion () {
    let content = `
        打 6 折請填 6 <br />
        打 28 折請填 2.8 <br />
        以此類推 <br />
    `;
    $.confirm({
        title: '如何填寫?',
        type: 'blue',
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
        title: '如何填寫?',
        type: 'blue',
        content: content,
        buttons: {
            cancel: {
                text: '關 閉',
            }
        }
    });
}