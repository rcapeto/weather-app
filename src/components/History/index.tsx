import { Frown } from 'lucide-react'

import { useHistory } from '@/hooks/useHistory'
import { useTabs } from '@/hooks/useTabs'

import { SectionTitle } from '@/components/SectionTitle'
import { Mapper } from '@/components/Mapper'
import { ErrorPage } from '@/components/ErrorPage'
import { HistoryItem } from './components/HistoryItem'

import { Tabs } from '@/context/Tabs/types'

import { colors } from '@/config/colors'

import styles from './styles.module.css'

export function History() {
  const { updateCurrentTab } = useTabs()
  const { locationsHistory } = useHistory()

  if (!locationsHistory.length) {
    return (
      <ErrorPage
        title="Oh! Sua lista está vazia!"
        errorMessage="Parece que sua lista está vazia, que tal procurar alguns endereços? 😍"
        buttonText="Procurar endereço"
        onPressBtn={() => updateCurrentTab(Tabs.MAP)}
        icon={<Frown color={colors.purple[600]} size={150} />}
        errorContentStyle={styles.errorContainer}
      />
    )
  }

  return (
    <div className={styles.historyContainer}>
      <SectionTitle text="Seu histórico de navegação" />

      <div className={styles.itensContainer}>
        <Mapper
          items={locationsHistory}
          keyExtractor={(historyItem) =>
            historyItem.concat(Date.now().toString())
          }
          renderItem={({ item }) => <HistoryItem item={item} />}
        />
      </div>
    </div>
  )
}
