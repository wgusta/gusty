import { NextResponse } from "next/server";
import { getServiceRoleClient, requirePartyAdmin } from "@/party/lib/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ submissionId: string }> },
) {
  try {
    const { submissionId } = await params;
    const body = (await request.json()) as { secret?: string };
    requirePartyAdmin(body.secret);

    const supabase = getServiceRoleClient();
    const result = await supabase
      .from("party_submissions")
      .delete()
      .eq("id", submissionId);

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Submission delete failed",
      },
      { status: 400 },
    );
  }
}

