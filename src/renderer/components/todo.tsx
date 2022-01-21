import { Input, Checkbox, Tooltip } from 'antd'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { ListState } from './types'
import TodoChild from './todoChild'

export default () => {
  const [List, setList] = useState<ListState[]>([])
  const [FinishedList, setFinishedList] = useState<ListState[]>([])
  const [value, setValue] = useState<string>('')
  const onPressEnter = (value: string) => {
    if (value.trim().length > 0) {
      setList([...List, { list: value, status: false, id: nanoid() }])
      setValue('')
    }
  }
  const selectItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ListState,
    i: number,
    ing: boolean
  ) => {
    if (ing) {
      if (e?.target?.checked) {
        setFinishedList([...FinishedList, { ...item, status: true }])
        setList(List.filter((item: ListState) => item.id !== List[i].id))
      }
    } else {
      if (!e.target.checked) {
        setList([...List, { ...item, status: false }])
        setFinishedList(
          FinishedList.filter(
            (item: ListState) => item.id !== FinishedList[i].id
          )
        )
      }
    }
  }

  const setV = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const [todoItem, setTodoItem] = useState<ListState | undefined>()

  // children todo
  const childrenChange = (e: string) => {}
  return (
    <div tw="p-1 flex justify-between bg-green-50">
      <div tw={`flex-auto w-9/12`}>
        <b>todo list</b>
        <Input
          prefix="+"
          bordered={false}
          onPressEnter={(e) => onPressEnter(e.target.value)}
          placeholder="添加任务"
          value={value}
          onChange={setV}
        />
        {List.map((item: ListState, index: number) => {
          return (
            <div
              tw="p-1 hover:bg-green-100 cursor-pointer"
              key={index}
              onClick={() => {
                setTodoItem(item)
              }}
            >
              <Tooltip title="标记为已完成" color={'cyan'}>
                <Checkbox
                  checked={item.status}
                  onChange={(e) => selectItem(e, item, index, true)}
                ></Checkbox>
              </Tooltip>
              <span tw="ml-2 w-full">{item.list}</span>
            </div>
          )
        })}
        {FinishedList.length > 0 && <em>FinishedList {FinishedList.length}</em>}
        {FinishedList.map((item: ListState, index: number) => {
          return (
            <div tw="p-1 hover:bg-green-100 cursor-pointer" key={index}>
              <Tooltip title="标记为未完成" color="cyan">
                <Checkbox
                  checked={item.status}
                  onChange={(e) => selectItem(e, item, index, false)}
                ></Checkbox>
              </Tooltip>
              <span tw="ml-2 w-full">{item.list}</span>
            </div>
          )
        })}
      </div>
      {todoItem && (
        <TodoChild todoItem={todoItem} changeValue={(e) => childrenChange(e)} />
      )}
    </div>
  )
}
