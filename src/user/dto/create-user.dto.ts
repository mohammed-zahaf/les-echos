export class CreateUserDto {
  readonly pseudonym: string;
  readonly password: string;
  readonly name?: string;
  readonly address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  readonly comment?: string;
  readonly userType: 'admin' | 'user';
}