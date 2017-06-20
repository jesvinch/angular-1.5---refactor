import angular from 'angular';
class DataService{

		mobileOnly(deals, mobileData){
		    let array = [];
			deals.forEach((deal) => {
			    if(deal.productTypes.length <=1){
			        if (deal.productTypes.includes("Mobile") && deal.mobile.data.sortValue >= mobileData) {
			            array.push(deal);
			        }
				}; 
			});
			return array;
		};

        //Get TV only deals
		tvOnlyDeal(deals){
		    let array = [];
			deals.forEach((deal) =>{
			    if(deal.productTypes.length <=1){
                    if (deal.productTypes.includes("TV")) {
                        array.push(deal);
                    }
				};
			});
			return array;
		};

        //get broadband only deals
		broadBandOnly(deals, broadbandSpeed){
		    let array = [];
			deals.forEach((deal) =>{
				if(deal.productTypes.length <= 2){
					if(deal.productTypes.includes("Broadband") && deal.productTypes.includes("Phone") && deal.speed.label >= broadbandSpeed){
						array.push(deal);	
					}
				};
			});
		    return array;
		};

		broadbandAndMobile(deals, broadbandSpeed, mobileData ) {
	        let array = [];
            deals.forEach((deal) => {
                if(deal.productTypes.length <= 3){
                    if(deal.productTypes.includes("Broadband") && deal.productTypes.includes("Phone") && deal.productTypes.includes("Mobile") 
                    	&& deal.speed.label >= broadbandSpeed && deal.mobile.data.sortValue >= mobileData ){
                    	console.log(deal)
                        array.push(deal);	
                    }
                };
            });
            return array;
	    };

	    broadbandAndTV(deals, broadbandSpeed) {
	        let array = [];
	        deals.forEach((deal) => {
	            if(deal.productTypes.length <= 3){
	                if(deal.productTypes.includes("Broadband") && deal.productTypes.includes("Phone") 
	                	&& deal.productTypes.includes("TV") && deal.speed.label >= broadbandSpeed){
	                    array.push(deal);	
	                }
	            };
	        });
	        return array;
	    };

	    broadbandTVMobile(deals, broadbandSpeed, mobileData) {
	        let array = [];
	        deals.forEach((deal) => {
	            if(deal.productTypes.includes("Broadband") && deal.productTypes.includes("Phone") && deal.productTypes.includes("TV") 
	            	&& deal.productTypes.includes("Mobile") && deal.mobile.data.sortValue >= mobileData && deal.speed.label >= broadbandSpeed){
	               array.push(deal);	
	            }
	        });
	        return array;
	    };

	    tVAndMobile(deals, mobileData) {
	        let array = [];
	        deals.forEach((deal) => {
	            if(deal.productTypes.length <= 2){
	                if(deal.productTypes.includes("TV") && deal.productTypes.includes("Mobile") && deal.mobile.data.sortValue >= mobileData){
	                    array.push(deal);	
	                }
	            };
	        });
	        return array;
	    };
}

export default DataService;