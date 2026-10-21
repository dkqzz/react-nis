import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/userApi";
import ProfileCard from "../components/ProfileCard";
import { handleError } from "../helpers/handleError";
import type { User } from "../types";

type Props = {
  token: string;
};

export function ProfilePage({ token }: Props) {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const loadedProfile = await getProfile(token);
        if (cancelled) return;

        setProfile(loadedProfile);
        setNickname(loadedProfile.nickname);
        setBio(loadedProfile.bio);
      } catch (requestError) {
        if (!cancelled) {
          setError(handleError(requestError));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const updatedProfile = await updateProfile(token, {
        nickname: nickname.trim(),
        bio: bio.trim()
      });

      setProfile(updatedProfile);
      setNickname(updatedProfile.nickname);
      setBio(updatedProfile.bio);
    } catch (requestError) {
      setError(handleError(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      {loading && <p>Загрузка...</p>}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <ProfileCard profile={profile} />
      {profile ? (
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="nickname">Никнейм</label>
          <input
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Никнейм"
            disabled={loading}
          />
          <label htmlFor="bio">Описание</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Описание"
            disabled={loading}
          />
          <button type="button" onClick={handleSave} disabled={loading}>
            {loading ? "Сохраняем..." : "Сохранить"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ProfilePage;
