import ModalContextProvider from '@/context/Modal'
import TabContextProvider from '@/context/TabContext'

import { Header } from '@/components/Header'
import { PageContent } from '@/components/PageContent'
import { Compose } from '@/components/Compose'

const contexts = [ModalContextProvider, TabContextProvider]

export default function Home() {
  return (
    <Compose contexts={contexts}>
      <main className="weather-app-content">
        <Header />

        <section className="weather-app-scroll">
          <TabContextProvider>
            <PageContent />
          </TabContextProvider>
        </section>
      </main>
    </Compose>
  )
}
