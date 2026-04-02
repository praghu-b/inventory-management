import { Dashboard } from './pages/Dashboard'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  )
}

export default App
