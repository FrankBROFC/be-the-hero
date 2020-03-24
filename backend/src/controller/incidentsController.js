const conection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {page = 1 } = request.query;

        const [count] = await conection('incidents').count();

        const dados = await conection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(dados)
    },

    async create(request, response) {
        const { title, description, price } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conection('incidents').insert({
            title,
            description,
            price, 
            ong_id
        })

        return response.json({id});
    },

    async delete(request, response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const icident = await conection('incidents').where('id', id).select('ong_id').first();

        if(icident.ong_id !== ong_id )
        {
            response.status(401).json({error: 'Operation not permitted.'});
        }

        await conection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};