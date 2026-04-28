import { NextResponse } from "next/server";
import { getServiceRoleClient, requirePartyAdmin } from "@/party/lib/server";

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      secret?: string;
      eventClosed?: boolean;
    };

    requirePartyAdmin(body.secret);

    const supabase = getServiceRoleClient();
    const result = await supabase.from("party_settings").upsert({
      id: "main",
      event_closed: Boolean(body.eventClosed),
    });

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Settings update failed",
      },
      { status: 400 },
    );
  }
}

