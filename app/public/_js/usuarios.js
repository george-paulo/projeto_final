import { ref } from 'vue'

export default {
  setup() {
    const nome = ref('')
    const senha = ref('')
    const papel = ref('')
    const id = ref(0)
    const usuarios = ref([])
    const divResposta = ref('')
    const traducoes = {
      'pt-BR': {
        'Senha em branco': 'A senha não pode ser em branco!',
        'Usuario cadastrado': 'usuario cadastrada com sucesso!',
        'Usuario apagado': 'usuario apagada com sucesso!'
      },
      'en': {
        'Senha em branco': 'Password cannot be empty!'
      }
    }

    const escolher = async () => {
      let usuario = {
        senha: senha.value, 
        nome: nome.value, 
        papel: papel.value
      }

      if (id.value == 0) {
        await inserir_(usuario)
      } else {
        await editar(usuario, id.value)
      }
    }

    const inserir_ = async (usuario) => {
      let dados = new URLSearchParams(usuario)
      let resposta = await fetch('usuarios', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        body: dados
      })
      let respostaJson = await resposta.json()
      let mensagem = respostaJson.mensagem
      divResposta.value = traducoes['pt-BR'][mensagem]
    }

    const listar = async () => {
      let resposta = await fetch('usuarios')
      usuarios.value = await resposta.json()
    }

    const formEditar = async (id) => {
      let resposta = await fetch('usuario/' + id, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      let usuario = await resposta.json()
      senha.value = usuario.senha
      papel.value = usuario.papel
      nome.value = usuario.nome
      id.value = usuario.id
    }

    const editar = async (usuario, id) => {
      let dados = new URLSearchParams(usuario)
      let resposta = await fetch('usuarios/' + id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        body: dados
      })
      let respostaJson = await resposta.json()
      let mensagem = respostaJson.mensagem
      divResposta.value = traducoes['pt-BR'][mensagem]
    }

    const apagar = async (id) => {
      if (confirm('Quer apagar o #' + id + '?')) {
        let resposta = await fetch('usuarios/' + id, {
          method: 'delete',
          headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
        let respostaJson = await resposta.json()
        let mensagem = respostaJson.mensagem
        divResposta.value = traducoes['pt-BR'][mensagem]
        await listar()
      }
    }

    return {
      nome,
      senha,
      papel,
      id,
      usuarios,
      divResposta,
      traducoes,
      escolher,
      inserir_,
      listar,
      formEditar,
      editar,
      apagar
    }
  }
}