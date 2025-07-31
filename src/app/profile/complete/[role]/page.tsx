import CandidateProfileClient from "@/app/profile/complete/[role]/CandidateProfileForm";
import { TCandidateRole } from "@/types/profile";

export async function generateStaticParams() {
  return [
    { role: "professional-player" },
    { role: "amateur-player" },
    { role: "high-school-player" },
    { role: "college-player" },
    { role: "field-staff" },
    { role: "office-staff" },
  ];
}

export default function CandidateProfilePage({
  params,
}: {
  params: { role: string };
}) {
  const role = params.role as TCandidateRole;
  return <CandidateProfileClient role={role} />;
}
