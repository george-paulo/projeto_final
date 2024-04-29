import { ref } from 'vue'

export default {
  setup() {
    const nome = ref('')
    const senha = ref('')
    const papel = ref('')
    const id = ref(0)
    const admins = ref([])
    const divResposta = ref('')
    const traducoes = {
      'pt-BR': {
        'Senha em branco': 'A senha não pode ser em branco!',
        'Usuario cadastrado': 'admin cadastrado com sucesso!',
        'Usuario apagado': 'admin apagado com sucesso!'
      },
      'en': {
        'Senha em branco': 'Password cannot be empty!'
      }
    }

    const escolher = async () => {
      let admin = {
        senha: senha.value, 
        nome: nome.value, 
        papel: papel.value
      }

      if (id.value == 0) {
        await inserir_(admin)
      } else {
        await editar(admin, id.value)
      }
    }

    const inserir_ = async (admin) => {
      let dados = new URLSearchParams(admin)
      let resposta = await fetch('admins', {
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
      let resposta = await fetch('admins')
      admins.value = await resposta.json()
    }

    const formEditar = async (id) => {
      let resposta = await fetch('admin/' + id, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      let admin = await resposta.json()
      senha.value = admin.senha
      papel.value = admin.papel
      nome.value = admin.nome
      id.value = admin.id
    }

    const editar = async (admin, id) => {
      let dados = new URLSearchParams(admin)
      let resposta = await fetch('admins/' + id, {
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
        let resposta = await fetch('admins/' + id, {
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
      admins,
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