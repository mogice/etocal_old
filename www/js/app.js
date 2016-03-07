// This is a JavaScript file

angular.module('myApp', ['onsen.directives']).
controller('MyCtrl', function($scope) {
  $(function() {
    var mycal = new lib.JCalendar('mycal');
    var input = document.getElementById('mycal-i');
    mycal.create();
    mycal.onclick_date = function(id,year, month, date) {
      input.value = [year, month, date].join('/');
      return false;
    };
  });
  $scope.getEto = function() {
    var hiduke;
    var etoObj;
    var resultStr;
    hiduke = document.getElementById("my-input").value;
    etoObj = new lib.EtoObj(hiduke);
    resultStr =
      '年：' + etoObj.yJikkan.kanji + etoObj.yJyunishi.kanji + 
      '(' + etoObj.yJikkan.yomi + etoObj.yJyunishi.yomi + ')';
    $("#result-y").html(resultStr);
    resultStr =
      '日：' + etoObj.dJikkan.kanji + etoObj.dJyunishi.kanji +
      '(' + etoObj.dJikkan.yomi + etoObj.dJyunishi.yomi + ')';
    $("#result-d").html(resultStr);
  };
});

ons.bootstrap(['myApp']);
