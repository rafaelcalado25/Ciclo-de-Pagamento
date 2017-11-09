(function(){
  angular.module('MinhaApp').factory('message',[
    'toastr',
    MsgsFactory
  ])

  function MsgsFactory(toastr){

    function addMsg(msgs, title, method){
      if(msgs instanceof Array){
        msgs.forEach(msg => toastr[method](msg,title))
      }else{
        toastr[method](msgs,title)
      }
    }
    function addSucesso(msgs){
      addMsg(msgs,'Sucesso', 'success')
    }

    function addErros(msgs){
      addMsg(msgs,'Erro', 'error')
    }

    return {addSucesso,addErros}
  }
})()