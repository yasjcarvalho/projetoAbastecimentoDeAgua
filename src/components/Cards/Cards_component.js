import React, { useEffect, useState } from 'react'

function Cards_component() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //constante com fetch para buscar dados da api
      const resultJson = await fetch(
        'https://compras.dados.gov.br/comprasContratos/v1/contratos.json?fornecedor_cnpj_cpf_idgener=12.294.708/0001-81'
      )
      //guardando o resultado obtido nessa constante
      const resultContrato = await resultJson.json()

      console.log(resultContrato) // log dos dados recebidos
      console.log(resultContrato._embedded) // log dos dados reais relacionados ao contrato

      let resultFormatado = resultContrato._embedded.contratos.map(
        ({ id, unidade_nome_resumido, categoria, objeto, valor_inicial }) => ({
          id: id,
          unidade_nome_resumido: unidade_nome_resumido,
          categoria: categoria,
          objeto: objeto,
          valor_inicial: valor_inicial
        })
      )

      // setData(
      //   resultContrato._embedded.contratos.map(item => ({
      //     id: item.id,
      //     unidade_nome_resumido: item.unidade_nome_resumido,
      //     categoria: item.categoria,
      //     objeto: item.objeto,
      //     valor_inicial: item.valor_inicial
      //   }))
      // )

      setData(resultFormatado)
    }
    fetchData()
  }, [])

  console.log(data) // log dos dados a serem renderizados na página

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            <p>Nome: {item.unidade_nome_resumido}</p>
            <p>Categoria: {item.categoria}</p>
            <p>Objeto: {item.objeto}</p>
            <p>Valor: {item.valor_inicial}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cards_component
