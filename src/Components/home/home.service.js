import angular from 'angular';
(function () {

	function  homeService($http){
		return {
			getDeals: ()=>
			{
				return $http.get('/assets/deals.json').then(result=>result.data.deals)
			}
		}
	};
	var module = angular.module("app")
				 .service("homeService", homeService);

	homeService.$inject = ['$http'];
}());
