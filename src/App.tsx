import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DefaultLayout from './Layouts/DefaultLayout'
import GrammarCheckPage from './pages/GrammarCheckPage'
import WrongSummaryPage from './pages/WrongSummaryPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<GrammarCheckPage />} />
          <Route path="/grammar-check" element={<GrammarCheckPage />} />
          <Route path="/wrong-summary" element={<WrongSummaryPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
