import { NextRequest, NextResponse } from "next/server";

type NavbarLink = {
    path: string;
    text: string;
    icon?: {
      src: string;
      alt?: string
    },
    openInNewPage?: boolean | undefined;
    priority?: number;
}


export async function POST(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const scowLangId = searchParams.get("scowLangId");

  const isChinese = scowLangId === "zh_cn";

  return NextResponse.json({
    navbarLinks: [
      {
        path: "https://www.pkuscow.com",
        text: isChinese ? "通知" : "Notification",
        icon: { src: "http://localhost:16566/bell.svg" },
      },      
      {
        path: "navExtensionPage/page2",
        text: isChinese ? "聊天" : "Chat",
        icon: { src: `http://localhost:16566/${Math.random() > 0.5 ? "chat-unread.svg" : "chat.svg"}` },
        priority: 100,
      },
    ] satisfies NavbarLink[]
  });
}