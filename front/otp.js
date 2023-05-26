var myApp = angular.module("myApp", []);
myApp.controller("otpctr", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.sc = "";
   

    

    $scope.sendotp = function () {
     
      var data2 = {
        emailcode: $scope.sc,
      };

      $http.post("http://localhost:5555/verifyemail", data2).then(function (data, status, headers, config) {
        var data3 = data.data;
        console.log(data3);
          if (data3.Status == "OK") {
            alert("otp match");
            window.location.href="/emailsend/front/wellcome.html"
          } else {
            alert("not match");
          }
        });

   
    };
  },
]);
