import { Navigate, Route, Routes } from 'react-router-dom'
import { ExamPage } from './pages/ExamPage'
import { HomePage } from './pages/HomePage'
import { InstructionsPage } from './pages/InstructionsPage'
import { ResultPage } from './pages/ResultPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/instructions/:paperId" element={<InstructionsPage />} />
      <Route path="/exam/:paperId" element={<ExamPage />} />
      <Route path="/result/:attemptId" element={<ResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
