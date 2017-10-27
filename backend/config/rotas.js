const express = require('express')
const billingCycleService = require('../api/billingCycle/billingCycleService')
const billingSummaryService = require('../api/billingSummary/billingSummaryService')


module.exports = function (server){


  // API DE ROTAS ONDE SERÃO PASSARAS PELO MODULO server
  // APOS O BROWSER CHAMAR O SERVIDOR

  const router = express.Router()

  server.use('/api', router)

  // Rotas das api

  billingCycleService.register(router, '/billingCycles')

  router.route('/billingSummary').get(billingSummaryService.getSummary)


}
