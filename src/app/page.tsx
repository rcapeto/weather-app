import { CurrentWeather } from '@/components/CurrentWeather'
import { Header } from '@/components/Header'
import ModalContextProvider from '@/context/Modal'

export default function Home() {
  return (
    <ModalContextProvider>
      <main className="weather-app-content">
        <Header />

        <section className="weather-app-scroll">
          <CurrentWeather />
        </section>
      </main>
    </ModalContextProvider>
  )
}
