import { useState } from 'react'
import Display from './assets/Pages/Display'
import Display2 from './assets/Pages/Restart/Display2'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Display2/>
    </div>
  )
}

export default App
