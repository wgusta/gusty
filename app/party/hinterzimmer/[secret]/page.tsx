import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PartyApp from "@/party/components/PartyApp";

export const metadata: Metadata = {
  title: "Schräge Hüete Party Hinterzimmer",
  description: "Admin-Bereich für d Schräge Hüete Party.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartyAdminPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  if (!process.env.PARTY_ADMIN_SECRET || secret !== process.env.PARTY_ADMIN_SECRET) {
    notFound();
  }

  return <PartyApp adminMode adminSecret={secret} />;
}
