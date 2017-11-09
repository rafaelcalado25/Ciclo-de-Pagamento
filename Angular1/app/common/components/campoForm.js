(function(){
  angular.module('MinhaApp').component('campoForm',{
    bindings:{
      grid:'@',
      group:'@',
      for:'@',
      input:'@',
      type: '@',
      model:'=',
      readonly:'<',
    },
    controller: [
      'myFactory',
      function (myFactory) {
        //Este controller não funciona, pois o valor da grid
        // ainda não foi passado pelo component
        //Para funcionar temos que fazer o código abaixo que sicroniza
        //a passagem de parametro com a inicialização do component
        this.$onInit = () => this.gridClasses = myFactory.toCssClasses(this.grid); 
        console.log(this.gridClasses)          
      },
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
    <div classe="{{$ctrl.group}}">
    <label for="{{ $ctrl.input }}">{{ $ctrl.for }}</label>
    <input id="{{ $ctrl.input }}" class="form-control" 
    type="{{ $ctrl.type }}" placeholder="Informe o {{ $ctrl.for }}"
    ng-model= "$ctrl.model" ng-readonly ="$ctrl.readonly" />
    </div>
    </div>
    `
  })
}
)()