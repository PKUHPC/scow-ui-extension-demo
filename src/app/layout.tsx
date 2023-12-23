"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { App, ConfigProvider, Layout, theme } from "antd"
import { ThemeStore } from "@/app/theme";
import { StoreProvider, createStore, useStore } from "simstate";
import React, { useState } from "react";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [themeStore] = useState(() => createStore(ThemeStore));

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider stores={[themeStore]}>
            <Page>
              {children}
            </Page>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

const Page: React.FC<React.PropsWithChildren> = ({ children }) => {

  const themeStore = useStore(ThemeStore);

  return (
    <App>
      <ConfigProvider theme={{
        algorithm: themeStore.dark ? theme.darkAlgorithm : undefined,
      }}>
        <Layout>
          {children}
        </Layout>
      </ConfigProvider>
    </App>
  );
}