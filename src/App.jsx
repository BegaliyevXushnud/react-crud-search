import { useState } from 'react'
import './App.css'
import ItemList from './commonent/itemlist/ItemList'

function App() {
 
  return (
    <>
 <div>
 <h1 className='text-center'>JSON Server CRUD va Qidiruv</h1>
 
 <ItemList/>
  </div>     
    </>
  )
}

export default App
