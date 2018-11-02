(function(){
    'use strict';

    angular
        .module('ngClassifieds')
        .controller('ClassifiedsCtrl', function($scope, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
            let vm = this;


            $scope.$on('newClassified', function(event, classified) {
                classified.id = vm.classifieds.length + 1;
                vm.saveClassified(classified);
            });
            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });
            // $scope.$emit // sent to parent
            // $scope.$broadcast // sent to a child

            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSideBar = closeSideBar;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.editing;
            vm.openSideBar = openSideBar;
            vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;


            classifiedsFactory.getClassifieds().then(function(classifieds) {
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(classifieds.data);
            });

            function openSideBar() {
                // left is md-component-id
                $state.go('classifieds.new');
                // $mdSidenav("left").open();
            }
            function closeSideBar() {
                // left is md-component-id
                $mdSidenav("left").close();
            }
            function saveClassified(classified) {
                if (classified) {
                    vm.classifieds.push(classified);
                    closeSideBar();
                    vm.classified = {};
                    showToast("Classified Saved!");
                }
            }
            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            }
            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSideBar();
                showToast("Classified Edited!");
            }
            function deleteClassified(event, classified) {
                const index = vm.classifieds.indexOf(classified); 
                let confirm = $mdDialog
                    .confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok("Yeah")
                    .cancel("Oh no!")
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    vm.classifieds.splice(index, 1);
                }, function() {
                    // user canceled
                });
            }
            function showToast(message) {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content(message)
                        .position("top, right")
                        .hideDelay(3000)
                );
            }
            function getCategories(classifieds) {
                let categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });
                return _.uniq(categories);
            }
    });
})();