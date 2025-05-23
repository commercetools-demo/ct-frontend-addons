import { LocalizedString } from '../query';

export interface RecurringPolicy {
  id: string;
  key?: string;
  name?: string;
  description?: string;
  schedule?: {
    intervalUnit?: string;
    type?: string;
    value?: number;
  };
}

export interface CommercetoolsLineItemRecurringPolicy {
  id: string;
  typeId: 'recurring-policy';
  obj?: {
    name?: LocalizedString;
    schedule?: {
      intervalUnit?: string;
      type?: string;
      value?: number;
    };
  };
}

export interface CommercetoolsRecurrenceInfo {
  recurrencePolicy?: CommercetoolsLineItemRecurringPolicy;
}
