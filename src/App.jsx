import { useState } from 'react'
import Display from './assets/Pages/Display'
import Home from './assets/Pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App
