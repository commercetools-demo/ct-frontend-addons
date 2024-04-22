import React, { PropsWithChildren } from 'react';
import { ApprovalRuleProps } from '..';
import { RuleComponents } from '../approval-rules-panel';

const Refinements = ({
  filters,
  onSearch,
  statusOptions,
  onStatusRefine,
  onCreationDateRefine,
  translate,
  components,
  children,
}: Partial<ApprovalRuleProps> & PropsWithChildren<{ components: RuleComponents }>) => {
  const refinements = [
    {
      title: 'dashboard.rules.search.label',
      Component: (
        <components.SearchInput
          className="h-[38px] w-[360px]"
          searchValue={filters?.search ?? ''}
          variant="xs"
          placeholder={`${translate?.('dashboard.search.for.rules')}...`}
          handleOnChange={(val: string) => onSearch?.(val)}
        />
      ),
    },
    {
      title: 'common.status',
      Component: (
        <components.RefinementDropdown
          size="lg"
          className="w-[200px]"
          options={(statusOptions ?? []).map(({ name, value, count }) => ({
            name,
            value,
            count,
            selected: !!filters?.status?.includes(value),
            onSelected: () => onStatusRefine?.(value),
          }))}
        >
          {translate?.('common.select')}
        </components.RefinementDropdown>
      ),
    },
    {
      title: 'dashboard.creation.date',
      Component: (
        <components.Dropdown size="lg" className="w-[200px]">
          <components.Dropdown.Button>{translate?.('common.select')}</components.Dropdown.Button>
          <components.Dropdown.Options className="max-h-[unset] w-max">
            <components.DatePicker
              mode="range"
              selected={{
                from: filters?.createdFrom ? new Date(filters?.createdFrom) : undefined,
                to: filters?.createdTo ? new Date(filters?.createdTo) : undefined,
              }}
              onSelect={(range: { from?: Date; to?: Date }) =>
                onCreationDateRefine?.({ from: range?.from, to: range?.to })
              }
            />
          </components.Dropdown.Options>
        </components.Dropdown>
      ),
    },
  ];

  return (
    <div className="hidden items-end justify-between lg:flex">
      <div className="hidden gap-3 lg:flex">
        {refinements.map(({ title, Component }, index) => (
          <div key={index}>
            <h5 className="text-14 text-gray-700">{translate?.(title)}</h5>
            <div className="mt-2">{Component}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default Refinements;
