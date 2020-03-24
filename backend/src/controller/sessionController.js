const conection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;
        
        const ong = await conection('ongs').where('id',id).select('name').first();

        if(!ong){
            return res.status(400).json({error: 'Essa ong não existe'});
        }

        return res.json(ong);
    }
};