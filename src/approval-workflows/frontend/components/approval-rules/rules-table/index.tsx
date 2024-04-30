import React from 'react';
import { ApprovalRuleProps } from '..';
import { RuleComponents } from '../approval-rules-panel';
import RuleStatusTag from '../../rule-status-tag';

const RulesTable = ({
  rules,
  totalItems = 0,
  page = 1,
  onPageChange,
  onRowsPerPageChange,
  translate,
  components,
  limit = 25,
}: Partial<ApprovalRuleProps> & { components: RuleComponents }) => {
  const Table = components?.Table;

  return (
    <Table className="mt-8">
      <Table.Container className="table-fixed rounded-md">
        <Table.Head className="border-b text-12 font-bold">
          <Table.Cell>{translate?.('common.status')}</Table.Cell>
          <Table.Cell>{translate?.('common.name')}</Table.Cell>
          <Table.Cell>{translate?.('common.description')}</Table.Cell>
          <Table.Cell>{translate?.('common.id')}</Table.Cell>
          <Table.Cell>{translate?.('dashboard.rules.createdAt')}</Table.Cell>
          <Table.Cell>{translate?.('dashboard.rules.predicate')}</Table.Cell>
          <Table.Cell isButtonsHead />
        </Table.Head>
        <Table.Body>
          {(rules ?? []).map(({ name, description, id, status, createdAt, predicate }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <div className="flex items-center justify-between gap-2">
                  <span className="block max-w-full truncate">
                    <RuleStatusTag status={status} translate={translate} components={components} />
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span className="block max-w-full">{name}</span>
              </Table.Cell>
              <Table.Cell>
                <span className="block max-w-full truncate">{description}</span>
              </Table.Cell>
              <Table.Cell>
                <span className="block max-w-full truncate">{id}</span>
              </Table.Cell>
              <Table.Cell>{new Date(createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{predicate}</Table.Cell>
              <Table.Cell isButtonsCell>
                <div className="flex justify-end">
                  <components.Link href={`/approval-rule/${id.replace(/\s+/g, '-')}`} underlineOnHover={false}>
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

export default RulesTable;
