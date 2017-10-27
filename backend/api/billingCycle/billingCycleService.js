const _ = require('lodash')
const BillingCycle = require('./billingCycle')


BillingCycle.methods(['get', 'post', 'put',   'delete'])

BillingCycle.updateOptions({new:true, runValidators:true})

BillingCycle.after('post', sendErroOrNext).after('put',sendErroOrNext)

function sendErroOrNext(req, res, next){
  const bundle = res.locals.bundle

  if(bundle.errors){
    var error = parserErros(bundle.errors)
    res.status(500).json({error})
  }else{
    next()
  }
}

function parserErros(error){
  const aErros = []
  _.forIn(error, erro => aErros.push(erro.message))

  return aErros
}

// BillingCycle.route tem a ver com o express e toda vez que
// a requisição chegar para o método count esta função vai
// invocar a função que esta como parametro da função
BillingCycle.route('count', function(req, res, next){
  //BillingCycle.count tem a ver com o mongo e vai retornar a
  //quantidade de registros contidos no banco. Esta função
  //está disponibilizada na API restful
  BillingCycle.count(function(error, value){
    if(error){
      res.status(500).json({erros: [error]})
    }else{
      res.json({value})
    }
  })
})

module.exports = BillingCycle
