import angular from 'angular';
import homeService from './home.service';
import dataService from './data.service';

(function(){
    function controller(homeService, dataService, $window){
		let self  = this;

		self.showTVbool = false;
		self.showMobile = false;
		self.showBroadband = false;
		self.showNavBar = true;
	    self.showMobileView = false;
		self.broadbandSpeed = 0;
		self.mobileData = 0;

		self.mobileDeals = [];
		self.tvDeals = [];
		self.broadBandOnly = [];
		self.deals = [];
		self.dealsToDisplay = [];

		homeService.getDeals()
			.then((deals)=>{
				self.deals=deals;
				console.log(deals);
			});
		
        /* Display deals */
	    self.displayDeals = function(){
		    self.dealsToDisplay = [];

		    if  (self.showBroadband && self.showMobile && self.showTVbool ) {
		        self.dealsToDisplay = dataService.broadbandTVMobile(self.deals, self.broadbandSpeed, self.mobileData).slice();
		    }
		    else if (self.showBroadband && self.showTVbool) {
		        self.dealsToDisplay = dataService.broadbandAndTV(self.deals, self.broadbandSpeed).slice();
		    }
		    else if (self.showBroadband && self.showMobile) {
		        self.dealsToDisplay = dataService.broadbandAndMobile(self.deals, self.broadbandSpeed, self.mobileData).slice();
		    }
		    else if (self.showTVbool && self.showMobile) {
		        self.dealsToDisplay = dataService.tVAndMobile(self.deals, self.mobileData).slice();
		    }
		    else if (self.showBroadband) {
		        self.dealsToDisplay = dataService.broadBandOnly(self.deals, self.broadbandSpeed).slice();
		    }
		    else if (self.showTVbool) {
		        self.dealsToDisplay = dataService.tvOnlyDeal(self.deals).slice();
		    }
		    else if (self.showMobile) {
		        self.dealsToDisplay = dataService.mobileOnly(self.deals, self.mobileData).slice();
		    }
	    }

	    /* Prices is an array therefore interating through them to get total cost. */
	    self.calculateTotalCost = function(prices) {
	        let totalCost = 0;
	        prices.forEach((price) => {
	            totalCost += price.totalContractCost;
	        });
	        return totalCost;
	    };

        /* Toggle the nav bar when in mobile view */
	    self.toggleNavBar = function(){
            if (self.showNavBar) {
                self.showNavBar = false;
            } else {
                self.showNavBar = true;
            }
	    }

        /* Attempt at fixing nav-bar disappearing on window resize - going from mobile view to full window view*/
	    angular.element($window).bind('resize', () => {
	        var width = $window.innerWidth;
	        if (width > 480) {
	            self.showNavBar = true;
	        }
	    })
	}

	let module = angular.module('app')
					.service("dataService", dataService);

	module.component("home", {
		templateUrl: '/src/Components/home/home.component.html',
		controllerAs: "deals",
		controller: controller
	});
	controller.$inject = ['homeService', 'dataService', '$window'];
}());

