import { Header } from '@/components/Header'
import { PageContent } from '@/components/PageContent'

export default function Home() {
  return (
    <main className="weather-app-content">
      <Header />

      <section className="weather-app-scroll">
        <PageContent />
      </section>
    </main>
  )
}
