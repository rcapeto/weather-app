import { PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { colors } from '@/config/colors'

export function SkeletonContainer(props: PropsWithChildren) {
  return (
    <SkeletonTheme
      baseColor={colors.gray[300]}
      highlightColor={colors.gray[400]}
    >
      {props.children}
    </SkeletonTheme>
  )
}
