import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface OidcDiscoveryResponse {
  issuer: string;
  token_endpoint: string;
  authorization_endpoint: string;
  userinfo_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  jwks_uri: string;
  response_types_supported: string[];
  grant_types_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  response_modes_supported: string[];
  id_token_signing_alg_values_supported: string[];
  revocation_endpoint: string;
  subject_types_supported: string[];
  end_session_endpoint: string;
  introspection_endpoint: string;
}

const discoveryEndpoint = '.well-known/openid-configuration';

@Injectable()
export class OidcDiscoveryService {
  data: OidcDiscoveryResponse;

  private constructor(data: OidcDiscoveryResponse) {
    this.data = data;
  }

  static async initialize(
    configService: ConfigService,
  ): Promise<OidcDiscoveryService> {
    const logger = new Logger(OidcDiscoveryService.name);
    const oidcIssuer = configService.get('OIDC_ISSUER');

    try {
      const { data, status } = await axios.get<OidcDiscoveryResponse>(
        `${oidcIssuer}/${discoveryEndpoint}`,
        {
          headers: {
            Accept: 'application/json',
          },
          transformResponse: [].concat((test: string) => {
            return test.replace(/10.0.2.2/gi, 'localhost'); //work around for the local mock server when it is configured to be used from an Android emulator, this shouldn't affect real metadata.
          }, axios.defaults.transformResponse),
        },
      );
      if (status === 200) {
        return new OidcDiscoveryService(data);
      } else {
        throw new Error(`Invalid response status: ${status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.log('Axios Error: ', error.message);
        throw error;
      } else {
        logger.log('Unexpected Error: ', error);
        throw error;
      }
    }
  }

  getJwksUri(): string {
    if (this.data) {
      return this.data.jwks_uri;
    } else {
      throw new Error(
        'OidcDiscoveryService not initialized, use the static initialize() function',
      );
    }
  }
}
