import { ref, onMounted } from 'vue'

export default {
  setup() {
    const consultorias = ref([])
    const servico = ref('')
    const descricao = ref('')
    const detalhes = ref('')

    const listar = async () => {
      let response = await fetch('/consultorias')
      consultorias.value = await response.json()
    }

    const editar = async (id) => {
      let response = await fetch(`/consultorias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ servico: servico.value, descricao: descricao.value }),
      })
      let data = await response.json()
      console.log('Success:', data)
      await listar()
    }

    const apagar = async (id) => {
      let response = await fetch(`/consultorias/${id}`, {
        method: 'DELETE',
      })
      let data = await response.json()
      console.log('Success:', data)
      await listar()
    }

    const detalhesConsultoria = async (id) => {
      let response = await fetch(`/consultorias/${id}`)
      let consultoria = await response.json()
      detalhes.value = `
        <h2>Detalhes da Consultoria</h2>
        <p>ID: ${consultoria.id}</p>
        <p>Nome do Serviço: ${consultoria.servico}</p>
        <p>Descrição: ${consultoria.descricao}</p>
      `
    }

    onMounted(listar)

    return {
      consultorias,
      servico,
      descricao,
      detalhes,
      listar,
      editar,
      apagar,
      detalhesConsultoria
    }
  }
}