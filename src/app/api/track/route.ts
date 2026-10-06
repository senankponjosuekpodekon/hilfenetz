import { type NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { path?: unknown; locale?: unknown; referrer?: unknown };
    const path = String(body.path ?? "").trim();

    // On ignore les pages admin, API et les assets statiques
    if (!path || path.startsWith("/admin") || path.startsWith("/api") || path.includes(".")) {
      return NextResponse.json({ ok: true });
    }

    const locale = body.locale ? String(body.locale) : null;
    const referrer = body.referrer ? String(body.referrer).slice(0, 500) : null;
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32);

    await db.analyticsEvent.create({
      data: {
        type: "page_view",
        path,
        locale,
        referrer,
        userAgent,
        ipHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
