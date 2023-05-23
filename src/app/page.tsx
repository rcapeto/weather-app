import { Header } from '@/components/Header'
import { PageContent } from '@/components/PageContent'
import ModalContextProvider from '@/context/Modal'
import TabContextProvider from '@/context/TabContext'

export default function Home() {
  return (
    <ModalContextProvider>
      <main className="weather-app-content">
        <Header />

        <section className="weather-app-scroll">
          <TabContextProvider>
            <PageContent />
          </TabContextProvider>
        </section>
      </main>
    </ModalContextProvider>
  )
}
