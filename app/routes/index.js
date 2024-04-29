const express = require('express');
const router = express.Router();
const path = require('path');
const ConsultoriaController = require('../controllers/ConsultoriaControllers');
const AdminController = require('../controllers/AdminController');
const UsuarioController = require('../controllers/UsuariosControllers');
const AutorController = require('../controllers/AutorController'); 
const { auth, isAdmin } = require('../controllers/auth');

router.use('/_js', express.static(path.join(__dirname, '../public/_js')));

const autorController = new AutorController();
const adminController = new AdminController();
const usuariosController = new UsuarioController();
const consultoriaController = new ConsultoriaController();

router.get('/', async (req, res) => {
    const consultorias = await consultoriaController.list(req, res);
    res.render('index', { consultorias: consultorias });
});

router.get('/consultorias_admin', auth, (req, res) => consultoriaController.listAdmin(req, res));
router.put('/consultorias/:id', auth, (req, res) => consultoriaController.update(req, res));
router.delete('/consultorias/:id', auth, (req, res) => consultoriaController.delete(req, res));
router.get('/login', (req, res) => {
    res.render('login', { messages: { error: req.flash('error') } });
});
router.get('/servico', async function(req, res) {
    const consultorias = await consultoriaController.list(req, res);
    res.render('servico', { consultorias: consultorias });
});
router.get('/autor', autorController.index);
router.get('/cabecalho', (req, res) => res.render('cabecalho'));
router.get('/cadastro', (req, res) => res.render('cadastro'));
router.get('/consultorias', (req, res) => consultoriaController.list(req, res));
router.get('/contrate', (req, res) => res.render('contrate'));
router.get('/', (req, res) => res.render('index'));
router.get('/servico', (req, res) => res.render('servico'));
router.get('/sobre', (req, res) => res.render('sobre'));
router.get('/admin/:id', auth, adminController.getById);
router.get('/solucao', (req, res) => res.render('solucao'));
router.get('/consultorias/editar/:id', auth, (req, res) => {
    const { id } = req.params;
    consultoriaController.editar(req, res);
});
router.get('/admin', auth, (req, res) => adminController.list(req, res));
router.get('/usuario', auth, isAdmin, (req, res) => usuariosController.list(req, res));
router.post('/consultorias', auth, (req, res) => consultoriaController.create(req, res));
router.post('/admin/create', auth, (req, res) => adminController.create(req, res));
router.get('/admin/login', (req, res) => adminController.showLoginForm(req, res));
router.post('/admin/login', (req, res) => adminController.login(req, res));
router.post('/usuario/create', (req, res) => usuariosController.create(req, res));
router.get('/usuario/login', (req, res) => usuariosController.showLoginForm(req, res));
router.post('/usuario/login', (req, res) => usuariosController.login(req, res));
router.get('/consultorias/:id', (req, res) => consultoriaController.getById(req, res));
router.get('/admin/consultorias', auth, (req, res) => consultoriaController.listAdmin(req, res));
router.post('/admin/consultorias/:id', auth, (req, res) => consultoriaController.create(req, res));
router.put('/admin/consultorias/:id', auth, (req, res) => consultoriaController.update(req, res));
router.delete('/admin/consultorias/:id', auth, (req, res) => consultoriaController.delete(req, res));
router.put('/admin/:id', auth, (req, res) => adminController.update(req, res));
router.delete('/admin/:id', auth, (req, res) => adminController.delete(req, res));
router.get('/usuarios', auth, (req, res) => usuariosController.list(req, res));
router.get('/usuarios/:id', auth, (req, res) => usuariosController.getById(req, res));
router.post('/admin/usuarios/:id', auth, (req, res) => usuariosController.create(req, res));
router.put('/admin/usuarios/:id', auth, (req, res) => usuariosController.update(req, res));
router.delete('/admin/usuarios/:id', auth, (req, res) => usuariosController.delete(req, res));
router.get('/admins', auth, (req, res) => adminController.list(req, res));
router.put('/consultorias/:id', auth, (req, res) => consultoriaController.update(req, res));
router.delete('/consultorias/:id', auth, (req, res) => consultoriaController.delete(req, res));
router.get('/index', (req, res) => res.redirect('/'));

module.exports = router;