import { colorDec } from "./App"
import "./Card.css"
import Graph from "./Graph"

export default function Card({coinId, porcentaje, price, img, cur}){
    return (
        <div className="card">
            <img src={img} alt="Icono de cripto" />
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price} {cur}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} color={colorDec(porcentaje)} currency={cur}/>  
            </div>
        </div> 
    )
}