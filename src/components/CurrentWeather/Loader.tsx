import Skeleton from 'react-loading-skeleton'

import { SkeletonContainer } from '@/components/SkeletonContainer'
import styles from './styles.module.css'

export function Loader() {
  return (
    <SkeletonContainer>
      <div className={styles.loaderContainer}>
        <header>
          <Skeleton width={200} height={30} />
        </header>

        <div className={styles.currentLocation}>
          <Skeleton width={70} height={30} />
          <Skeleton width={40} height={40} />
        </div>

        <div className={styles.weatherLoading}>
          <Skeleton width={80} height={80} />
          <Skeleton width={150} height={20} />
        </div>

        <div className={styles.itemsLoading}>
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>

        <div className={styles.descriptionsContainer}>
          <Skeleton width={200} height={20} />
          <Skeleton width={180} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={20} />
          <Skeleton width={70} height={20} />
        </div>
      </div>
    </SkeletonContainer>
  )
}
