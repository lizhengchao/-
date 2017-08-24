/**
 * Created by lzc on 2017/5/6.
 */
var myModule = angular.module('myModule', []);

myModule.controller('showText', ['$scope',
    function ($scope){
        $scope.textA = '1'
    }
]);

myModule.directive('hello', function(){
    return {
        template: '<div class="hello">hello</div>',
        restrict: 'E',
        replace: true
    }
})