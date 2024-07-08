"use client";

import { Button, Checkbox, Descriptions, DescriptionsProps, Form, Input } from "antd";
import { useEffect, useState } from "react";
import '../../../globals.css';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Page() {

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: <p>Zhou Maomao</p>,
      span: 3,
    },
    {
      key: '2',
      label: 'Telephone',
      children: <p>1810000000</p>,
      span: 3,
    },
    {
      key: '3',
      label: 'Live',
      children: <p>Hangzhou, Zhejiang</p>,
      span: 3,
    },
    {
      key: '4',
      label: 'Remark',
      children: <p>empty</p>,
      span: 3,
    },
    {
      key: '5',
      label: 'Address',
      children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
      span: 3,
    },
  ];
  
  const [descriptionsList, setDescriptionsList] = useState<Array<JSX.Element>>(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <Descriptions key={i} title="User Info" items={items} />
    ));
  });

  const addDescription = () => {
    setDescriptionsList((prevList) => [
      ...prevList,
      <Descriptions key={prevList.length} title="User Info" items={items} />
    ]);
  };
  
  // 发送 postMessage 信息时，请严格按照以下模式发送：
  const postIframeMessage = () =>{
    let elRect = document.querySelector("html")!.getBoundingClientRect();
    window.parent.postMessage({
      type: 'resizeExtensionIframe',  // 发送信息的类型，不允许更改
      payload: {
        height: elRect.height         // 设置iframe的高
      }
    }, '*')
  }

  // 页面首次生成及页面高度变化以后，调用一次postMessage通知iframe的parent重新设置iframe的高度。
  useEffect(()=>{
    postIframeMessage();
  },[descriptionsList]);

  return (
    <div>
      {descriptionsList}
      <Button onClick={addDescription}>页面加高</Button>
    </div>
  )
}