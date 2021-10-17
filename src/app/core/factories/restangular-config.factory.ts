import { environment } from 'src/environments/environment';

export function RestangularConfigFactory(RestangularProvider: any) {
  RestangularProvider.setBaseUrl(environment.api.endpoint);
  RestangularProvider.setPlainByDefault(true);
  RestangularProvider.setDefaultRequestParams({ key: environment.api.key });
}
