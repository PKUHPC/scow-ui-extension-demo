"use client";

import { Button, Checkbox, Descriptions, DescriptionsProps, Form, Input } from "antd";
import { useState } from "react";
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