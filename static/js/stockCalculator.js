class StockCalculator {
    /**
     * 建構子
     * 
     * @param {Float} discount - 手續費折數
     * @param {Integer} lowestFee - 最低手續費(元)
     * @param {Float} feePercen - 原始手續費(%)
     * @param {Float} taxPercen - 證交稅(%)
     * 
     */
    constructor (discount = 10, lowestFee = 20, feePercen = 0.1425, taxPercen = 0.3) {
        this.discount = roundDecimal(discount * 0.1, 2);
        this.lowestFee = parseInt(lowestFee);
        this.feePercen = roundDecimal(feePercen * 0.01, 8);
        this.taxPercen = roundDecimal(taxPercen * 0.01, 4);
    }

    /**
     * 設定手續費折讓
     * 
     * @param {Float} discount - 手續費折讓
     * 
     * @return Void
     */
    setDiscount (discount) {
        this.discount = roundDecimal(discount * 0.1, 2);
    }

    /**
     * 設定最低手續費
     * 
     * @param {Float} lowestFee - 最低手續費
     * 
     * @return Void
     */
    setLowestFee (lowestFee) {
        this.lowestFee = parseInt(lowestFee);
    }

    /**
     * 設定證交稅
     * 
     * @param {Float} lowestFee - 證交稅(%)
     * 
     * @return Void
     */
    setTaxPercen (taxPercen) {
        this.taxPercen = roundDecimal(taxPercen * 0.01, 4);
    }

    /**
     * 取得原始手續費
     * 
     * @param {Float} price - 每股金額
     * @param {Integer} sheet - 張數
     * 
     * @return {Integer} 原始手續費
     */
    getOriginFee (price, sheet) {
        let tmpFee = Math.floor(price * (sheet * 1000) * this.feePercen);
        if (tmpFee <= this.lowestFee) {
            tmpFee = this.lowestFee;
        }

        return tmpFee;
    }

    /**
     * 取得退回金額
     * 
     * @param {Float} price - 每股金額
     * @param {Integer} sheet - 張數
     * 
     * @return {Integer} 退回金額
     */
    getDiscount (price, sheet) {
        let tmpDiscount = 0;
        let originFee = this.getOriginFee(price, sheet);
        if (originFee > this.lowestFee) {
            tmpDiscount = Math.floor(originFee - Math.floor(price * (sheet * 1000) * this.feePercen * this.discount));
        }

        return tmpDiscount;
    }

    /**
     * 取得證交稅金額
     * 
     * @param {Float} price - 每股金額
     * @param {Integer} sheet - 張數
     * 
     * @return {Integer} 退回金額
     */
    getTax (price, sheet) {
        return Math.floor(price * (sheet * 1000) * this.taxPercen);
    }
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

function coloring (number) {
    let num = number.toString();
    if (num.indexOf('-') < 0) {
        return `<span style="color:#dc3545">${num}</span>`;
    } else {
        return `<span style="color:#28a745">${num}</span>`;
    }
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