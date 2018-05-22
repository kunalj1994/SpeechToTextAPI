app.controller('masterCtrl', function($scope, Upload) {

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
		console.log(file);
		var name = file.name.split(".")[0];
		var type = file.type;
		console.log(name);
		console.log(type);
		
		
		Upload.upload({
			url: '/uploadFile',
			method: 'POST',
			data: { name: name, type: type },
			files: file
		}).then(function(response){
			console.log(response.config.data.file.name);
		}, function(err){
			console.log(err);
			
		}, function(evt){
			console.log(evt.loaded);
			
		});
	}
});