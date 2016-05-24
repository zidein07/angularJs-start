app.controller('mainPageController', function ($scope, localStorageService) {
	var statuses = ['all', 'active', 'done'];
	
	$scope.filter = 'all',
	$scope.filteredTasks = [];

	if( localStorageService.get('tasks') ){
		$scope.tasks = JSON.parse(localStorageService.get('tasks'));
	} else{
		$scope.tasks = [
			{
				title: 'Накормить гуся',
				status: 'active'
			},
			{
				title: 'Подоить корову',
				status: 'active'
			},
			{
				title: 'Подстричь газон',
				status: 'active'
			},
			{
				title: 'Построить дом',
				status: 'active'
			},
			{
				title: 'Затопить баню',
				status: 'active'
			}
		];

		localStorageService.set( 'tasks', JSON.stringify($scope.tasks) );
	}
	

	if( _.indexOf(statuses, location.href.split('#')[1]) != -1){
		$scope.filter = location.href.split('#')[1];
		localStorageService.set('filter', $scope.filter);
	}else if( localStorageService.get('filter').length ){
		$scope.filter = localStorageService.get('filter');
	}

	window.addEventListener('hashchange', function(hash){
		var myHash = hash.newURL.split('#')[1];
		if( _.indexOf(statuses, myHash) != -1){
			$scope.filter = myHash;
		}else{
			$scope.filter = 'all';
		}
		localStorageService.set('filter', $scope.filter);
		filterTasks($scope.filter);
		$scope.$apply();
	});
	$scope.newTask = '';
	filterTasks( $scope.filter );

	$scope.addTodo = function () {
        var task = {
        	title: $scope.newTask,
        	status: 'active'
        }
        $scope.newTask = '';
        $scope.tasks.push(task);
        filterTasks($scope.filter);
    }
    $scope.setComplete = function( task ) {
    	if( task.status == 'active' ){
    		task.status = 'done';
    	} else{
    		task.status = 'active';
    	}
    	localStorageService.set( 'tasks', JSON.stringify($scope.tasks) );
    	
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