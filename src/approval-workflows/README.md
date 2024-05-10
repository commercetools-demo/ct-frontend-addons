# Approval workflows

Adds Approval workflow capabilities to frontend.

# Requirements

- API client should have `view_approval_rules`, `manage_approval_rules`, `manage_approval_flows` and `view_approval_flows` permissions on top of [B2C API client](https://docs.commercetools.com/frontend-development/using-the-commercetools-extension#b2c-api-client) to view flows and rules
- Role(s) created in MC to "Manage rules" and "Manage flows"
  - To "Manage rules" the associate should have "UpdateApprovalRules" permission
  - To "Manage flows" e.g approve or reject a flow, the associate should have "UpdateApprovalFlows" permission

## Usage

### Backend changes

```ts
import { BaseApi } from ...
import { CartMapper } from ...

export default injectExtensionsRegistry(
{
  // previous exported default
}, {
    modules: {
      'approval-workflows': {
        dependencies: {
          BaseApi,
          CartMapper,
        },
        props: {},
      },
    },
  },

```

### Studio changes

#### Datasources

Create/upload the following datasources in Studio

1. [Approval flow datasource](./docs/frontastic_approval-flow.json)
1. [Approval rule datasource](./docs/frontastic_approval-rule.json)

#### Dynamic pages

Create/upload the following dynamic pages in Studio

1. [Approval flow page](./docs/frontastic_approval-flow-page.json)
1. [Approval rule page](./docs/frontastic_approval-rule-page.json)

#### Components (Tastics)

Create/upload the following components in Studio

1. [Approval flow details](./docs/commercetools_ui_approvals_flow-details.json)
1. [Approval rule details](./docs/commercetools_ui_approvals_rule-details.json)

#### Create a static page in Studio

Create the following static page in Studio

1. "Create approval rule" page
   Relative path: `create-approval-rule`
   Parent: None
   Page name: "Create approval rule"

Create a page version and put a "Rule Detail" component in it. The component doesn't have any data source.

#### Create dynamic page versions in Studio

Create the following dynamic pages in Studio

1. "Approval flow page"
   Create a page version and put a "Flow Detail" component in it. The component's data source should be the page's data source.

1. "Approval rule page"
   Create a page version and put a "Rule Detail" component in it. The component's data source should be the page's data source.

### Frontend changes

#### Locale changes

1. [dashboard](./docs/dashboard.json)
1. [common](./docs/common.json)

#### Code changes

1. Create tastics

- Approval flow tastic

  ```tsx
    /// packages/<project>/frontend/src/lib/tastics/approval-flow-details/index.tsx

    'use client';
    // import atom components
    ...
    import { ApprovalFlow, COMPONENTS } from 'ct-frontend-addons/dist/approval-workflows';
    import useTranslation from '@/providers/I18n/hooks/useTranslation';
    import { sdk } from '@/sdk';
    import { DataSource } from '@/types/lib/datasources';
    import useAccount from '../../hooks/useAccount';
    import useAccountRoles from '../../hooks/useAccountRoles';
    import { calculateTransaction } from '../../utils/calculate-transaction';
    import useBusinessUnit from '../company-admin/hooks/useBusinessUnit';
    import useStore from '../company-admin/hooks/useStore';
    import { TasticProps } from '../types';

    type DataSourceProps = {
      flow: ApprovalFlow;
    };

    const ApprovalFlowTastic = ({ data }: TasticProps<DataSource<DataSourceProps>>) => {
      const { account } = useAccount();
      const { translate } = useTranslation();
      const { activeBusinessUnit } = useBusinessUnit();
      const { selectedStore } = useStore({ activeBusinessUnit });
      const { permissions } = useAccountRoles(activeBusinessUnit?.key);

      return (
        <Dashboard href={DashboardLinks.companyAdmin} userName={account?.firstName}>
          <COMPONENTS.ApprovalFlowsDetails
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

    export default ApprovalFlowTastic;

  ```

- Approval rule tastic

    ```tsx
      /// packages/<project>/frontend/src/lib/tastics/approval-rule-details/index.tsx
      'use client';
      /// import atom components
      ...
      import { ApprovalRule, COMPONENTS } from 'ct-frontend-addons/dist/approval-workflows';
      import { DashboardLinks } from '@/components/pages/dashboard/constants';
      import useTranslation from '@/providers/I18n/hooks/useTranslation';
      import { sdk } from '@/sdk';
      import { DataSource } from '@/types/lib/datasources';
      import useAccount from '../../hooks/useAccount';
      import useAccountRoles from '../../hooks/useAccountRoles';
      import useBusinessUnit from '../company-admin/hooks/useBusinessUnit';
      import useRole from '../company-admin/hooks/useRole';
      import useStore from '../company-admin/hooks/useStore';
      import { TasticProps } from '../types';

      type DataSourceProps = {
        rule?: ApprovalRule;
      };

      const ApprovalFlowTastic = ({ data }: TasticProps<DataSource<DataSourceProps>>) => {
        const { account } = useAccount();
        const { translate } = useTranslation();
        const { activeBusinessUnit } = useBusinessUnit();
        const { selectedStore } = useStore({ activeBusinessUnit });
        const { permissions } = useAccountRoles(activeBusinessUnit?.key);
        const { roleOptions } = useRole();

        return (
          <Dashboard href={DashboardLinks.companyAdmin} userName={account?.firstName}>
            <COMPONENTS.ApprovalRulesDetails
              isEditing={!!data.data?.dataSource?.rule}
              sdk={sdk}
              components={{
                Button: Button,
                Select: Select,
                InfoBanner: InfoBanner,
                PreviousPageLink: PreviousPageLink,
                Tag: Tag,
                Input: Input,
                Label: Label,
                RefinementDropdown: RefinementDropdown,
                Checkbox: Checkbox,
              }}
              roleOptions={roleOptions}
              rule={data.data?.dataSource?.rule}
              translate={translate}
              activeBusinessUnit={activeBusinessUnit}
              storeKey={selectedStore.key}
              permissions={permissions}
            />
          </Dashboard>
        );
      };

      export default ApprovalFlowTastic;
    ```

2. Register tastics

    ```ts
    /// packages/<project>/frontend/src/lib/tastics/index.ts

      import ApprovalFlowTastic from './approval-flow-details';
      import ApprovalRuleTastic from './approval-rule-details';

      const tastics = {
        ...
      'commercetools/ui/approvals/flow-details': ApprovalFlowTastic,
      'commercetools/ui/approvals/rule-details': ApprovalRuleTastic,
      }

    ```

3. Add Admin panels to Company admin

    ```ts
    /// packages/<project>/frontend/src/components/pages/dashboard/pages/company-admin/index.tsx

    import { COMPONENTS } from 'ct-frontend-addons/dist/approval-workflows';
    /// import atom components
    ...
    import useBusinessUnit from '@/lib/tastics/company-admin/hooks/useBusinessUnit';
    import useStore from '@/lib/tastics/company-admin/hooks/useStore';
    import { sdk } from '@/sdk';

    const CompanyAdminPage = ({

      return (
          ...
          <Tabs.TabList>
              <Tabs.Tab>{translate('common.general')}</Tabs.Tab>
              <Tabs.Tab>{translate('common.addresses')}</Tabs.Tab>
              <Tabs.Tab>{translate('common.associates')}</Tabs.Tab>
              <Tabs.Tab>{translate('common.business.units')}</Tabs.Tab>
              <Tabs.Tab>{translate('common.approval.flows')}</Tabs.Tab>
              <Tabs.Tab>{translate('common.approval.rules')}</Tabs.Tab>
            </Tabs.TabList>
          <Tabs.Panels>
              ...
              <Tabs.Panel>
                  <COMPONENTS.ApprovalFlowsPanel
                    businessUnitKey={activeBusinessUnit?.key}
                    storeKey={selectedStore?.key}
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
                </Tabs.Panel>
                <Tabs.Panel>
                  <ApprovalWorkflows.COMPONENTS.ApprovalRulesPanel
                    businessUnitKey={activeBusinessUnit?.key}
                    storeKey={selectedStore?.key}
                    sdk={sdk}
                    translate={translate}
                    permissions={permissions}
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
                </Tabs.Panel>
          </Tabs.Panels>
      )
    });
    ```
