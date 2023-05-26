var myApp = angular.module("myApp", []);
myApp.controller("GreetingController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.username = "";
   

    

    $scope.sendmessage = function () {
      // alert("done");
      var data2 = {
        username: $scope.username,
      };



      $http.post("http://localhost:5555/sendmail", data2).then(function (data, status, headers, config) {
          var data3 = data.data;
          console.log(data3);
          if (data3.Status == "Ok") {
            alert("email send successfull");
            window.location.href="/emailsend/front/otp.html"
          } else {
            alert("not send");
          }
        });
    };

    $scope.sendmessage();
  },
]);
