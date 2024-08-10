import { NextResponse } from "next/server"

export async function GET () { 
  return NextResponse.json({
    portal: {
      rewriteNavigations: true,
      navbarLinks: {
        enabled: true,
        autoRefresh: {
          enabled: true,
          intervalMs: 1000,
        },
      },
    },
    mis: {
      rewriteNavigations: true
    },
  });
}