app.controller('masterCtrl', function($scope, Upload) {

	$scope.uploadForm = true;
	$scope.sttSpinner = false;
	$scope.featureSpinner = false;
	
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
		if(file){
			console.log(file);
			
			$scope.loadingPage = true;
			$scope.uploadForm = false;
			$scope.sttSpinner = true;
			$scope.uploadFiles = [];
			for(var i = 0; i <file.length; i++){
				var fileMetadata = {
					name: file[i].name,
					size: formatBytes(file[i].size)
				}
				$scope.uploadFiles.push(fileMetadata);
			}
			Upload.upload({
				url: '/uploadFile',
				method: 'POST',
				file: file[0]
			}).then(function(response){
				console.log(response.data);
				$scope.sttSpinner = false;
				$scope.checkMark = true;
				// $scope.uploadForm = false;
				// $scope.speechScore = true;
				// $scope.calculatedScore = response.data;
			}, function(err){
				console.log(err);
				
			}, function(evt){
				console.log(evt);
				
			});
		}
	}

	$scope.runFeatures = function(){
		
	}

	function formatBytes(bytes,decimals) {
		if(bytes == 0) return '0 Bytes';
		var k = 1024,
			dm = decimals || 2,
			sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	 }
});