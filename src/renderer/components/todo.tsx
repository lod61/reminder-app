import {Input, Checkbox} from 'antd'
import { useState } from 'react';

interface ListState {
    list: string;
    status: boolean;
}
export default () =>{
    const [List, setList] = useState<ListState[]>([])
    const [FinishedList, setFinishedList] = useState<ListState[]>([]);
    const [value, setValue] = useState<string>('')
    const onPressEnter = () => {
        setList([...List, {list:value, status: false}])
        setValue('')
    }
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
        <ul>
          {List.map((item:ListState, index:number) => {
            return (
              <div tw="flex" key={index}>
                <Checkbox checked={item.status} onChange={(e)=>{
                    if(e.target.checked){
                        setFinishedList([...FinishedList, item])
                        setList(List.filter((item:ListState)=>item.list !== List[index].list))
                    }
                }} />
                <li tw="ml-2">{item.list}</li>
              </div>
            );
          })}
        </ul>
        {FinishedList.length>0&&<em>FinishedList {FinishedList.length}</em>}
        <ul>
            {FinishedList.map((item:ListState, index:number) => {
                return (
                    <div tw="flex" key={index}>
                        <Checkbox checked={item.status} onChange={(e)=>{
                            if(e.target.checked){
                                setList([...List, item])
                                setFinishedList(FinishedList.filter((item:ListState)=>item.list !== FinishedList[index].list))
                            }
                        }} />
                        <li tw="ml-2">{item.list}</li>
                    </div>
                );
            })}
        </ul>

      </div>
    );
}