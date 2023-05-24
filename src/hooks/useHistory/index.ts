import { useContext } from 'react'

import { HistoryContext } from '@/context/History'

export function useHistory() {
  return useContext(HistoryContext)
}
