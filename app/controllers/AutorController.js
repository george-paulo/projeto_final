class AutorController {
    index(req, res) {
        const autor = {
            nome: 'George Paulo',
            formacoes: [
                'Técnico em Informática para Internet',
                'Instituto Federal do Ceará',
                'Ano: 2023'
            ],
            experiencias: [
                'Militar do Exército Brasileiro',
                'Trabalhando atualmente com infraestrutura de TI',
                'Ano: Desde 2018'
            ]
        };

        res.render('autor', { autor: autor });
    }
}

module.exports = AutorController;