import { NextResponse } from "next/server"

export async function GET () { 
  return NextResponse.json({
    portal: {
      rewriteNavigations: true,
      navbarLinks: true,
    },
    mis: {
      rewriteNavigations: true
    },
  });
}