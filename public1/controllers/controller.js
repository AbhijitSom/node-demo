/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('myApp', []);
app.controller('AppController', function($scope,$http) {
    
    var refresh=function(){
    $http.get('/employeelist').success(function(response)
    {
        console.log("getting data from server");
        $scope.employeelist=response;
        //refresh();
    });
  // refresh();
 console.log("hello world from controller")  ;
 };
  refresh();
$scope.addEmployee=function()
{
//    console.log("inside the controller to pass the date to the server");
//var d=new Date();
    console.log($scope.employee);
    $http.post('/employeelist',$scope.employee).success(function(response)
    {
        console.log(response);
refresh();
//deselect();
    });
           
};
//refresh();

$scope.remove=function(id)
{
    console.log(id);
    $http.delete('/employeelist/'+id);
    refresh();
};
$scope.edit=function(id)
{
    console.log(id);
    $http.get('/employeelist/'+id).success(function(response)
    {
        $scope.employee=response;
        refresh();
    });
};
$scope.update=function()
{
    console.log($scope.employee._id);
    $http.put('/employeelist/'+$scope.employee._id,$scope.employee);
    refresh();
}
//refresh();
$scope.deselect = function() {
  $scope.employee = "";
}
$scope.search1=function()
{
    console.log("inside search operation");
    console.log($scope.search);
   // var i=5;
    $http.post('/employeelistsearch',{name:$scope.search}).success(function(response)
    {
       // console.log("success>>>>>>>>>>" , response);
//refresh();
            $scope.employeelist=response;
//refresh();
 //   {
    //    console.log("error>>>>>>>>>>" , response);
//
    });
           
}
refresh();
//$scope.count1=function()
//{
//    console.log("inside the controller to count the number of employee");
//    $http.post('/employeecount',{countempd:$scope.countd,countempm:$scope.countm,countempy:$scope.county}).success(function(response)
//    {
//        $scope.employeelist=response;
//    });
//}
//$scope.count2=function()
//{
//    console.log("inside controller to show the salary");
//    $http.post('/employeesalary',{sfrom:$scope.from,sto:$scope.to}).success(function(response)
//    {
//        console.log("passed to server");
//       // $scope.employeelist=response;
//       // var output=$scope.output;
//   //     $scope.output=[];
//    //    $scope.output.sal=response;
//         //     $scope.output1=JSON.stringify(response.);
//        $scope.employeelist1=response;
//
//   //   console.log("<response from the server>"+JSON.stringify(response));
//    });
//}
$scope.count3=function()
{
    console.log("insider the controller to test count 3");
//     var d = new Date($scope.from3);
//    var n = d.getMonth();
//    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+n);
//         var d1 = new Date($scope.to3);
//    var n1 = d1.getMonth();
//        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+n1);

    $http.post('/employeecount3',{cfrom:$scope.from3,cto:$scope.to3}).success(function(response)
    {
        console.log("before showing data");
                
                angular.forEach(response, function(item){
                    console.log(item.doj);
                    item.doj = new Date(item.doj);
                    console.log(item.doj);
                });
                $scope.employeelist1=response;
        console.log("after showing data");

    });
}

        //When file is added in file upload

//$scope.demo1=function()
//{
//    console.log("inside controller");
//     $http.post('/employeesalarydemo',{sfromdemo:$scope.demos}).success(function(response)
//    {
//        console.log("passed to server");
//       // $scope.employeelist=response;
//       // var output=$scope.output;
//   //     $scope.output=[];
//    //    $scope.output.sal=response;
//         //     $scope.output1=JSON.stringify(response.);
//       // $scope.employeelist1=response;
//
//   //   console.log("<response from the server>"+JSON.stringify(response));
//    });
//}
});


//SyntaxError: Unexpected token h<br> &nbsp; &nbsp;at parse 
//(/home/abhijit/node_modules/body-parser/lib/types/json.js:83:15)
//<br> &nbsp; &nbsp;at /home/abhijit/node_modules/body-parser/lib/read.js:116:18
//<br> &nbsp; &nbsp;at invokeCallback 
//(/home/abhijit/node_modules/body-parser/node_modules/raw-body/index.js:262:16)
//<br> &nbsp; &nbsp;at done (/home/abhijit/node_modules/body-parser/node_modules/raw-body/index.js:251:7)
//<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/home/abhijit/node_modules/body-parser/node_modules/raw-body/index.js:307:7)
//<br> &nbsp; &nbsp;at IncomingMessage.EventEmitter.emit (events.js:92:17)
//<br> &nbsp; &nbsp;at _stream_readable.js:920:16
//<br> &nbsp; &nbsp;at process._tickCallback (node.js:415:13)