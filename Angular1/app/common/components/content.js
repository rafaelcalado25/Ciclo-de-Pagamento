angular.module('MinhaApp').component('content', {
  bindings: {
    grid: '@',
    color: '@',
    valor: '@',
    tipoConta: '@',
    icone: '@',
  },
  controller: [
    'myFactory',
    function (myFactory) {
      //Este controller não funciona, pois o valor da grid
      // ainda não foi passado pelo component
      //Para funcionar temos que fazer o código abaixo que sicroniza
      //a passagem de parametro com a inicialização do component
      this.$onInit = () => this.gridClasses = myFactory.toCssClasses(this.grid);           
    },
  ],
  template: `
  <div class="{{ $ctrl.gridClasses }}">
  <div class="small-box {{ $ctrl.color }}">
    <div class="inner">
      <h3>{{ $ctrl.valor }}</h3>
      <p>{{ $ctrl.tipoConta }}</p>
    </div>
    <div class="icon">
      <i class="{{ $ctrl.icone }}"></i>
    </div>
  </div>           
</div> 
`,
});
