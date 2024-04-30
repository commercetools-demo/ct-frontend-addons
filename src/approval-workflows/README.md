# Approval workflows
// TODO: write readme :)

```json
// common.json
 "approval.flows": "Approval flows",
  "order.number": "Order number"
```

```json
// dashbaord.json
"flow.details.view.only.desc": "To manage flow details, please request your company administrator to grant you the necessary permissions",
  "flow.details": "Flow Details",
  "flow.details.reject": "Reject",
  "flow.details.approve": "Approve",
  "flow.details.id": "Flow ID",
  "flow.details.date": " Creation Date",
  "flow.details.business_unit": "Business Unit",
  "flow.details.status.title": "Status",
  "flow.details.account.already.approved": "You have already approved",
  "flow.details.status": "Status",
  "flow.details.rejection.date": "Rejection Date",
  "flow.details.rejection.reason": "Rejection Reason",
  "flow.details.approval.date": "Approval Date",
  "flow.details.approval.by.role": "Approved By",
  "flow.details.rule.title": "Rule",
  "flow.details.rule.description": "Description",
  "flow.details.rule.predicate": "Predicate",
  "flows.status.pending": "Pending",
  "flows.status.approved": "Approved",
  "flows.status.rejected": "Rejected",
  "flow.details.order.details": "Order Details",
  "search.for.flows": "Search for flows"
```

```ts
/// packages/<project>/frontend/src/lib/tastics/index.tsx
  'commercetools/ui/approvals/flow-details': ApprovalFlowTastic,

```

```ts
import { ApprovalWorkflows } from 'ct-frontend-addons';
...

const ApprovalFlowTastic = ({ data }: TasticProps<DataSource<DataSourceProps>>) => {
  const { account } = useAccount();
  const { translate } = useTranslation();
  const { activeBusinessUnit } = useBusinessUnit();
  const { selectedStore } = useStore({ activeBusinessUnit });
  const { permissions } = useAccountRoles(activeBusinessUnit?.key);

  return (
    <Dashboard href={DashboardLinks.companyAdmin} userName={account?.firstName}>
      <ApprovalWorkflows.COMPONENTS.ApprovalFlowsDetails
        accountId={account?.accountId}
        sdk={sdk}
        components={{
          Button: Button,
          InfoBanner: InfoBanner,
          PreviousPageLink: PreviousPageLink,
          Tag: Tag,
          Input: Input,
        }}
        calculateTransaction={calculateTransaction}
        flow={data.data?.dataSource?.flow}
        translate={translate}
        activeBusinessUnit={activeBusinessUnit}
        storeKey={selectedStore.key}
        permissions={permissions}
      />
    </Dashboard>
  );
};
```

```ts
/// packages/<project>/frontend/src/components/pages/dashboard/pages/company-admin/index.tsx

import { ApprovalWorkflows } from 'ct-frontend-addons';

return (
    ...
    <Tabs.TabList>
        <Tabs.Tab>{translate('common.general')}</Tabs.Tab>
        <Tabs.Tab>{translate('common.addresses')}</Tabs.Tab>
        <Tabs.Tab>{translate('common.associates')}</Tabs.Tab>
        <Tabs.Tab>{translate('common.business.units')}</Tabs.Tab>
        <Tabs.Tab>{translate('common.approval.flows')}</Tabs.Tab> // add this line
    </Tabs.TabList>
    <Tabs.Panels>
        ...
        <ApprovalWorkflows.COMPONENTS.ApprovalFlowsPanel
            businessUnitKey={activeBusinessUnit.key}
            storeKey={selectedStore.key}
            sdk={sdk}
            translate={translate}
            components={{
                SearchInput,
                Dropdown,
                DatePicker,
                RefinementDropdown,
                Drawer,
                Button,
                Accordion,
                Radio,
                Checkbox,
                Table,
                Link,
                Tag,
            }}
        />
    </Tabs.Panels>


)


```
