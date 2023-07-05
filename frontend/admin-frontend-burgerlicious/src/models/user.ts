import { Employee } from "./employee";
import { Permission } from "./permission";
import { Reservation } from "./reservation";

export type User = {
  user_id: string;
  user_email: string;
  permission_id: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile;
  employee?: Employee;
  permission?: Permission;
  reservation: Reservation[];
};

type Profile = {
  profile_firstName: string;
  profile_lastName: string;
  profile_phone: number;
  profile_address?: string;
  profile_birthday?: Date;
};
