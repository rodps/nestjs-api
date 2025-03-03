import { UserRole } from '../enums/roles.enum';

export type JwtPayload = {
  sub: number;
  username: string;
  role: UserRole;
};
