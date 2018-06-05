app.controller('masterCtrl', function($scope, Upload, masterService, $q, $timeout) {

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
		if(file && file.length != 0){
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
				// console.log(evt);
				
			});
		}
	}

	$scope.runFeatures = function(){
		$q.all([
			calculateFluency(),
			calculatePolarity(),
			calculateGrammar()
		]).then(function (responseArr) {
			$timeout(function(){	
				$scope.featureSpinner = false;
				$scope.fluencySpinner = false;
				var fluencyScore = responseArr[0];
				var polarityScore = responseArr[1];
				var grammarScore = responseArr[2];
				mergeArrays($scope.uploadFiles, fluencyScore);
				mergeArrays($scope.uploadFiles, polarityScore);
				mergeArrays($scope.uploadFiles, grammarScore);
				$scope.enablePrediction = true;
			}, 1500);
		});
	}

	function mergeArrays(arr1, arr2){
		var newArr = [];
		for(var i = 0; i < arr1.length; i++){
			for(var j = 0; j < arr2.length; j++){
				if(arr1[i].name === arr2[j].name){
					newArr.push(angular.extend(arr1[i], arr1[i], arr2[j]));
				}
			}
		}
		return newArr;
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
			mergeArrays($scope.calculatedScore, $scope.uploadFiles);
		});
	}

	$scope.stopGradeSpinner = function(data, i){
		var timeout = (i + 1) * 1000;
		$timeout(function(){
			data.gradeSpinner = true;
			if((data.actualGrade >= 3 && data.predictedGrade >= 3) || (data.actualGrade < 3 && data.predictedGrade < 3)){
				data.passed = true;
			}
			else{
				data.failedRow = {
					'background-color': 'red',
					'color': 'white'
				}
			}
		}, timeout);
	}

	$scope.goBack = function(){
		$scope.speechScore = false;
		$scope.uploadForm = true;
		$scope.checkMark = false;
		$scope.enablePrediction = false;
		
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