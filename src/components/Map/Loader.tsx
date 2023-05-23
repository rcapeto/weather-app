import Skeleton from 'react-loading-skeleton'

import { SkeletonContainer } from '@/components/SkeletonContainer'
import styles from './styles.module.css'

export function Loader() {
  return (
    <SkeletonContainer>
      <div className={styles.loaderContainer}>
        <Skeleton className={styles.skeleton} />
      </div>
    </SkeletonContainer>
  )
}
