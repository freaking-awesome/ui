app= angular.module 'app'



app.controller 'ControlsSelectExampleCtrl', ($rootScope, $scope) ->
    $scope.data= [
        {label:'Первый пункт выпадайки очень длинный'},
        {label:'Второй пункт'},
        {label:'Третий пункт'},
        {label:'Четвертый'},
        {label:'Патый'},
        {label:'Шатый'},
        {label:'Седьмой'},
    ]

app.controller 'ControlsSelectExample1Ctrl', ($scope) ->
    $scope.selection= $scope.data[3]

    $scope.changeModel= () ->
        $scope.selection= $scope.data[0]

app.controller 'ControlsSelectExample2Ctrl', ($scope) ->
    $scope.selection= [ $scope.data[1], $scope.data[2] ]

    $scope.changeModel= () ->
        $scope.selection= [ $scope.data[0], $scope.data[2], $scope.data[3] ]
