app.controller('masterCtrl', function($scope, Upload, $timeout) {

	$scope.uploadForm = true;
	$scope.spinner = false;
	
	// $scope.uploader.onAfterAddingFile = function(){
	// 	for(var i = 0; i < $scope.uploader.queue.length; i++){
	// 		console.log($scope.uploader.queue[i]);
	// 		var file = $scope.uploader.queue[i].file;
	// 		console.log('My file: ');
	// 		console.log(file);
	// 		var type = file.type;
	// 		var name = file.name.split(".")[0];
	// 		console.log('type: ' + type);
	// 		console.log('name: ' + name);
	// 		file.upload = function(){
				
	// 		}
			
	// 	}
	
	// }

	$scope.upload = function(file){
		// $scope.spinner = true;
		Upload.upload({
			url: '/uploadFile',
			method: 'POST',
			file: file
		}).then(function(response){
			$timeout(function(){
				console.log(response.data);
				
				// $scope.spinner = false;
				// $scope.uploadForm = false;
				// $scope.speechScore = true;
				// $scope.calculatedScore = response.data;
			}, 2000);
		}, function(err){
			console.log(err);
			
		}, function(evt){
			
		});
	}
});