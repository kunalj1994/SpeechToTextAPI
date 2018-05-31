app.controller('masterCtrl', function($scope, Upload, masterService, $q) {

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
			for(var i = 0; i < file.length; i++){
				var fileMetadata = {
					name: file[i].name.split(".")[0],
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
		var newArr = [];
		$q.all([
			calculateFluency(),
			calculatePolarity(),
			calculateGrammar()
		]).then(function (responseArr) {
			console.log(responseArr);
			
			$scope.featureSpinner = false;
			$scope.fluencySpinner = false;
			var fluencyScore = responseArr[0];
			var polarityScore = responseArr[1];
			var grammarScore = responseArr[2];
			console.log(fluencyScore[0]);
			console.log(polarityScore[0]);
			console.log(grammarScore[0]);
			
			for (var i = 0; i < $scope.uploadFiles.length; i++) {
				if ($scope.uploadFiles[i].name === fluencyScore[i].name && $scope.uploadFiles[i].name === polarityScore[i].name && $scope.uploadFiles[i].name === grammarScore[i].name) {
					
					newArr.push({
						name: $scope.uploadFiles[i].name, 
						size: $scope.uploadFiles[i].size, 
						fluencyScore: fluencyScore[i].score,
						polarityScore: polarityScore[i].score,
						grammarScore: grammarScore[i].score
					});
				}
			}
			$scope.uploadFiles = newArr;
		});
		// calculatePolarity();
	}

	function calculateGrammar() {
		$scope.featureSpinner = true;
		var path = '/grammar'; 
		return masterService.calculate(path);
		// .then(function(d) {
		// 	console.log(d);
			
		// });
	}

	function calculateFluency() {
		var path = '/fluency'; 
		$scope.fluencySpinner = true;
		// var newArr = [];
		return masterService.calculate(path);
		// .then(function(d) {
		// 	console.log(d);
			
		
		// 	console.log(newArr);
			
		// });
	}

	function calculatePolarity() {
		var path = '/polarity'; 
		return masterService.calculate(path);
		// .then(function(d) {
		// 	console.log(d);
			
		// });
	}

	$scope.predictModel = function(){
		var path = '/predict';
		$scope.scoreSpinner = true;
		masterService.calculate(path).then(function(d){
			$scope.scoreSpinner = false;
			$scope.loadingPage = false;
			$scope.speechScore = true;
			$scope.calculatedScore = d;
		});
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