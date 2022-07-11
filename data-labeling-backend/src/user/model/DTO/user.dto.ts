export class UserCreateDTO {
  firstname: string;

  lastname: string;

  username: string;

  password: string;
}

export class UserInfo {
  isAdmin: boolean;
  email: string;
  displayName: string;
}
