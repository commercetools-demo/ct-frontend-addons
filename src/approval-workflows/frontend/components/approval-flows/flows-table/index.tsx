import React from 'react';
import { ApprovalFlowsProps } from '..';
import { FlowComponents } from '../approval-flow-panel';
import FlowStatusTag from '../../flow-status-tag';

const FlowsTable = ({
  flows,
  totalItems = 0,
  page = 1,
  onPageChange,
  onRowsPerPageChange,
  translate,
  components,
  limit = 25,
}: Partial<ApprovalFlowsProps> & { components: FlowComponents }) => {

  const Table = components?.Table;

  return (
    <Table className="mt-8">
      <Table.Container className="table-fixed rounded-md">
        <Table.Head className="border-b text-12 font-bold">
          <Table.Cell>{translate?.('common.status')}</Table.Cell>
          <Table.Cell>{translate?.('common.id')}</Table.Cell>
          <Table.Cell>{translate?.('common.date')}</Table.Cell>
          <Table.Cell>{translate?.('common.order.number')}</Table.Cell>
          <Table.Cell isButtonsHead />
        </Table.Head>
        <Table.Body>
          {(flows ?? []).map(({ id, status, order, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <div className="flex items-center justify-between gap-2">
                  <FlowStatusTag status={status}  components={components} translate={translate}/>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span className="block max-w-full truncate">{id}</span>
              </Table.Cell>
              <Table.Cell>{new Date(createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{order.orderNumber}</Table.Cell>
              <Table.Cell isButtonsCell>
                <div className="flex justify-end">
                  <components.Link href={`/approval-flow/${id.replace(/\s+/g, '-')}`} underlineOnHover={false}>
                    <components.Button variant="secondary">{translate?.('common.view')}</components.Button>
                  </components.Link>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Container>

      <Table.Pagination
        page={page}
        limit={limit}
        totalItems={totalItems}
        onNext={() => onPageChange?.(page + 1)}
        onPrevious={() => onPageChange?.(page - 1)}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Table>
  );
};

export default FlowsTable;
