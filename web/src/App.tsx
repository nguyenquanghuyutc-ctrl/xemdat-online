import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { StickyCallBar } from './components/StickyCallBar'
import { HomePage } from './pages/HomePage'
import { ListingDetailPage } from './pages/ListingDetailPage'

function App() {
  return (
    <div className="flex min-h-screen flex-col pb-16 sm:pb-0">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  )
}

export default App
