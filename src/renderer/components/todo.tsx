import { Input, Checkbox, Button } from 'antd';
import { useState } from 'react';
import { nanoid } from 'nanoid';

interface ListState {
  list: string;
  status: boolean;
  id: string;
}
export default () => {
  const [List, setList] = useState<ListState[]>([]);
  const [FinishedList, setFinishedList] = useState<ListState[]>([]);
  const [value, setValue] = useState<string>('');
  const onPressEnter = () => {
    setList([...List, { list: value, status: false, id: nanoid() }]);
    setValue('');
  };
  const selectItem = (e: any, item: ListState, i: number, ing: boolean) => {
    if (ing) {
      if (e.target.checked) {
        setFinishedList([...FinishedList, { ...item, status: true }]);
        setList(List.filter((item: ListState) => item.id !== List[i].id));
      }
    } else {
      if (!e.target.checked) {
        setList([...List, { ...item, status: false }]);
        setFinishedList(
          FinishedList.filter(
            (item: ListState) => item.id !== FinishedList[i].id
          )
        );
      }
    }
  };

  return (
    <div tw="p-1">
      <b>todo list</b>
      <Input
        prefix={'+'}
        bordered={false}
        onPressEnter={onPressEnter}
        placeholder="添加任务"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {List.map((item: ListState, index: number) => {
        return (
          <div tw="p-1 hover:bg-green-100" key={index}>
            <Checkbox
              style={{ display: 'flex' }}
              checked={item.status}
              onChange={(e) => selectItem(e, item, index, true)}
            >
              <li tw="ml-2 w-full">{item.list}</li>
            </Checkbox>
          </div>
        );
      })}
      {FinishedList.length > 0 && <em>FinishedList {FinishedList.length}</em>}
      {FinishedList.map((item: ListState, index: number) => {
        return (
          <div tw="p-1 hover:bg-green-100" key={index}>
            <Checkbox
              style={{ display: 'flex' }}
              checked={item.status}
              onChange={(e) => selectItem(e, item, index, false)}
            >
              <div tw="flex w-max">
                <li tw="ml-2 w-full">{item.list}</li>
              </div>
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};
