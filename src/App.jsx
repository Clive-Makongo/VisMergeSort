import { useState } from 'react'
import Display from './assets/Pages/Display'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Display/>
    </>
  )
}

export default App
