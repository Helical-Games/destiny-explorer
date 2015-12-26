destinyExplorer.controller('DestinyCtrl', function($scope, $sce, $rootScope, $routeParams, localStorageService, $http) {
	$scope.apiRoot = 'http://www.bungie.net/Platform/Destiny/';
	$scope.bungieSiteRoot = 'http://www.bungie.net/';
	$scope.grimoireData = null;
	$scope.selectedCollection = null;
	$scope.selectedPage = null;
	$scope.searchResults = [];
	$scope.searchTerm = '';

	Defiant.env = 'development';

	$http.get('resources/js/data/destinyGrimoire.json', {
		headers: { 'X-API-Key': 'e6408667e2084f7ba058d71eee894c06' }
	}).then(function (response) {
        if(response.data && response.data.Response){
        	$scope.grimoireData = response.data.Response;
        }
    });

    $scope.collectionSelected = function(collection, event){
    	$scope.selectedCollection = collection;
    	$('.collection').removeClass('selected');
    	$('.pages').show();
    	$('.card-navigation').show();
    	$(event.currentTarget).addClass('selected');
    	event.stopPropagation();
    }

    $scope.pageSelected = function(page){
    	$scope.selectedPage = page;
    	$scope.hideMenu();
    	$scope.showHideSearchResults(false);
    	$('#cardCollection').show();
    }

    $scope.hideMenu = function(){
    	$('.pages').hide();
    	$('.collection').removeClass('selected');
    }

    $scope.search = function(){
    	$scope.searchResults = JSON.search($scope.grimoireData.themeCollection, '//*[contains(cardDescription, "'+ $scope.searchTerm +'")]');
    	console.log($scope.searchResults);
		$('#cardCollection').hide();
    	$scope.showHideSearchResults(true);
    }

    $scope.showHideSearchResults = function(show){
    	if(!show){
    		$('#searchResults').hide();
    		$('#resultsCounter').hide();
    	}else{
    		$('#searchResults').show();
    		$('#resultsCounter').show();
    		$('.card-navigation').hide();
    	}
    }

    $scope.cardSelected = function(cardId){
        console.log('card selected ' + cardId);
        var card = $('#card' + cardId);
        var scrollContainer = $('#cardCollection');

        
        scrollContainer.animate({
            scrollTop: card.offset().top - scrollContainer.offset().top + scrollContainer.scrollTop()
        });
    }

    $scope.cardViewed = function(card){
        $scope.selectedCard = card;

        $('.lightbox').addClass('shown');
    }

    $scope.closeLightbox = function(){
        $('.lightbox').removeClass('shown');
    }
});