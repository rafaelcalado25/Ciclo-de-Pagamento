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
        vm.billingCycle = { creditos: [{}], debitos: [{}] }
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
      console.log(vm.billingCycle.creditos)
      if(vm.billingCycle.creditos.length===0){
        vm.billingCycle.creditos = [{}]
      }
      if(vm.billingCycle.debitos.length===0){
        vm.billingCycle.debitos = [{}]
      }
      tabs.show(vm, { tabUpdate:true })  
    }

    vm.showDelete = function(billingCycle){
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabDelete:true })  
    }

    vm.showCloneBillingCycle = function(billingCycle){
      let billing;
      billing= {creditos: billingCycle.creditos, debitos:billingCycle.debitos};
      vm.billingCycle = billing;
      tabs.show(vm, { tabCreate:true })  
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

    vm.addCredito = function(index){
      vm.billingCycle.creditos.splice(index+1,0,{});
    }

    vm.cloneCredito = function(index,{ nome, valor}){
      vm.billingCycle.creditos.splice(index+1,0,{nome, valor});
    }

    vm.deleteCredito = function(index){
      console.log(vm.billingCycle.creditos.length)
      if (vm.billingCycle.creditos.length > 1) {
        vm.billingCycle.creditos.splice(index, 1);
      }      
    }

    vm.addDebito = function(index){
      vm.billingCycle.debitos.splice(index+1,0,{});
    }

    vm.cloneDebito = function(index,{ nome, valor, status}){
      vm.billingCycle.debitos.splice(index+1,0,{nome, valor, status });
    }

    vm.deleteDebito = function(index){
      if(vm.billingCycle.debitos.lenght > 1){
        vm.billingCycle.debitos.splice(index,1);
      }      
    }

    vm.refresh()
  }
})()
