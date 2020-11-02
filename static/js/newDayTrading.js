function roundDecimal (val, precision) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}

class StockCalculator {
    /**
     * 建構子
     * 
     * @param {Float} discount 手續費折數
     * @param {Integer} lowestFee 最低手續費(元)
     * @param {Float} feePercen 原始手續費(%)
     * @param {} taxPercen 證交稅(%)
     * 
     */
    constructor (discount, lowestFee, feePercen, taxPercen) {
        this.discount = roundDecimal(discount * 0.1, 2);
        this.lowestFee = parseInt(lowestFee);
        this.feePercen = roundDecimal(feePercen * 0.01, 8);
        this.taxPercen = roundDecimal(taxPercen * 0.01, 4);
    }

    /**
     * 取得原始手續費
     * 
     * @param {Float} price 每股金額
     * @param {Integer} sheet 張數
     * 
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
     * @param Float price 每股金額
     * @param Integer sheet 張數
     */
    getDiscount (price, sheet) {
        let tmpDiscount = 0;
        let originFee = this.getOriginFee(price, sheet);
        if (originFee > this.lowestFee) {
            tmpDiscount = Math.floor(originFee - Math.floor(price * (sheet * 1000) * this.feePercen * this.discount));
        }

        return tmpDiscount;
    }
}