import { NextResponse } from "next/server";
import { PARTY_SEED_ITEMS } from "@/party/lib/seed";
import { getServiceRoleClient, requirePartyAdmin } from "@/party/lib/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { secret?: string };
    requirePartyAdmin(body.secret);
    const supabase = getServiceRoleClient();

    const settingsResult = await supabase.from("party_settings").upsert({
      id: "main",
      event_closed: false,
    });

    if (settingsResult.error) {
      throw settingsResult.error;
    }

    const itemsResult = await supabase.from("party_items").upsert(
      PARTY_SEED_ITEMS.map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        note: item.note,
        unit_label: item.unitLabel,
        target_quantity: item.targetQuantity,
        sort_order: item.sortOrder,
        is_custom: false,
      })),
      { onConflict: "id" },
    );

    if (itemsResult.error) {
      throw itemsResult.error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Seed failed",
      },
      { status: 400 },
    );
  }
}

