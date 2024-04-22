'use client';
import React, { useEffect, useState } from 'react';
import { useApprovals } from '../../hooks/useApprovals';
import ApprovalFlows from '.';
import useRefinements from '../../hooks/useRefinements';
import useStatusesOptions from '../../hooks/useStatusesOptions';

export interface FlowComponents {
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
  Tag: any
}

const ApprovalFlowsClientWrapper = ({
  businessUnitKey,
  storeKey,
  sdk,
  components,
  translate,
}: {
  businessUnitKey?: string;
  storeKey?: string;
  sdk: any;
  translate: (key: string) => string;
  components: FlowComponents;
}) => {
  const { getApprovalFlows } = useApprovals(sdk, businessUnitKey, storeKey);

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

  const [flows, setFlows] = useState<any>([]);

  const { flowStatusOptions } = useStatusesOptions(translate);
  const previousCursor = flows.previousCursor;
  const nextCursor = flows.nextCursor;
  const total = flows.total ?? 0;

  useEffect(() => {
    if (businessUnitKey) {
      (async () => {
        const results = await getApprovalFlows({
          limit,
          cursor,
          ...(states.length ? { states } : {}),
          ...(debouncedSearch ? { ids: [debouncedSearch.trim()] } : {}),
          createdFrom: ISODate.from,
          createdTo: ISODate.to,
        });
        setFlows(results);
      })();
    }
  }, [businessUnitKey, limit, cursor, states, debouncedSearch, ISODate.from, ISODate.to]);

  if (!businessUnitKey) {
    return null;
  }

  return (
    <ApprovalFlows
      translate={translate}
      components={components}
      flows={flows.items || []}
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
