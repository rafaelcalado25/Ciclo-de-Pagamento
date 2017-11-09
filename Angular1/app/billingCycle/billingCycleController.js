(function(){
  angular.module('MinhaApp').controller('billingCycleController',[
    '$http',
    'message',
    'tabsFactory',
    billingCycleCtrl,
  ])
  function billingCycleCtrl($http, msgs, tabs){
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){
      $http.get(url).then(function(response) {
        vm.billingCycle = {}
        vm.billingCycles = response.data    
        tabs.show(vm, { tabList:true, tabCreate:true })    
      })
      
    }

     vm.create = function(){      

      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSucesso("Incluido com sucesso!")
      }).catch(function(response){
        msgs.addErros(response.data.error)
      })
    } 

    vm.showUpdate = function(billingCycle){
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabUpdate:true })  
    }

    vm.showDelete = function(billingCycle){
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabDelete:true })  
    }

    vm.update = function(){
      const urlUpdate = `${url}/${vm.billingCycle._id}`  
      $http.put(urlUpdate, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSucesso("Atualizado com sucesso!")
      }).catch(function(response){
        msgs.addErros(response.data.error)
      })

    }

    vm.delete = function(){
      const urlDelete = `${url}/${vm.billingCycle._id}`  
      $http.delete(urlDelete, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSucesso("Eliminado com sucesso!")
      }).catch(function(response){
        msgs.addErros(response.data.error)
      })

    }

    /* vm.update = function(){      
      
      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSucesso("Incluido com sucesso!")
      }).catch(function(response){
        msgs.addErros("Erro")
      })
    } */

    vm.refresh()
  }
})()
