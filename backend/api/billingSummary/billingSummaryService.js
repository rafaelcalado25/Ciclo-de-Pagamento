const _ = require('lodash')
const BillingCycle = require ('../billingCycle/billingCycleService')

// Mais uma função middleware

function getSummary(req, res){
  BillingCycle.aggregate({
    //Aqui eu somo todos os créditos e debitos de um documento
    $project : {credit:{$sum: "$creditos.valor"}, debit:{$sum:"$debitos.valor"}}
  },{
    //Com o somatorio total retornado pelo $project agora vamos fazer o agrupamento
    //Aqui eu somo todos os creditos e debitos dde todos os documento
    $group: {_id:null, credito:{$sum:"$credit"}, debito:{$sum:"$debit"}}
  }, {
    $project:{_id:0,credito:1,debito:1}
  }, function (error, result){
    if(error){
      res.status(500).json({erros: [error]})
    }else{
      res.json(_.defaults(result[0],{credito:0,debito:0}))
    }
  })
}

module.exports = {getSummary}
