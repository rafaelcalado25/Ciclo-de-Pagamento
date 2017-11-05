(function(){
angular.module('MinhaApp').controller('dashboardControl', [    
    '$http',
    DashboardController
  ]
)
  function DashboardController($http){
    const m = this
    m.getSummary = function(){
      const url = 'http://localhost:3003/api/billingSummary'
      console.log(url)
      $http.get(url).then(function(response) {
        const { credito = 0, debito = 0 } = response.data
        m.credito = credito
        m.debito = debito
        m.total = credito - debito
        console.log(m.credito);

        return m
      })
    }
    m.getSummary();
  }
})()
