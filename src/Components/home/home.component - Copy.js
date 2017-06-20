import angular from 'angular';

(function(){

	let module = angular.module('app');

	module.service('home.service', homeService);
	
	function  homeService($http){
		return {
			getDeals: ()=>
			{
				return $http.get('/assets/deals.json')
					.then(result=>result.data.deals);
			}
			
		}
	};

	homeService.$inject = ['$http'];

	function controller(homeService){
		let self  = this;
		self.deals = [];
		self.dealsToDisplay = [];
		self.mobileDeals = [];
		self.tvDeals = [];
		self.broadBandOnly = [];
		self.showTVbool = false;
		self.showMobile = false;
		self.showBroadband = false;

		homeService.getDeals()
			.then((deals)=>{
				self.deals=deals;
				console.log(self.deals);		
				self.mobileOnly();
				self.tvOnlyDeal();
				console.log(self.mobileDeals);
				console.log(self.tvDeals);
			});
		
		self.mobileOnly = function(){
			self.deals.forEach((deal) => {
				if(deal.mobile){
					self.mobileDeals.push(deal);
				};
			});
		};
		self.tvOnlyDeal = function(){
			self.deals.forEach((deal) =>{
				if(deal.tvProduct){
					self.tvDeals.push(deal);
				};
			});
		};

		self.showBroadBandOnly = function(){
			self.broadBandOnly = [];
			self.deals.forEach((deal) =>{
				if(!deal.tvProduct && !deal.mobile){
					self.broadBandOnly.push(deal);
				};
			});
		};

		self.doSomething = function(value){
			console.log(value);
		};

		self.displayDeals = function(){
			self.dealsToDisplay = [];
			console.log(self.showBroadband);
			// add all broadband only deals
			if(self.showBroadband){
				self.showBroadBandOnly();
				self.broadBandOnly.forEach((deal) =>{
					self.dealsToDisplay.push(deal);
				});
			}

			// add all tv only deals
			if(self.showTVbool){
					self.tvOnlyDeal();
					self.tvDeals.forEach((deal) => {
						let valueExists = false;
						//check if it already exists
						self.dealsToDisplay.forEach((displayDeal)=>{	
							if((displayDeal.id === deal.id)){
								valueExists = true;
							}
						});

						if(!valueExists){
							self.dealsToDisplay.push(deal);
						}
				});
			}

			// add all mobile only deals
			if(self.showMobile){
					self.mobileOnly();
					self.mobileDeals.forEach((deal) => {
						let valueExists = false;
						//check if it already exists
						self.dealsToDisplay.forEach((displayDeal)=>{	
							if((displayDeal.id === deal.id)){
								valueExists = true;
							}
						});

						if(!valueExists){
							self.dealsToDisplay.push(deal);
						}
				});
			}
				self.showMobile, self.showTVbool, self.showBroadband

			// 
			if(self.showMobile && self.showTVbool && self.showBroadband){
				self.dealsToDisplay.forEach((deal) =>{

					if(!deal.tvProduct || !deal.mobile){
						var index = self.dealsToDisplay.indexOf(deal);
						if(index > -1){
							self.dealsToDisplay.splice(index,1);	
						}
						
					}
				});
			}

			if(self.showMobile && self.showBroadband){
				self.dealsToDisplay.forEach((deal) =>{

					if(!deal.tvProduct){
						var index = self.dealsToDisplay.indexOf(deal);
						if(index > -1){
							self.dealsToDisplay.splice(index,1);	
						}
						
					}
				});
			}
		}

		self.showTV = function(){
			self.dealsToDisplay = [];
						
			self.tvDeals.forEach((deal) => {
				self.dealsToDisplay.push(deal);
			});
			self.mobileDeals.forEach((deal) => {
				let valueExists = false;
				//check if it already exists
				self.dealsToDisplay.forEach((displayDeal)=>{	
					if((displayDeal.id === deal.id)){
						valueExists = true;
					}
				});

				if(!valueExists){
					self.dealsToDisplay.push(deal);
				}
			});

			console.log(self.dealsToDisplay);
		}

		//self.mobileOnly();
		//self.tvOnly();

	}

	
	
	module.component("home", {
		templateUrl: '/src/Components/home/home.component.html',
		controllerAs: "deals",
		controller: ["home.service", controller]
	});

	module.filter('checkedOptions', function(){
		self.dealsToDisplay = [];
		var checkedFilters
	});
}());

