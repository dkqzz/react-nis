import React from "react";
import type { User } from "../types";

type Props = {
  profile: User | null;
};

export function ProfileCard({ profile }: Props) {
  if (!profile) return null;

  return (
    <section
      aria-label="Данные профиля"
      style={{
        border: "1px solid #d8d8d8",
        borderRadius: "8px",
        padding: "16px",
        display: "grid",
        gap: "8px"
      }}
    >
      <div>
        <strong>Никнейм:</strong> {profile.nickname || "—"}
      </div>
      <div>
        <strong>Телефон:</strong> {profile.phone || "—"}
      </div>
      <div>
        <strong>Описание:</strong> {profile.bio || "—"}
      </div>
    </section>
  );
}

export default ProfileCard;
