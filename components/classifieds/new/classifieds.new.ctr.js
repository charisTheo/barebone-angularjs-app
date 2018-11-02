(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
            let vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveClassified = saveClassified;

            // open sidenav after it has been rendered
            $timeout(function(){
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left').close().then(function(){
                        $state.go('classifieds');
                    });
                }
            });

            function closeSideBar() {
                vm.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if (classified) {
                    const contact = {
                        name: "Charis Theo",
                        phone: "(357) 99 999999",
                        email: "someone@example.com"
                    }
                    classified.contact = contact;
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        });
})();