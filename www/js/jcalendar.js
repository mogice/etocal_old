// This is a JavaScript file

(function(lib) {
  var day_ja = ['日', '月', '火', '水', '木', '金', '土'];
  // コンストラクタ
  lib.JCalendar = function(parent) {
    if (typeof parent === 'string') {
      parent = document.getElementById(parent);
    }
    this.parent = parent;
  };
  // プロトタイプのショートカット
  var p = lib.JCalendar.prototype;
  // カレンダーの生成
  p.create = function(year, month) {
    var that = this;
    var table = document.createElement('table');
    table.className = 'js_calendar';
    this.table = table;
    table.onclick = function(e){
      var evt = e || window.event;
      var target = evt.target || evt.srcElement;
      if (target.tagName === 'A' && target.hash.indexOf('#day-') === 0) {
        return that.onclick_date.apply(that, target.hash.match(/day-(\d+)-(\d+)-(\d+)/));
      } else if (target.tagName === 'A' && target.hash.indexOf('#month-') === 0) {
        return that.onclick_month.apply(that, target.hash.match(/month-(\d+)-(\d+)/));
      }
    };
    this.set_date(year, month);
    this.set_caption(this.year, this.month);
    this.set_body(this.year, this.month);
    this.parent.appendChild(table);
  };
  // カレンダーの更新
  p.update = function(year, month) {
    this.remove();
    this.create(year, month);
  };
  // カレンダーの削除
  p.remove = function() {
    this.parent.removeChild(this.table);
  };
  // キャプション部セット
  p.set_caption = function(year, month) {
    var caption = document.createElement('caption');
    var div = document.createElement('div');
    var next = document.createElement('a');
    next.href = '#month-' + ((month === 12) ? year + 1 : year) + '-' + (month === 12 ? 1 : month + 1);
    next.className = 'next';
    next.innerHTML = '→';
    var prev = document.createElement('a');
    prev.href = '#month-' + ((month === 1) ? year - 1 : year) + '-' + (month === 1 ? 12 : month - 1);
    prev.className = 'prev';
    prev.innerHTML = '←';
    var current = document.createElement('span');
    var etoObj = new lib.EtoObj(year + '/' + month + '/1');
    var eto = '年：' + etoObj.yJikkan.kanji + etoObj.yJyunishi.kanji;
    current.appendChild(document.createTextNode(eto));
    current.appendChild(document.createElement('br'));
    current.appendChild(document.createTextNode(year + '/' + month));
    div.appendChild(prev);
    div.appendChild(current);
    div.appendChild(next);
    caption.appendChild(div);
    this.table.appendChild(caption);
  };
  // ボディ部セット
  p.set_body = function(year, month) {
    var tbody = document.createElement('tbody');
    var first = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var first_day = first.getDay();
    var last_date = last.getDate();
    var date = 1;
    var skip = true;
    for (var row = 0; row < 7; row++) {
      var tr = document.createElement('tr');
      for (var col = 0; col < 7; col++){
        if (row === 0){
          var th = document.createElement('th');
          var day = day_ja[col];
          th.appendChild(document.createTextNode(day));
          th.className = 'calendar day-head day' + col;
          tr.appendChild(th);
        } else {
          if (row === 1 && first_day === col){
            skip = false;
          }
          if (date > last_date) {
            skip = true;
          }
          var td = document.createElement('td');
          td.className = 'calendar day' + col;
          if (!skip) {
            var a = document.createElement('a');
            var ymd = year + '-' + month + '-' + date;
            var etoObj = new lib.EtoObj(ymd);
            var eto = etoObj.dJikkan.kanji + etoObj.dJyunishi.kanji;
            a.href = '#day-' + ymd;
            a.appendChild(document.createTextNode(date));
            a.appendChild(document.createElement('br'));
            a.appendChild(document.createTextNode(eto));
            td.appendChild(a);
            date++;
          } else {
            td.innerHTML='<span class="blank">&nbsp;</span>';
          }
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    }
    this.table.appendChild(tbody);
  };
  // 日付セット
  p.set_date = function(year, month) {
    var today = new Date();
    this.month = parseInt(month, 10) || (today.getMonth() + 1);
    this.year = parseInt(year, 10) || today.getFullYear();
  };
  // 日付クリック
  p.onclick_date = function(id, year, month, date) {
    return false;
  };
  // 月クリック
  p.onclick_month = function(id, year, month) {
    this.update(+year, +month);
    return false;
  };
})(lib = lib || {});