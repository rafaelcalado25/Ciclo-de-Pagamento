const restful = require ('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min:0, required:true }
})

const debtSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min:0, required: true },
  status: {type: String, required: false, uppercase: true,
  enum: ['PAGO', 'PENDENTE', 'AGENDADO', 'CANCELADO']}
})

const billingCycleSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  mes: { type: Number, min:1, max:12, required: true },
  ano: { type: Number, min:2000, max:2100, required: true },
  creditos: [creditSchema],
  debitos:[debtSchema]
})

module.exports = restful.model('billingCycle', billingCycleSchema)
