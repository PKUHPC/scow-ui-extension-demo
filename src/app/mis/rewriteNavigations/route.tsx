import { NextRequest, NextResponse } from "next/server";

type NavItem = {
    path: string;
    text: string;
    clickToPath?: string | undefined;
    clickable?: boolean | undefined;
    iconSrc?: string | undefined;
    iconAlt?: string;
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
    path: "/extensions/myExtensionPage",
    clickToPath: "/extensions/myExtensionPage/page1",
    text: isChinese ? "扩展组" : "Ext Group",
    children: [
      { path: "/extensions/myExtensionPage/page1", text: isChinese ? "扩展页面" : "Ext Page", iconSrc: "http://localhost:16566/vercel.svg" },
      { path: "https://github.com", text: isChinese ? "外部链接 (Github)" : "Ext Link (GitHub)" },
    ]
  });

  return NextResponse.json({
    navs: body.navs,
  })
}