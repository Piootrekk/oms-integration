type WorthQueryParam = {
  minWorth?: string;
  maxWorth?: string;
  currency?: string;
};

type IdParamDict = {
  orderId?: string;
};

export type { WorthQueryParam, IdParamDict };
