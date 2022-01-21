import { Input } from 'antd'
import { ListState } from './types'

export default ({
  todoItem,
  changeValue
}: {
  todoItem: ListState | undefined
  changeValue: (e: string) => void
}) => {
  console.log(todoItem)
  return (
    <div tw="bg-white w-3/12 p-4">
      <Input
        bordered={false}
        value={todoItem?.list}
        onChange={(e) => changeValue(e.target.value)}
      />
      <Input prefix="+" bordered={false} placeholder="下一步" />
    </div>
  )
}
