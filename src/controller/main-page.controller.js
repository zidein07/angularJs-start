app.controller('mainPageController', function ($scope) {

	var statuses = ['all', 'active', 'done'];
	
	$scope.filter = 'all',
	$scope.filteredTasks = [];
	$scope.tasks = [
		{
			title: 'Тестовый таск',
			status: 'active'
		},
		{
			title: 'Тестовый таск 2',
			status: 'active'
		},
		{
			title: 'Тестовый таск 3',
			status: 'active'
		},
		{
			title: 'Тестовый таск 4',
			status: 'active'
		},
		{
			title: 'Тестовый таск 5',
			status: 'active'
		},
		{
			title: 'Тестовый таск 6',
			status: 'active'
		}
	];

	if( _.indexOf(statuses, location.href.split('#')[1]) != -1){
		$scope.filter = location.href.split('#')[1];
	}

	window.addEventListener('hashchange', function(hash){

		if( _.indexOf(statuses, hash.newURL.split('#')[1]) != -1){
			$scope.filter = hash.newURL.split('#')[1];
		}else{
			$scope.filter = 'all';
		}
		filterTasks($scope.filter);

	});

	$scope.newTask = '';
	$scope.$watch('newTask', function(current, pre) {
		
	});

	
	filterTasks( $scope.filter );


	$scope.addTodo = function () {
        var task = {
        	title: $scope.newTask,
        	status: 'active'
        }
        $scope.tasks.push(task);
        filterTasks($scope.filter);
    }
    $scope.setComplete = function( task ) {
    	if( task.status == 'active' ){
    		task.status = 'done';
    	} else{
    		task.status = 'active';
    	}
    	
    	filterTasks($scope.filter);
    }

    function filterTasks( type ){
    	console.log(type);
    	if( type == 'all' ){
    		$scope.filteredTasks = $scope.tasks;
    	} else{
	    	$scope.filteredTasks = _.filter($scope.tasks, { 'status' : type });
    	}
    	console.log($scope.filteredTasks);
    }

});