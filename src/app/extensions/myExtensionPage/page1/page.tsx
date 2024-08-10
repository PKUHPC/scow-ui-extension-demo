"use client";

import { Button, Checkbox, Form, Input } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { useEffect } from "react";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const languages = {
  zh_cn: {
    username: "用户名",
    userToken: "用户token",
    password: "密码",
    remember: "记住登录",
    submit: "提交",
    title: "页面1标题",
  },
  en: {
    username: "Username",
    userToken: "User token",
    password: "Password",
    remember: "Remember Login",
    submit: "Submit",
    title: "Page 1 Title",
  }
};

export default function Page() {

  const search = useSearchParams();

  const token = search.get("scowUserToken");

  const languageId = search.get("scowLangId");

  const language = ((languageId && languageId in languages) 
    ? languages[languageId as keyof typeof languages] 
    : undefined
  ) ?? languages.zh_cn;

  useEffect(() => {
    window.parent?.postMessage({
      type: "scow.extensionPageTitleChanged", 
      payload: {
        title: language.title,
      }
    }, '*')
  }, [language]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true, token }}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label={language.username}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={language.userToken}
        name="token"
      >
        <Input disabled  />
      </Form.Item>

      <Form.Item<FieldType>
        label={language.password}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>{language.remember}</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {language.submit}
        </Button>
      </Form.Item>
    </Form>

  )
}