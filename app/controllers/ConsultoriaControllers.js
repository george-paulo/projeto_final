const ConsultoriaModel = require('../models/Consultorias');

class ConsultoriaController {
    constructor() {
        this.Consultoria = ConsultoriaModel;
    }

    async create(req, res) {
        const { nome, texto } = req.body;

        if (!nome || !texto) {
            res.status(400).send('Os campos nome e texto são obrigatórios');
            return;
        }

        const consultoria = await this.Consultoria.create({ nome, texto });
    
        const consultoriaObj = {
            nome: consultoria.nome,
            texto: consultoria.texto,
            id: consultoria._id
        };
        
        res.render('consultorias', { consultoria: consultoriaObj });
    }

    async list() {
        console.log('Rota /consultorias chamada');
        const consultorias = await this.Consultoria.find();
    
        const consultoriasObjs = consultorias.map(consultoria => {
            return {
                nome: consultoria.nome,
                texto: consultoria.texto,
                id: consultoria._id
            };
        });
    
        console.log('Consultorias recuperadas do banco de dados:', consultoriasObjs);
        return consultoriasObjs;
    }
    
    async listAdmin(req, res) {
        console.log('Rota /admin/consultorias chamada');
        const consultorias = await this.Consultoria.find();
    
        const consultoriasObjs = consultorias.map(consultoria => {
            return {
                nome: consultoria.nome,
                texto: consultoria.texto,
                id: consultoria._id
            };
        });
    
        console.log('Consultorias recuperadas do banco de dados:', consultoriasObjs);
        res.render('consultorias_admin', { consultorias: consultoriasObjs, messages: req.flash() });
    }

    async update(req, res) {
        const { id, nome, texto } = req.body;

        if (!nome || !texto) {
            res.status(400).send('Os campos nome e texto são obrigatórios');
            return;
        }

        await this.Consultoria.updateOne({ _id: id }, { nome, texto }); 
        res.redirect('/consultorias');
    }

    async getById(req, res) {
        const { id } = req.params;
        const consultoria = await this.Consultoria.findOne({ _id: id }); 
        res.render('consultoria', { consultoria });
    }

    async delete(req, res) {
        const { id } = req.params;
        await this.Consultoria.deleteOne({ _id: id });
        res.redirect('/consultorias');
    }
}

module.exports = ConsultoriaController;
