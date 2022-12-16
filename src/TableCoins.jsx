import "./tableCoins.css";
import CoinRow from "./CoinRow";

function TableCoins({coins}) {
  console.log(coins)
  return (
    <table className="table_coins">
        <thead>
          <tr>
            <td>#</td>
            <td>Moneda</td>
            <td>Precios</td>
            <td>24h</td>
            <td>Vol. total</td>
            <td>Cap. mercado</td>
            <td>Últimos 7 días</td>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) =>(
            <CoinRow coin={coin} key={index} index={index + 1}/>
          ))} 
        </tbody>
    </table>
  );
}

export default TableCoins;
