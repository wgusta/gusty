import type { Metadata } from "next";
import PartyApp from "@/party/components/PartyApp";

export const metadata: Metadata = {
  title: "Schräge Hüete Party",
  description: "Mitbringsel iiträge für d Schräge Hüete Party.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartyPage() {
  return <PartyApp />;
}

