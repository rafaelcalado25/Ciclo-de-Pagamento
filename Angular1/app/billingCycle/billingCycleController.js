(function(){
  angular.module('MinhaApp').controller('billingCycleController',[
    '$http',
    'message',
    billingCycleCtrl
  ])
  function billingCycleCtrl($http, msgs){
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){
      $http.get(url).then(function(response) {
        vm.billingCycle = {}
        vm.billingCycles = response.data
      })
    }

     vm.create = function(){      

      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSucesso("Incluido com sucesso!")
      }).catch(function(response){
        msgs.addErros("Erro")
      })
    } 

    vm.refresh()
  }
})()
