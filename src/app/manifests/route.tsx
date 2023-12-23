import { NextResponse } from "next/server"

export async function GET () { 
  return NextResponse.json({
    portal: {
      rewriteNavigations: true
    },
    mis: {
      rewriteNavigations: true
    },
  });
}