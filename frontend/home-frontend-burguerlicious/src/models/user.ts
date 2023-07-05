type Profile = {
  profile_firstName: string;
  profile_lastName: string;
  profile_phone: number;
  profile_address?: string;
  profile_birthday?: Date;
};

export type User = {
  user_id: string;
  user_email: string;
  permission_id: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
};
