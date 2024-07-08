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

  
  const [count, setCount] = useState(5);

  const addItem = () => {
    setCount((c) => c+1);
  };

  const removeItem = () => {
    setCount((c) => c-1);
  };

  
  useEffect(()=>{
    // postIframeMessage();
    const sendMessage = (height: number) => {
      window.parent.postMessage({
        type: "resizeExtensionIframe",  // 发送信息的类型，不允许更改
        payload: {
          height: height
        }
      }, '*')
    }

    const observer = new ResizeObserver((entries) => {

      const e = entries[0];
      sendMessage(e.contentRect.height);
    });


    const htmlElement = document.querySelector("html")!;

    sendMessage(htmlElement.getBoundingClientRect().height);

    observer.observe(htmlElement);

    return () => {
      observer.disconnect();
    }

  }, []);

  return (
    <div>
      {Array.from({length: count}).map((_, index) => (
        <div key={index} style={{padding: 10, border: '1px solid #ccc', marginBottom: 10}}>
          <Descriptions title={`Item ${index+1}`} layout="vertical">
            <Descriptions.Item label="Name">Zhang San</Descriptions.Item>
            <Descriptions.Item label="Age">18</Descriptions.Item>
          </Descriptions>        
        </div>
      ))}
      <Button onClick={addItem}>Add 1 item</Button>
      <Button onClick={removeItem}>Remove 1 item</Button>
    </div>
  )
}