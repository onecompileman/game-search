import { environment } from 'src/environments/environment';

export function RestangularConfigFactory(RestangularProvider: any) {
  RestangularProvider.setBaseUrl(environment.api.endpoint);
  RestangularProvider.setDefaultRequestParams({ key: environment.api.key });
}
