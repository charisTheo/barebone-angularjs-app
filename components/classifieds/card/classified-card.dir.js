(function () {
    'use strict';

    angular
        .module ('ngClassifieds')
        .directive ('classifiedCard', function() {
 
            return {
                templateUrl: '/components/classifieds/card/classified-card.tpl.html',
                scope: {
                    classifieds: '=classifieds',
                    classifiedsFilter: '=classifiedsFilter',
                    category: '=category'
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            }
        });

        function classifiedCardController($state, $mdDialog, $scope) {
            let vm = this;
            vm.editClassified = editClassified;
            vm.deleteClassified = deleteClassified;

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
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
        };
} ());