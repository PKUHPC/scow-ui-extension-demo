import { NextRequest, NextResponse } from "next/server";

type NavItem = {
    path: string;
    text: string;
    clickToPath?: string | undefined;
    clickable?: boolean | undefined;
    icon?: {
      src: string;
      alt?: string
    },
    openInNewPage?: boolean | undefined;
    children?: NavItem[] | undefined;
}

interface Request {
  navs: NavItem[];
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Request;

  const searchParams = request.nextUrl.searchParams;
  const scowLangId = searchParams.get("scowLangId");

  const isChinese = scowLangId === "zh_cn";

  body.navs.push({
    path: "myExtensionPage",
    clickToPath: "myExtensionPage/page1",
    text: isChinese ? "扩展组" : "Ext Group",
    children: [
      { path: "myExtensionPage/page1", text: isChinese ? "扩展页面" : "Ext Page", icon: { src: "http://localhost:16566/ok.svg" }},
      { path: "https://www.pkuscow.com", text: isChinese ? "外部链接" : "Ext Link" },
    ]
  });

  return NextResponse.json({
    navs: body.navs,
  })
}