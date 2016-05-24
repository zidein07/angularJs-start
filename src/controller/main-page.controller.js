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
		var myHash = hash.newURL.split('#')[1];
		if( _.indexOf(statuses, myHash) != -1){
			$scope.filter = myHash;
		}else{
			$scope.filter = 'all';
		}
		console.log($scope.filter);
		filterTasks($scope.filter);

	});
	$scope.newTask = '';
	filterTasks( $scope.filter );

	// $scope.changeLocation = function(){
	// 	$scope.filter = location.href.split('#')[1];
	// 	filterTasks($scope.filter);
	// }
	$scope.setUrl = function(str){
		var currentUrl = location.href;
		var baseUrl = location.href.split('#')[0];
		var newUrl = baseUrl + '#' + str;
		location.href = newUrl;
	}

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