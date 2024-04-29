const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

class AdminController {
 
  async login(req, res) {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      req.flash('error', 'Nome de usuário e senha são necessários');
      return res.redirect('/login');
    }

    try {
      const admin = await Admin.findOne({ nome });
      
      if (!admin) {
        req.flash('error', 'Usuário ou senha inválidos');
        return res.redirect('/login');
      }

      const isPasswordMatch = await bcrypt.compare(senha, admin.senha);
      
      if (!isPasswordMatch) {
        req.flash('error', 'Usuário ou senha inválidos');
        return res.redirect('/login');
      }

      const token = generateToken({ id: admin.id, nome: admin.nome });
      res.cookie('token', token, { httpOnly: true });
      req.flash('success', 'Login realizado com sucesso!');
      res.redirect('/consultorias_admin');
    } catch (error) {
      console.error('Erro durante o login:', error);
      req.flash('error', 'Erro interno do servidor');
      return res.redirect('/login');
    }
  }
  showLoginForm(req, res) {
    res.render('login', { messages: req.flash() });
  }

  async create(req, res) {
    const { nome, senha } = req.body;
    if (!nome || !senha) {
        res.status(400).send('Nome e senha são obrigatórios');
        return;
    }
    const admin = new Admin({ nome, senha });
    await admin.save();
    res.redirect('/admin');
}

  async list(req, res) {
    const admins = await Admin.find();
    res.render('admins', { admins, messages: req.flash() });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, senha } = req.body;
    if (!nome || !senha) {
        res.status(400).send('Nome e senha são obrigatórios');
        return;
    }
    const admin = await Admin.findById(id);
    admin.nome = nome;
    admin.senha = senha;
    await admin.save();
    res.redirect('/admin');
}

  async delete(req, res) {
    const { id } = req.params;
    await Admin.findByIdAndRemove(id);
    res.redirect('/admin');
  }

  async getById(req, res) {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            req.flash('error', 'Administrador não encontrado');
            return res.redirect('/admins');
        }
        res.render('admins/show', { admin });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao exibir o administrador');
        res.redirect('/admins');
    }
  }
}

module.exports = AdminController;