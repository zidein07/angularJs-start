app.controller('mainPageController', function ($scope, localStorageService, $http) {
    var statuses = ['all', 'active', 'done'];
    var currentStatus = location.href.split('#')[1];
    
    
    $scope.filter = 'all';
    $scope.newTask = '';
    $scope.filteredTasks = [];

    if (localStorageService.get('tasks')) {
        $scope.tasks = JSON.parse(localStorageService.get('tasks'));
    } else {
        $http({
            method: 'GET',
            url: '/server/tasks.json'
        }).then(function successCallback(response) {
            $scope.tasks = response.data;
            localStorageService.set('tasks', JSON.stringify($scope.tasks));
            filterTasks($scope.filter);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    if (_.indexOf(statuses, currentStatus) != -1) {
        localStorageService.set('filter', currentStatus);
    } else if (localStorageService.get('filter')) {
        $scope.filter = localStorageService.get('filter');
    }

    window.addEventListener('hashchange', function (hash) {
        var myHash = hash.newURL.split('#')[1];
        if (_.indexOf(statuses, myHash) != -1) {
            $scope.filter = myHash;
        } else {
            $scope.filter = 'all';
        }
        localStorageService.set('filter', $scope.filter);
        filterTasks($scope.filter);
        $scope.$apply();
    });

    $scope.addTodo = function () {
        var task = {
            title: $scope.newTask,
            status: 'active'
        };
        $scope.newTask = '';
        $scope.tasks.push(task);
        filterTasks($scope.filter);
    };

    $scope.setComplete = function (task) {
        if (task.status == 'active') {
            task.status = 'done';
        } else {
            task.status = 'active';
        }
        localStorageService.set('tasks', JSON.stringify($scope.tasks));

        filterTasks($scope.filter);
    };

    function filterTasks(type) {
        console.log(type);
        if (type == 'all') {
            $scope.filteredTasks = $scope.tasks;
        } else {
            $scope.filteredTasks = _.filter($scope.tasks, {'status': type});
        }
        console.log($scope.filteredTasks);
    }

});
