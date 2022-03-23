import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  public,
  admin,
  vendor,
  api,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/api/authentication`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  } else if (service === APIService.api) {
    return `${APIHost}/api`;
  } else if (service === APIService.admin) {
    return `${APIHost}/apiAdmin`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.vendor)}/profile/detail`,
  brandList: `${getBaseUrl(APIService.admin)}/brands/list`,
  vendorList: `${getBaseUrl(APIService.admin)}/vendors/list`,
  commonRole: `${getBaseUrl(APIService.admin)}/commons/role`,
  commonCountry: `${getBaseUrl(APIService.admin)}/commons/country`,
  userList: `${getBaseUrl(APIService.admin)}/users/list`,
  userDelete: `${getBaseUrl(APIService.admin)}/users/edit`,
  userCreate: `${getBaseUrl(APIService.admin)}/users/create`,
  userEdit: `${getBaseUrl(APIService.admin)}/users/edit`,
  productDetail: `${getBaseUrl(APIService.admin)}/products/detail`,
  productCreate: `${getBaseUrl(APIService.admin)}/products/create`,
  productEdit: `${getBaseUrl(APIService.admin)}/products/edit`,
  conditionList: `${getBaseUrl(APIService.admin)}/conditions/list`,
  shippingList: `${getBaseUrl(APIService.admin)}/shipping/list`,
  productList: `${getBaseUrl(APIService.api)}/products/list`,
  categoryList: `${getBaseUrl(APIService.api)}/categories/list`,
};
