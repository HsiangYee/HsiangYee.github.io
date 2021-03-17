/*********************************************************************
 * Copyright © 2020 - 2021 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2021 HsiangYee 版權所有
 *********************************************************************/

const marketing = [
    ["https://shp.ee/3jjpcry", "掌握市場週期+投資最重要的事", false],
    ["https://shp.ee/9kj7vah", "我畢業五年，用ETF賺到400萬：每月1,000元就能開始！不用兼差斜槓，兩檔ETF投資組合，年賺20%以上", false],
    ["https://shp.ee/arx669h", "窮查理的普通常識：巴菲特50年智慧合夥人查理．蒙格的人生哲學", false],
    ["https://shp.ee/msdvgwh", "投資金律：建立獲利投資組合的四大關鍵和十四個關卡", false],
    ["https://shp.ee/qbk996h", "投資終極戰：贏得輸家的遊戲──用指數型基金，打敗85％的市場參與者", false],
    ["https://shp.ee/8pwc28h", "漫步華爾街：超越股市漲跌的成功投資策略", false],
    ["https://shp.ee/a6zhjuw", "巴菲特寫給股東的信", false],
    ["https://shp.ee/ym43nbd", "股票作手回憶錄：養成洞悉人性與市場的贏家之眼", false],
    ["https://shp.ee/vjwdfkh", "金錢心理學：打破你對金錢的迷思，學會聰明花費", false],
    ["https://shp.ee/4gaudg7", "什麼才是經營最難的事？：矽谷創投天王告訴你真實的管理智慧", false],
    ["https://shp.ee/d88cc4d", "行為投資金律：現賺4％行為差距紅利，打敗90％資產管理專家的行為獲利法則", false],
    ["https://shp.ee/mpgd87v", "洞悉市場的人：量化交易之父吉姆‧西蒙斯與文藝復興公司的故事", false],
    ["https://shp.ee/gxeehhp", "信任邊際：巴菲特經營波克夏的獲利模式", false],
    ["https://shp.ee/sfg2ewm", "大債危機：橋水基金應對債務危機的原則", false],
    ["https://shp.ee/bn9j3ky", "堅持不懈：指數基金之父約翰‧柏格", false],
    ["https://shp.ee/u287p65", "貝佐斯傳：從電商之王到物聯網中樞，亞馬遜成功的關鍵", false],
    ["https://shp.ee/447w43v", "零規則：高人才密度x完全透明x最低管控，首度完整直擊Netflix圈粉全球的關鍵祕密", false],
    ["https://shp.ee/36t9cj4", "有錢人想的和你不一樣", false],
    ["https://shp.ee/9bwy95h", "存股輕鬆學：4年存300張金融股，每年賺自己的13%", false],
    ["https://shp.ee/ea67dun", "財務自由，提早過你真正想過的生活", false],
    ["https://shp.ee/2f5m6az", "3天搞懂股票買賣：「靠股票賺錢」需要的常識", false],
    ["https://shp.ee/ie6636f", "3天搞懂技術分析：看懂走勢、解讀線圖，橫掃股市乘風破浪！", false],
    ["https://shp.ee/8puxshf", "月入23K也能投資理財：小資必學賺錢法，擺脫月光族，為自己加薪30%", false],
    ["https://shp.ee/tmzir58", "複利效應：6步驟引爆收入、生活和各項成就倍數成長", false],
    ["https://shp.ee/kvjwdmz", "我的職業是股東：平凡的投資，豐富的收成", false],
    ["https://shp.ee/5dv9jp6", "七天讓你看懂股票線圖：輕鬆掌握買進、賣出時機！", false],
    ["https://shp.ee/shmq76b", "炒股的智慧：教你持續、長期、穩定買股，讓錢自然流進來", false],
    ["https://shp.ee/xtdqs2f", "圖解第一次買股票就上手", false],
    ["https://shp.ee/dtdk4hn", "權證小哥教你十萬元變千萬", false],
    ["https://shp.ee/nkrbjvz", "景氣循環投資", false],
    ["https://shp.ee/kft9tbz", "財報狗教你挖好股穩賺20%", false],
    ["https://shp.ee/84hvw6z", "社畜的財務自由計畫：最強脫魯傳說！早餐投資法，每天30分鐘，3年賺30億", false],
    ["https://shp.ee/ichx6r6", "主力的思維：日本神之散戶cis，發一條推特就能撼動日經指數", false],
    ["https://shp.ee/bqmn99f", "88張圖看懂 技術分析：你也能跟他一樣，10年賺到7000萬！", false],
    ["https://shp.ee/c3i2x5z", "紀律的交易者：培養贏的態度，成功的交易80％靠心理，只有20％靠技巧", false],
    ["https://shp.ee/j55qyyn", "反市場：JG股市操作原理", false],
    ["https://shp.ee/mc847pz", "通往財富自由之路：教你如何變得更有價值！早晚有一天，可以不再為了生活出售自己的時間", false],
    ["https://shp.ee/ts2bqgz", "怪老子的簡單理財課：不必死命存，一樣變有錢", false],
    ["https://shp.ee/9n4sfvb", "我用死薪水輕鬆理財賺千萬：16歲就能懂、26歲就置產的投資祕訣", false],
    ["https://shp.ee/4u5vxtz", "心態致富：從心態、行為到習慣，創造財富的69堂關鍵常識養成課", false],
    ["https://shp.ee/h64a7jc", "慢飆股台積電的啟示錄：發現一流企業的長相和深度投資價值", false],
    ["https://shp.ee/8e7wgru", "漫步華爾街的10條投資金律：經理人不告訴你，但投資前一定要知道的事", false],
    ["https://shp.ee/65wjikt", "淺談保險觀念：最敢說真話的保險專家，告訴你條約背後的真相", false],
    ["https://shp.ee/bixe4wy", "用心於不交易：我的長線投資獲利秘訣：下好離手，不要動作。", false],
    ["https://shp.ee/jz2vvgb", "華爾街操盤手給年輕人的15堂理財課", false],
    ["https://shp.ee/n4ecnpz", "產業隊長教你看對主流產業選飆股", false],
    ["https://shp.ee/m47vt8t", "我畢業五年，用ETF賺到400萬+存股輕鬆學", false],
    ["https://shp.ee/hurvhr3", "阿甘投資法：不看盤、不選股、不挑買點也能穩穩賺", false],
    ["https://shp.ee/5ybdy7h", "看懂線圖，新手也能輕鬆賺外匯：低門檻、高勝率的小資理財術！", false],
    ["https://shp.ee/2f85xte", "生活投資學：領股息、賺價差，最適合散戶的投資系統", false],
    ["https://shp.ee/8f5ey7b", "天搞懂ETF投資：跨市跨境高CP值，讓你繞著地球賺Ｎ圈！", false],
    ["https://shp.ee/xvan9zj", "只買4支股，年賺18%", false],
    ["https://shp.ee/suqsxtc", "掌握市場週期：價值投資大師霍華．馬克斯教你看對市場時機，提高投資勝算", false],
    ["https://shp.ee/x49buqu", "完整公開交易紀錄的肥羊養股術", false],
    ["https://shp.ee/4ma2tzu", "獨孤求敗選擇權獲利祕技：多空盤都能賺的入門5堂課", false],
    ["https://shp.ee/ueptaph", "零基礎的佛系理財術：只要一招，安心穩穩賺", false],
    ["https://shp.ee/av2brk7", "專買黑馬股 出手就賺30%", false],
    ["https://shp.ee/vbi6ueh", "投資心智：邁向財務自由的十二則練習，風靡全美的人生增值術", false],
    ["https://shp.ee/me74k3c", "思考致富：暢銷全球六千萬冊，「億萬富翁締造者」拿破崙‧希爾的13條成功白金法則", false],
    ["https://shp.ee/22rct2g", "為什麼你的退休金只有別人的一半？", false],
    ["https://shp.ee/f2ivnxh", "散戶投資上手的第一本書：投資股市最該懂的45件事，教你買對賣對，抓住賺錢機會", false],
    ["https://shp.ee/4fed76f", "我如何在股市賺到200萬美元", false],
    ["https://shp.ee/5fvm8qe", "為何賣掉就漲，買了就跌？：行為金融學教你避開人性弱點，擴大投資效益，實現財富自由！", false],
    ["https://shp.ee/vnqvjuh", "鯨吞億萬：一個大馬年輕人，行騙華爾街與好萊塢的真實故事", false],
    ["https://shp.ee/xxvj2ng", "3天搞懂美股買賣：不出國、不懂英文，也能靠蘋果、星巴克賺錢！", false],
    ["https://shp.ee/f48k4pg", "流浪教師存零股存到3000萬", false],
    ["https://shp.ee/jdimzhh", "順勢而為，贏在加碼：獨孤求敗的股票、期貨、選擇權交易絕技", false],
    ["https://shp.ee/7shpk8x", "任何股票都能翻倍賺的多空雙作線圖獲利法", false],
    ["https://shp.ee/9uuak6y", "有錢人的習慣，和你不一樣：10個生活習慣，註定你是低薪族，或者變有錢", false],
    ["https://shp.ee/wkc8gpp", "一個投機者的告白實戰書", false],
    ["https://shp.ee/9n7cm6h", "慢慢致富：告別金錢焦慮，77天思考練習不再害怕負債、低薪、沒工作，打造財務幸福循環", false],
    ["https://shp.ee/6u6xgah", "我只買上漲股：韓國第一股票Youtuber用100張線圖教你看穿主力動向，搭順風車買進下一支300%飆股", false],
    ["https://shp.ee/igy9cc4", "外匯交易圖表分析入門：從新手變行家，勝率逾7成的投資獲利術！", false],
    ["https://shp.ee/dmsgxrh", "美股投資學：跟著JC錢進美股，打造高速成長、穩健收息的投資組合，擁抱世界財富", false],
    ["https://shp.ee/cfh6w3h", "駕馭金錢：借力使力，創造財務自由，讓財富與人生價值最大化", false],
    ["https://shp.ee/2jxf2fh", "躺著賺1年400萬的肥羊養股術", false],
    ["https://shp.ee/sa7jxnh", "SOP一次上手 股票買賣：抄捷徑學習，一邊上班，一邊輕鬆買股票賺第一桶金", false],
    ["https://shp.ee/ghypmch", "巴比倫理財聖經：穩健創富的12項金律，影響超過數百萬名讀者的致富經典", false],
    ["https://shp.ee/xbt9qeh", "3天搞懂財經資訊：看懂財經新聞、企業財報不求人，找出年年下蛋的金雞母！", false],
    ["https://shp.ee/ry2gwfz", "51張K線圖，輕鬆破解股票何時該賣或買？：股市操盤手的不傳之祕，日本K線之神本間宗久的聚富心法", false],
    ["https://shp.ee/vx77agq", "賺錢，也賺幸福：讓你累積財富、享受人生的理財魔法書", false],
    ["https://shp.ee/xsyexvz", "他是賭神，更是股神：從賭城連贏到華爾街的天才數學家，關於風險、財富和人生的第一手告白", false],
    ["https://shp.ee/sys74hz", "養一檔會掙錢的股票", false],
    ["https://shp.ee/aabz9fz", "財務自由的人生：跟著首席分析師楊應超學華爾街的投資技巧和工作效率，40歲就過FIRE的優質生活", false],
    ["https://shp.ee/284qk6k", "日本FX專家的7天外匯交易課：初學者也能年獲利20～30％", false],
    ["https://shp.ee/ingwndq", "3天搞懂權證買賣：1000元就能投資，獲利最多15倍，存款簿多一個0！", false],
    ["https://shp.ee/ttg43tj", "上流哥：這年頭存錢比投資更重要", false],
    ["https://shp.ee/9jka48z", "花掉的錢都會自己流回來：啟動「金錢螺旋」，用錢越多反而更有錢", false],
    ["https://shp.ee/wyjk78j", "逮到底部，大膽進場：學會用11個訊號賺股市的大錢", false],
    ["https://shp.ee/ndz47wz", "華倫老師存股系列 養對股票存千萬", false],
    ["https://tinyurl.com/ygbl5p42", "金融市場 x 程式交易：通往財富自由之路", false],
    ["https://tinyurl.com/yg2vjcoc", "量價交易精隨：打造股票、期貨完美交易策略", false],
    ["https://tinyurl.com/yedh6okm", "散戶必看！台股擂台王的波段操作心法", false],
    ["https://tinyurl.com/yhuznghr", "雷浩斯價值投資：用質化分析找出價值成長股", false],
    ["https://tinyurl.com/yecnpg4m", "掌握關鍵數據，黃金、原油投資高勝率全攻略", false],
    ["https://tinyurl.com/ygb9lt7n", "總經投資必學，看懂美中歐三大央行政策！", false],
    ["https://tinyurl.com/yenk2pck", "24 單元入門投資科學 一次搞懂投資必備知識", false],
    ["https://tinyurl.com/ygptsuos", "小錢投資大公司，受用一生美股投資觀念", false],
    ["https://tinyurl.com/yggkv9cc", "小資族 ETF 狠會賺投資法", false],
    ["https://tinyurl.com/yz2k8vx5", "15 單元看懂經濟運行，掌握全球投資趨勢", false],
    ["https://tinyurl.com/yh35vp3w", "小資生活投資學，美股研究趣", false],
    ["https://tinyurl.com/yelvna98", "股市投資新手策略筆記", false],
    ["https://tinyurl.com/ygy2mbn9", "利息養成現金流：債券入門投資術", false],
    ["https://tinyurl.com/yensfvod", "總體經濟投資術：用數據分析清楚了解市場", false],
    ["https://tinyurl.com/yfozq3dh", "股市投資實務", false],
    ["https://tinyurl.com/yg2dx2qp", "上班族的存股投資術", false],
    ["https://tinyurl.com/yk2bd9l8", "養個股兒子︱要存就存冷門股", false]
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const countLink = marketing.length;
let adsHtml = '';
let time = 0;
finish = false;
while(!finish){
    let tmp = marketing[getRandomInt(countLink)];
    if (!tmp[2]) {
        time ++ ;
        tmp[2] = true;
        adsHtml += `<a href="${tmp[0]}" target="_blank">${tmp[1]}</a> <hr />`;
    }

    if (time == 6) {
        finish = true;
    } else {
        adsHtml += '<hr>';
    }
}

$('#marketing').html(adsHtml);