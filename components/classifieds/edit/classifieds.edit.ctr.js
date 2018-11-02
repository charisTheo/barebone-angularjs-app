(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
            let vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEdit = saveEdit;
            vm.classified = $state.params.classified;

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

            function saveEdit() {
                $scope.$emit('editSaved', 'Edit Saved');
                vm.sidenavOpen = false;
            }
        });
})();