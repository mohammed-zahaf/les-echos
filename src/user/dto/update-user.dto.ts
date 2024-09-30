export class UpdateUserDto {
  readonly password?: string;
  readonly name?: string;
  readonly address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  readonly comment?: string;
  readonly userType?: 'admin' | 'user';
}
