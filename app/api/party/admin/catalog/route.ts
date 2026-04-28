import { NextResponse } from "next/server";
import { getServiceRoleClient, requirePartyAdmin } from "@/party/lib/server";
import type { PartyCatalogItem } from "@/party/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      secret?: string;
      item?: PartyCatalogItem;
    };

    requirePartyAdmin(body.secret);

    if (!body.item || body.item.title.trim().length < 2) {
      throw new Error("Ungültigs Item.");
    }

    const supabase = getServiceRoleClient();
    const payload = {
      id: body.item.id || undefined,
      category: body.item.category,
      title: body.item.title.trim(),
      note: body.item.note?.trim() || null,
      unit_label: body.item.unitLabel.trim(),
      target_quantity: Math.max(1, Math.floor(body.item.targetQuantity)),
      sort_order: Math.max(1, Math.floor(body.item.sortOrder || 500)),
      is_custom: body.item.isCustom ?? false,
    };

    const result = await supabase.from("party_items").upsert(payload).select("id").single();

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ ok: true, id: result.data.id });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Catalog save failed",
      },
      { status: 400 },
    );
  }
}

