"use client";

import { Inter } from 'next/font/google'
import { App, ConfigProvider, Layout, theme } from "antd"
import React, { PropsWithChildren, useEffect, useState } from "react";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { useSearchParams } from "next/navigation";
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Page>
            {children}
          </Page>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

const DarkModeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  const search = useSearchParams();

  const dark = search.get("scowDark") === "true";

  return (
    <ConfigProvider theme={{
      algorithm: dark ? theme.darkAlgorithm : undefined,
    }}>
      {children}
    </ConfigProvider>
  )

}

const useReportHeightToScow = () => {

  useEffect(()=>{
    // postIframeMessage();
    const sendMessage = (height: number) => {
      window.parent?.postMessage({
        type: "scow.extensionPageHeightChanged",  // 发送信息的类型，不允许更改
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

    sendMessage(htmlElement.getBoundingClientRect().height + 20);

    observer.observe(htmlElement);

    return () => {
      observer.disconnect();
    }

  }, []);
}

const Page: React.FC<React.PropsWithChildren> = ({ children }) => {

  useReportHeightToScow();

  return (
    <App>
      <DarkModeProvider>
        <Layout>
          {children}
        </Layout>
      </DarkModeProvider>
    </App>
  );
}