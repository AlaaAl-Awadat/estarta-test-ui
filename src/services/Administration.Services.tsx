import { AxiosResponse } from 'axios';
import { EnvironmentConfigurations } from '../configurations';
import { HttpServices } from '../helpers';
import { AdminDataInterface } from '../interfaces';

export const GetAllAdminDataService = (): Promise<AxiosResponse<AdminDataInterface> | null> => {
  return HttpServices.get(
    `${EnvironmentConfigurations.DomainURL}/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`
  )
    .then((response: AxiosResponse<AdminDataInterface>) => response)
    .catch((error: null) => error);
};
