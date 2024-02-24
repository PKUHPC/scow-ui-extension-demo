"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { App, ConfigProvider, Layout, theme } from "antd"
import React, { PropsWithChildren, useState } from "react";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { useSearchParams } from "next/navigation";

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

const Page: React.FC<React.PropsWithChildren> = ({ children }) => {

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