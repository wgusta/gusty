import { NextResponse } from "next/server";
import { getServiceRoleClient, requirePartyAdmin } from "@/party/lib/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> },
) {
  try {
    const { itemId } = await params;
    const body = (await request.json()) as { secret?: string };
    requirePartyAdmin(body.secret);

    const supabase = getServiceRoleClient();
    const result = await supabase.from("party_items").delete().eq("id", itemId);

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Catalog delete failed",
      },
      { status: 400 },
    );
  }
}

