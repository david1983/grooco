app.controller('homeCtrl', 
 function($scope,categories){ 
     
      categories.then(function(res){
            $scope.$apply(function(){$scope.categories = res.val()})
        }) 
})
.filter('removeUnderscore', function() {
  return function(input) {
    input = input || '';
    return input.replace(/_/g, ' ')
  };
})