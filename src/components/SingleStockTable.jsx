import React, { useContext, useEffect, useState } from 'react'
import context from '../context/myContext'

export default function SingleStockTable({ stock }) {
  const { willBuy } = useContext(context)
  const [currentStock, setCurrentStock] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const allUsersStocks = JSON.parse(localStorage.getItem('usersStocks')) || {};
    const i = allUsersStocks[user.id].findIndex(({ code }) => code === stock.code)
      setCurrentStock(allUsersStocks[user.id][i]);
  }, [stock.code]);

  return (
    <div>
      <h1>Comprar/Vender Ação</h1>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Empresa</th>
          <th>Categoria</th>
          <th>Valor Unitário</th>
          { !willBuy && <>
          <th>Quantidade</th>
          <th>Valor Total</th>
          </>  }     
        </tr>
      </thead>
      <tbody>        
        <tr>
          <td>{stock.code}</td>
          <td>{stock.name}</td>
          <td>{stock.category}</td>
          <td>{parseFloat(stock.value).toFixed(2)}</td>
          { !willBuy && <>
          <td>{currentStock.quantity}</td>
          <td>{(parseFloat(stock.value) * parseFloat(currentStock.quantity)).toFixed(2)}</td>
          </>  }                           
        </tr>          
      </tbody>
    </table>
    </div>
  )
}
