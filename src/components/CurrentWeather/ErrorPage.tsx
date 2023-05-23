import { Frown } from 'lucide-react'

import { ErrorPage } from '@/components/ErrorPage'

import { colors } from '@/config/colors'

export function Error() {
  return (
    <ErrorPage
      title="Oh! Ocorreu um erro"
      errorMessage="Verifique se seu navegador tem permissão para obter sua localização ou tente novamente mais tarde"
      buttonText="Recarregar página"
      onPressBtn={() => window.location.reload()}
      icon={<Frown color={colors.purple[600]} size={150} />}
    />
  )
}
