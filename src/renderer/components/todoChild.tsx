import { useState } from 'react'
import { nanoid } from 'nanoid'
import { ListState } from './types'
import { Input, Tooltip, Checkbox } from '~antd'

export default ({
  todoItem,
  changeValue,
  addChild
}: {
  todoItem: ListState | undefined
  changeValue: (e: string) => void
  addChild: (e: string) => void
}) => {
  const [value, setValue] = useState<string>('')
  const addChildren = (e: any) => {
    if ((e.target as HTMLInputElement).value.trim().length > 0) {
      addChild({
        ...todoItem,
        children: [
          ...(todoItem.children || []),
          {
            list: (e.target as HTMLInputElement).value,
            status: false,
            id: nanoid()
          }
        ]
      })
      setValue('')
      console.log(todoItem)
      console.log({
        ...todoItem,
        children: [
          ...(todoItem.children || []),
          {
            list: (e.target as HTMLInputElement).value,
            status: false,
            id: nanoid()
          }
        ]
      })
    }
  }
  return (
    <div tw="bg-white w-3/12 p-4">
      <Input
        bordered={false}
        value={todoItem?.list}
        onChange={(e) => changeValue(e.target.value)}
      />
      {todoItem?.children?.map((item: ListState) => (
        <div tw="p-2 flex items-center" key={item.id}>
          <Tooltip title="标记为已完成" color={'cyan'}>
            <Checkbox checked={item.status}></Checkbox>
          </Tooltip>
          <Input
            bordered={false}
            tw="border-b-2"
            value={item.list}
            onChange={(e) => changeValue(e.target.value)}
          />
        </div>
      ))}
      <Input
        prefix="+"
        bordered={false}
        placeholder="下一步"
        onPressEnter={(e) => addChildren(e)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
