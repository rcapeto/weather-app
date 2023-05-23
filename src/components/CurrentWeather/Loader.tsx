import Skeleton from 'react-loading-skeleton'
import styles from './styles.module.css'
import { SkeletonContainer } from '@/components/SkeletonContainer'

export function Loader() {
  return (
    <SkeletonContainer>
      <div className={styles.loaderContainer}>
        <header>
          <Skeleton width={200} height={30} />
        </header>
      </div>
    </SkeletonContainer>
  )
}
