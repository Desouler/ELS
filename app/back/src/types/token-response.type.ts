export interface ITokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  fhirId?: string;
  userId?: number;
  email?: string;
  roles?: string[];
  fullname?: string;
  profileId?: number;
}
