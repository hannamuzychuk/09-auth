"use client";

import css from "./page.module.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';


export default function Edit() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const cancel = () => router.push('/profile');

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;
    if (!username) return;

    try {
      const updatedUser = await updateMe(username);
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={cancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}