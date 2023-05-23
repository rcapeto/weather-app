import { ReactNode, ReactElement, Fragment } from 'react'

interface RenderItemParams<Type> {
  item: Type
  index: number
}

export interface MapperProps<Type> {
  items: Type[]
  keyExtractor: (item: Type) => string
  renderItem: (params: RenderItemParams<Type>) => ReactNode | ReactElement
}

export function Mapper<Type>({
  items,
  keyExtractor,
  renderItem,
}: MapperProps<Type>) {
  return (
    <Fragment>
      {items.map((item, index) => (
        <Fragment key={keyExtractor(item)}>
          {renderItem({ item, index })}
        </Fragment>
      ))}
    </Fragment>
  )
}
