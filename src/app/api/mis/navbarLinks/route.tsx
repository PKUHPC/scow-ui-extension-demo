import { NextRequest, NextResponse } from "next/server";

type NavbarLink = {
    path: string;
    text: string;
    icon?: {
      src: string;
      alt?: string
    },
    openInNewPage?: boolean | undefined;
}


export async function POST(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const scowLangId = searchParams.get("scowLangId");

  const isChinese = scowLangId === "zh_cn";

  return NextResponse.json({
    navbarLinks: [
      {
        path: "https://www.pkuscow.com",
        text: isChinese ? "通知系统" : "Notification",
        icon: { src: "http://localhost:16566/chat.svg" },
      },   
      {
        path: "navExtensionPage/page2",
        text: isChinese ? "长页面" : "Notification",
        icon: { src: "http://localhost:16566/chat.svg" },
      },     
    ] as NavbarLink[]
  });
}