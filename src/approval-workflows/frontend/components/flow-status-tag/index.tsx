import React from 'react';
import { FlowComponents } from '../approval-flows/approval-flow-panel';
interface Props {
  status: string;
  translate?: (key: string) => string;
  components: Partial<FlowComponents>
}
const FlowStatusTag = ({ status, translate, components }: Props) => {

  const statusVariant = {
    Pending: 'warning',
    Approved: 'primary',
    Rejected: 'danger',
  } as Record<string, string>;

  return (
    <components.Tag className="capitalize" variant={statusVariant[status]}>
      {translate?.(`dashboard.flows.status.${status.toLowerCase()}`)}
    </components.Tag>
  );
};

export default FlowStatusTag;
