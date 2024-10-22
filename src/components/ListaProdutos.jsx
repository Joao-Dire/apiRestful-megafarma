import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaEdit, FaTrash } from "react-icons/fa"

const DivLista = styled.div`
    width: 70%; margin: auto; font-family: Arial;
    a{text-decoration: none; padding: 10px 15px; margin-bottom: 20px;
        background-color: yellowgreen; color: white; display: inline-block;
    }
    table{width: 100%; margin: auto;}
    thead tr{background-color: darkblue; color: white;}
    thead tr th{padding: 10px;}
    tbody tr:nth-child(2n+2){background-color: #ccc;}
    tbody tr td a{background-color: none; margin-bottom: 5px; color: blue;}
    tbody tr td button{color: red; background-color: none; border: none; cursor: pointer; padding: 13px 17px;}
    tfoot tr td{text-align: center; background-color: #333; color: white;}
`

export default function ListaProdutos(){

    const [produtos, setProdutos] = useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/megafarma").then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            setProdutos(resp)
            console.log(resp)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleDelete = (id)=>{
        fetch(`http://localhost:8080/megafarma/${id}`,{
            method:"delete"
        }).then(()=>{
            window.location = "/"
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <DivLista>
            <h1>Lista de Remédios</h1>
            <Link to="incluir">Inserir Remédio</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th><th>Preço</th><th>Data de Fabricação</th><th>Data de Validade</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto)=>(
                        <tr key={produto.codigo}>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco}</td>
                            <td>{produto.dataDeFabricacao}</td>
                            <td>{produto.dataDeValidade}</td>
                            <td>
                                <Link to={`/editar/${produto.codigo}`}><FaEdit /></Link>&nbsp;
                                <button onClick={handleDelete.bind(this, produto.codigo)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot><tr><td colSpan="5">Produtos do Banco de Dados</td></tr></tfoot>
            </table>
        </DivLista>
    )

}