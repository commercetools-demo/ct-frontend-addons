import React, { useEffect, useState } from 'react';
import ApprovalRules from '.';
import { useApprovals } from '../../hooks/useApprovals';
import useRefinements from '../../hooks/useRefinements';
export type RuleComponents = {
  SearchInput: any;
  Dropdown: any;
  DatePicker: any;
  RefinementDropdown: any;
  Drawer: any;
  Button: any;
  Accordion: any;
  Radio: any;
  Checkbox: any;
  Table: any;
  Link: any;
  Tag: any;
};

const ApprovalFlowsClientWrapper = ({
  businessUnitKey,
  storeKey,
  sdk,
  components,
  permissions,
  translate,
}: {
  businessUnitKey?: string;
  storeKey?: string;
  sdk: any;
  translate: (key: string) => string;
  permissions?: Record<string, boolean>;
  components: RuleComponents;
}) => {
  const { getApprovalRules } = useApprovals(sdk, businessUnitKey, storeKey);

  const {
    page,
    limit,
    setLimit,
    cursor,
    setCursor,
    clearRefinements,
    states,
    addState,
    removeState,
    search,
    debouncedSearch,
    setSearch,
    date,
    ISODate,
    onCreationDateRefine,
  } = useRefinements();

  const [rules, setRules] = useState<any>([]);

  const flowStatusOptions = [
    { name: translate('dashboard.rules.status.active'), value: 'Active' },
    { name: translate('dashboard.rules.status.inactive'), value: 'Inactive' },
  ];
  const previousCursor = rules.previousCursor;
  const nextCursor = rules.nextCursor;
  const total = rules.total ?? 0;

  useEffect(() => {
    if (businessUnitKey) {
      (async () => {
        const results = await getApprovalRules({
          limit,
          cursor,
          ...(states.length ? { states } : {}),
          ...(debouncedSearch ? { predicate: debouncedSearch.trim() } : {}),
          createdFrom: ISODate.from,
          createdTo: ISODate.to,
        });
        setRules(results);
      })();
    }
  }, [businessUnitKey, limit, cursor, states, debouncedSearch, ISODate.from, ISODate.to]);

  if (!businessUnitKey) {
    return null;
  }

  return (
    <ApprovalRules
      translate={translate}
      components={components}
      permissions={permissions}
      rules={rules.items || []}
      filters={{ search, status: states, createdFrom: date.from?.toString(), createdTo: date.to?.toString() }}
      sortOptions={[]}
      statusOptions={flowStatusOptions}
      onSearch={(val) => setSearch(val)}
      onStatusRefine={(status) => {
        const isRefined = states.includes(status);

        if (!isRefined) addState(status);
        else removeState(status);
      }}
      onClearRefinements={clearRefinements}
      onCreationDateRefine={onCreationDateRefine}
      page={page}
      totalItems={total}
      limit={limit}
      onPageChange={(newPage) => {
        const isNext = newPage > page;

        if (isNext && nextCursor) setCursor(nextCursor);
        else if (!isNext && previousCursor) setCursor(previousCursor);
      }}
      onRowsPerPageChange={(newLimit) => setLimit(+newLimit)}
    />
  );
};

export default ApprovalFlowsClientWrapper;
