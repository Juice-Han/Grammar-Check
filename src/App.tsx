import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DefaultLayout from './Layouts/DefaultLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
