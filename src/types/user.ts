export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
}

export type ProfileFormValues = Omit<UserProfile, "id">;
