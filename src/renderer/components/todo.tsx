import React, { useState } from 'react'
import { nanoid } from 'nanoid'
// import Store from 'electron-store'
import { ListState } from './types'
import TodoChild from './todoChild'
import { Input, Checkbox, Tooltip } from '~antd'

export default () => {
  const [List, setList] = useState<ListState[]>([])
  const [value, setValue] = useState<string>('')
  const onPressEnter = (value: string) => {
    if (value.trim().length > 0) {
      setList([...List, { list: value, status: false, id: nanoid() }])
      // console.log(Store)
      setValue('')
    }
  }
  const toggleItem = (e: React.ChangeEvent<HTMLInputElement>, i: ListState) => {
    setList(
      List.map((item) => {
        if (item.id === i.id) {
          return { ...item, status: e.target.checked }
        }
        return item
      })
    )
  }

  const setV = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const [todoItem, setTodoItem] = useState<ListState | undefined>()

  // children todo
  const childrenChange = (e: string) => {}

  const addChild = (rtItem: ListState[]) => {
    console.log(rtItem, List)
    const rtList = List.map((item) => {
      if (item.id === rtItem.id) {
        item = rtItem
      }
      return item
    })
    console.log(rtList)
    setList(rtList)
    setTodoItem(rtItem)
  }

  return (
    <div tw="p-1 flex justify-between bg-green-50 h-screen">
      <div tw={`flex-auto w-9/12`}>
        <b>todo list</b>
        <Input
          prefix="+"
          bordered={false}
          onPressEnter={(e) =>
            onPressEnter((e.target as HTMLInputElement).value)
          }
          placeholder="添加任务"
          value={value}
          onChange={setV}
        />
        {List.filter((e) => !e.status).map((item: ListState) => {
          return (
            <div
              tw="p-1 hover:bg-green-100 cursor-pointer"
              key={item.id}
              onClick={() => {
                setTodoItem(item)
              }}
            >
              <Tooltip title="标记为已完成" color={'cyan'}>
                <Checkbox
                  checked={item.status}
                  onChange={(e: any) => toggleItem(e, item)}
                ></Checkbox>
              </Tooltip>
              <span tw="ml-2 w-full">{item.list}</span>
            </div>
          )
        })}
        {List.filter((e) => e.status).length > 0 && (
          <em>已完成 {List.filter((e) => e.status).length}</em>
        )}
        {List.filter((e) => e.status).map((item: ListState) => {
          return (
            <div
              tw="p-1 hover:bg-green-100 cursor-pointer"
              key={item.id}
              onClick={() => {
                setTodoItem(item)
              }}
            >
              <Tooltip title="标记为未完成" color="cyan">
                <Checkbox
                  checked={item.status}
                  onChange={(e: any) => toggleItem(e, item)}
                ></Checkbox>
              </Tooltip>
              <span tw="ml-2 w-full">{item.list}</span>
            </div>
          )
        })}
      </div>
      {todoItem && (
        <TodoChild
          todoItem={todoItem}
          changeValue={(e: any) => childrenChange(e)}
          addChild={addChild}
        />
      )}
    </div>
  )
}
