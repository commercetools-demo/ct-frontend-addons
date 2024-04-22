import React from 'react';
import { AdjustmentsHorizontalIcon as FiltersIcon } from '@heroicons/react/24/outline';
import { ApprovalFlowsProps } from '..';
import { FlowComponents } from '../approval-flow-panel';
import useDisclosure from '../../../hooks/useDisclosure';

const RefinementsDrawer = ({
  flows,
  sortOptions,
  filters,
  onSortBy,
  onSearch,
  onClearRefinements,
  statusOptions,
  onStatusRefine,
  onCreationDateRefine,
  translate,
  components,
}: Partial<ApprovalFlowsProps> & { components: FlowComponents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isDatePickerOpen, onClose: onCloseDatePicker, onToggle: onToggleDatePicker } = useDisclosure();

  const refinements = [
    {
      title: 'product.sortBy',
      Component: (
        <div className="flex flex-col gap-7">
          {(sortOptions ?? []).map(({ name, value }) => (
            <components.Radio
              key={value}
              label={name}
              checked={value === filters?.sort}
              onSelected={() => onSortBy?.(value)}
            />
          ))}
        </div>
      ),
    },
    {
      title: 'dashboard.quote.search',
      Component: (
        <components.SearchInput
          searchValue={filters?.search ?? ''}
          variant="sm"
          placeholder={`${translate?.('dashboard.search.for.flows')}...`}
          handleOnChange={(val: string) => onSearch?.(val)}
        />
      ),
    },
    {
      title: 'dashboard.order.status',
      Component: (
        <div className="flex flex-col gap-7">
          {(statusOptions ?? []).map(({ name, value }) => (
            <components.Checkbox
              key={value}
              label={name}
              checked={filters?.status?.includes(value)}
              onChecked={(checked: boolean) => onStatusRefine?.(checked ? value : '')}
            />
          ))}
        </div>
      ),
    },
    {
      title: 'dashboard.creation.date',
      Component: (
        <div>
          <div
            onClick={onToggleDatePicker}
            className="rounded-md border border-gray-300 px-3 py-2 text-14 text-gray-600"
          >
            {filters?.createdFrom || filters?.createdTo
              ? `${filters.createdFrom ? new Date(filters.createdFrom).toLocaleDateString() : ''} : ${
                  filters.createdTo ? new Date(filters.createdTo).toLocaleDateString() : ''
                }`
              : 'dd/mm/yy'}
          </div>
          {isDatePickerOpen && (
            <div>
              <components.DatePicker
                mode="range"
                selected={{
                  from: filters?.createdFrom ? new Date(filters?.createdFrom) : undefined,
                  to: filters?.createdTo ? new Date(filters?.createdTo) : undefined,
                }}
                onSelect={(range: { from?: Date; to?: Date }) => onCreationDateRefine?.({ from: range?.from, to: range?.to })}
              />
              <div className="mt-2 flex items-center justify-end gap-8 pr-8">
                <span className="text-14 font-medium uppercase text-primary" onClick={onCloseDatePicker}>
                  {translate?.('common.cancel')}
                </span>
                <span
                  className="text-14 font-medium uppercase text-primary"
                  onClick={() => {
                    onCloseDatePicker();
                  }}
                >
                  {translate?.('common.save')}
                </span>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="lg:hidden">
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-14 text-gray-600 transition hover:bg-gray-50 md:w-fit md:grow-0"
        onClick={onOpen}
      >
        <span>{translate?.('product.sortAndFilter')}</span>
        <FiltersIcon width={20} />
      </button>
      <components.Drawer
        isOpen={isOpen}
        onClose={onClose}
        direction="left"
        headline={translate?.('product.sortAndFilter')}
        className="h-[100vh] w-[90vw] max-w-[350px]"
        headerClassName="border-y border-neutral-400"
      >
        <div className="flex h-full flex-col">
          <div className="grow overflow-y-auto px-4 lg:px-5">
            {refinements.map(({ title, Component }, index) => (
              <div key={index} className="border-b border-neutral-400">
                <components.Accordion className="border-none">
                  <components.Accordion.Button className="py-5" defaultSpacing={false}>
                    <span className="text-14 font-bold">{translate?.(title)}</span>
                  </components.Accordion.Button>
                  <components.Accordion.Panel defaultSpacing={false} className="pb-6">
                    {Component}
                  </components.Accordion.Panel>
                </components.Accordion>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 border-t border-neutral-400 p-4 lg:p-5">
            <components.Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                onClearRefinements?.();
                onClose();
              }}
            >
              {translate?.('product.clear.all')}
            </components.Button>
            <components.Button variant="primary" className="flex-1" onClick={onClose}>
              {translate?.('common.view')} ({flows?.length})
            </components.Button>
          </div>
        </div>
      </components.Drawer>
    </div>
  );
};

export default RefinementsDrawer;
