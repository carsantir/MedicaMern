const InformeAnalisis = require('../models/informeAnalisis.model')


getTipoInforme = async (req, res) => {
    informe1=InformeAnalisis.schema.path('tipoInforme').enumValues
    return res.status(200).json({ success: true, data: informe1})
}
  


module.exports = {
    getTipoInforme,
}