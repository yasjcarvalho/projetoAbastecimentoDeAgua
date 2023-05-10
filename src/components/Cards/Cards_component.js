import React, { useEffect, useState } from 'react'

function Cards_component() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://compras.dados.gov.br/comprasContratos/v1/contratos.json?fornecedor_cnpj_cpf_idgener=12.294.708/0001-81'
      )
      const jsonData = await response.json()
      console.log(jsonData) // log dos dados recebidos
      console.log(jsonData._embedded) // log dos dados reais relacionados ao contrato
      setData(
        jsonData._embedded.contratos.map(item => ({
          id: item.id,
          unidade_nome_resumido: item.unidade_nome_resumido,
          categoria: item.categoria,
          objeto: item.objeto,
          valor_inicial: item.valor_inicial
        }))
      )
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
