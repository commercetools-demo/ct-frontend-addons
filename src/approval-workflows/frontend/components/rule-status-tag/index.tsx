import React from 'react';
import { RuleComponents } from '../approval-rules/approval-rules-panel';
interface Props {
  status: string;
  translate?: (key: string) => string;
  components: Partial<RuleComponents>
}
const RuleStatusTag = ({ status, translate, components }: Props) => {

  const statusVariant = {
    Inactive: 'warning',
    Active: 'primary',
  } as Record<string, string>;

  return (
    <components.Tag className="capitalize" variant={statusVariant[status]}>
      {translate?.(`dashboard.rules.status.${status.toLowerCase()}`)}
    </components.Tag>
  );
};

export default RuleStatusTag;
