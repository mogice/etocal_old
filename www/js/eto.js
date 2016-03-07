// This is a JavaScript file

(function(lib) {
  var COEFFICIENT = 24 * 60 * 60 * 1000; //日数とミリ秒を変換する係数
  var DATES_OFFSET = 70 * 365 + 17 + 2; //「1900/1/0」～「1970/1/1」 (日数)
  var MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000; //UTCとJSTの時差 (ミリ秒)
  lib.EtoObj = function(date) {
    var hiduke = new Date(date);
    hiduke.setHours(0);
    hiduke.setMinutes(0);
    hiduke.setSeconds(0);
    hiduke.setMilliseconds(0);
    var yTrunkNum = (hiduke.getFullYear() + 6) % 10 + 1;
    var yBranchNum = (hiduke.getFullYear() + 8) % 12 + 1;
    var dTrunkNum = (((hiduke.getTime() + MILLIS_DIFFERENCE) / COEFFICIENT + DATES_OFFSET) - 2) % 10 + 1;
    var dBranchNum = (((hiduke.getTime() + MILLIS_DIFFERENCE) / COEFFICIENT + DATES_OFFSET) + 8) % 12 + 1;
    this.yJikkan = this.trunk(yTrunkNum);
    this.yJyunishi = this.branch(yBranchNum);
    this.dJikkan = this.trunk(dTrunkNum);
    this.dJyunishi = this.branch(dBranchNum);
  };
  var p = lib.EtoObj.prototype;
  p.trunk = function(trunkNum) {
    var trunkList = {
      1 : { 'kanji' : '甲', 'yomi' : 'きのえ', 'imi' : '木の兄', },
      2 : { 'kanji' : '乙', 'yomi' : 'きのと', 'imi' : '木の弟', },
      3 : { 'kanji' : '丙', 'yomi' : 'ひのえ', 'imi' : '火の兄', },
      4 : { 'kanji' : '丁', 'yomi' : 'ひのと', 'imi' : '火の弟', },
      5 : { 'kanji' : '戊', 'yomi' : 'つちのえ', 'imi' : '土の兄', },
      6 : { 'kanji' : '己', 'yomi' : 'つちのと', 'imi' : '土の弟', },
      7 : { 'kanji' : '庚', 'yomi' : 'かのえ', 'imi' : '金の兄', },
      8 : { 'kanji' : '辛', 'yomi' : 'かのと', 'imi' : '金の弟', },
      9 : { 'kanji' : '壬', 'yomi' : 'みずのえ', 'imi' : '水の兄', },
      10 : { 'kanji' : '癸', 'yomi' : 'みずのと', 'imi' : '水の弟', },
    };
    return trunkList[trunkNum];
  };
  p.branch = function(branchNum) {
    var branchList = {
      1 : { 'kanji' : '子', 'yomi' : 'ね', },
      2 : { 'kanji' : '丑', 'yomi' : 'うし', },
      3 : { 'kanji' : '寅', 'yomi' : 'とら', },
      4 : { 'kanji' : '卯', 'yomi' : 'う', },
      5 : { 'kanji' : '辰', 'yomi' : 'たつ', },
      6 : { 'kanji' : '巳', 'yomi' : 'み', },
      7 : { 'kanji' : '午', 'yomi' : 'うま', },
      8 : { 'kanji' : '未', 'yomi' : 'ひつじ', },
      9 : { 'kanji' : '申', 'yomi' : 'さる', },
      10 : { 'kanji' : '酉', 'yomi' : 'とり', },
      11 : { 'kanji' : '戌', 'yomi' : 'いぬ', },
      12 : { 'kanji' : '亥', 'yomi' : 'い', },
    };
    return branchList[branchNum];
  };
})(lib = lib || {});