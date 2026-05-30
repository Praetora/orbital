import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/routes/HomePage'
import { SatelliteDetailPage } from '@/routes/SatelliteDetailPage'
import { AboutPage } from '@/routes/AboutPage'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/satellite/:id" element={<SatelliteDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
