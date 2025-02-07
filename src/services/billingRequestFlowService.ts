'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BillingRequestFlowResponse
  extends Types.BillingRequestFlow,
    Types.APIResponse {}

interface BillingRequestFlowListResponse extends Types.APIResponse {
  billing_request_flows: Types.BillingRequestFlow[];
  meta: Types.ListMeta;
}

interface BillingRequestFlowCreateRequest {
  // Fulfil the Billing Request on completion of the flow (true by default)

  auto_fulfil?: boolean;

  // Resources linked to this BillingRequestFlow.
  links: Types.BillingRequestFlowCreateRequestLinks;

  // If true, the payer will not be able to change their bank account within the
  // flow

  lock_bank_account?: boolean;

  // If true, the payer will not be able to edit their customer details within the
  // flow

  lock_customer_details?: boolean;

  // URL that the payer can be redirected to after completing the request flow.

  redirect_uri?: string;
}

export class BillingRequestFlowService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: BillingRequestFlowCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<BillingRequestFlowResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_request_flows',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'billing_request_flows',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestFlowResponse = {
      ...(response.body?.['billing_request_flows'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async initialise(identity: string): Promise<BillingRequestFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/billing_request_flows/:identity/actions/initialise',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestFlowResponse = {
      ...response.body['billing_request_flows'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
