var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function(){
$http.get('/contactllistapp').then(function(response){
    console.log("I got the data I resquested");
    $scope.contactlist = response.data;
    $scope.contact = null;
});
   
};
    
refresh();
   
$scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactllistapp', $scope.contact).then(function(response){
        console.log(response);
        refresh();
    });
}
    
$scope.remove = function(id){
    console.log(id);
    $http.delete('/contactllistapp/' + id).then(function(response){
       refresh(); 
    });
};
    
$scope.edit = function(id){
    console.log(id);
    $http.get('/contactllistapp/'+ id).then(function(response){
       $scope.contact = response.data;
    }); 
};

$scope.update = function(){
    console.log($scope.contact._id);
    $http.put('/contactllistapp/'+ $scope.contact._id,$scope.contact).then(function(response){
       refresh();
    }); ;
}

$scope.deselect = function(){
    $scope.contact = "";
}

}]);




