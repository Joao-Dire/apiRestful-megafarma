import { useEffect, useState } from "react"
import { useParams, Link, json } from "react-router-dom"
import styled from "styled-components"
import { FaLocationArrow, FaRegTimesCircle } from "react-icons/fa"

const DivForm = styled.div`
    width: 70%; margin: auto; font-family: Arial, Helvetica, sans-serif;
    h1{text-align: center;}
    form{width: 80%; margin: auto;}
    form input{width: 100%; padding: 5px; margin-bottom: 5px;}
    a{background-color: red; margin-botton: 5px; color: white; text-decoration: none; padding: 5px;}
    button{color: white; background-color: green; border: none; display: inline-block; padding: 6px; margin-right: 10px;}
`

export default function FormProduto(){
    
    let {id} = useParams()

    const [novo, setNovo] = useState({
        codigo:id,
        nome:"",
        preco:"",
        dataDeFabricacao:"",
        dataDeValidade:""
    })

    let metodo = "post"

    if(id){
        metodo = "put"
    }

    const handleChange = e =>{
        setNovo({...novo, [e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()

        fetch(`http://localhost:8080/megafarma/${id ? id : ""}`, {
            method: metodo,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(novo)
        }).then(()=>{
            window.location = "/"
        })
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:8080/megafarma/${id}`)
            .then((resp)=>{
                return(resp.json())
            }).then(data=>{
                setNovo(data)
            })
        }
    }, [id])

    return(
        <DivForm>
             <h1>Formulário de Remédios</h1>            
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do remédio: </label><input type="text" name="nome" value={novo.nome} placeholder="Nome do remédio" onChange={handleChange} /><br />
                <label htmlFor="preco">Preço: </label><input type="number" name="preco" value={novo.preco} placeholder="Preço" onChange={handleChange} step="0.01" /><br />
                <label htmlFor="dataDeFabricacao">Data de Fabricação: </label><input type="date" name="dataDeFabricacao" value={novo.dataDeFabricacao} onChange={handleChange} /><br />
                <label htmlFor="dataDeValidade">Data de Validade: </label><input type="date" name="dataDeValidade" value={novo.dataDeValidade} onChange={handleChange} /><br />
                <button><FaLocationArrow /></button>
                <Link to="/"><FaRegTimesCircle /></Link>
            </form>
        </DivForm>
    )

}