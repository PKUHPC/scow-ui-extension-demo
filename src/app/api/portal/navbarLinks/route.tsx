import { NextRequest, NextResponse } from "next/server";

type NavbarLink = {
    href: string;
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
        href: "https://www.pkuscow.com",
        text: isChinese ? "通知" : "Notification",
        icon: { src: "http://localhost:16566/bell.svg" },
      },      
      {
        href: "/extensions/navExtensionPage/page2",
        text: isChinese ? "聊天" : "Chat",
        icon: { src: "http://localhost:16566/chat.svg" },
        priority: 100,
      },      
    ] satisfies NavbarLink[]
  });
}