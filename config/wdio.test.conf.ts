import {config as baseConfig} from '../wdio.conf';
export const config = Object.assign(baseConfig,{
    environment: 'test',
    reqresBaseUrl: 'https://reqres.in',
    commerceBaseUrl: 'https://admin-demo.nopcommerce.com/login',
    commerceCustomerUrl: 'https://admin-demo.nopcommerce.com'
})