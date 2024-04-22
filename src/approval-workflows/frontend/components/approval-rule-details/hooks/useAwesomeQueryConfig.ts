import { useMemo } from 'react';
import type { Config } from '@react-awesome-query-builder/ui';
import { BasicConfig } from '@react-awesome-query-builder/ui';
const InitialConfig = BasicConfig;

export const useAwesomeQueryConfig = (fields: any) => {
  const config = useMemo<Config>(
    () => ({
      ...InitialConfig,
      settings: {
        ...InitialConfig.settings,
        showNot: false,
        showErrorMessage: true,
        forceShowConj: true,
        canReorder: false,
        deleteLabel: 'Remove rule',
        delGroupLabel: 'Remove group',
      },
      types: {
        ...InitialConfig.types,
        text: {
          ...InitialConfig.types.text,
          valueSources: ['value'],
        },
        select: {
          ...InitialConfig.types.select,
          valueSources: ['value'],
        },
        number: {
          ...InitialConfig.types.number,
          valueSources: ['value'],
        },

        boolean: {
          ...InitialConfig.types.boolean,
          valueSources: ['value'],
        },
        datetime: {
          ...InitialConfig.types.datetime,
          valueSources: ['value'],
        },
      },
      fields,
      widgets: {
        ...InitialConfig.widgets,
        text: {
          ...InitialConfig.widgets.text,
        },
        datetime: {
          ...InitialConfig.widgets.datetime,
          spelFormatValue: (val) => `"${new Date(val).toISOString()}"`,
        },
      },
      operators: {
        ...InitialConfig.operators,
        equal: {
          ...InitialConfig.operators.equal,
          labelForFormat: '=',
          spelFormatOp: (f, o, v) => `${f} = ${v}`,
        },
        select_equals: {
          ...InitialConfig.operators.select_equals,
          labelForFormat: '=',
          spelFormatOp: (f, o, v) => `${f} = ${v}`,
        },
        not_between: {
          ...InitialConfig.operators.not_between,
          spelFormatOp: (f, o, v) => `${f} < "${v[0]}" and ${f} > "${v[1]}"`,
        },
        select_any_in: {
          ...InitialConfig.operators.select_any_in,
          spelFormatOp: (field, op, values) => {
            const parsed = (values as string).match(/\{(.*)\}\.\?\[true\]/);
            if (parsed?.[1]) {
              const val = parsed[1].replaceAll("'", '').split(',');
              return `${field} contains any (${val.map((item) => `"${item}"`).join(', ')})`;
            }
            return '';
          },
        },
        select_not_any_in: {
          ...InitialConfig.operators.select_not_any_in,
          spelFormatOp: (field, op, values) => {
            const parsed = (values as string).match(/\{(.*)\}\.\?\[true\]/);
            if (parsed?.[1]) {
              const val = parsed[1].replaceAll("'", '').split(',');
              return `not ${field} contains any (${val.map((item) => `"${item}"`).join(', ')})`;
            }
            return '';
          },
        },
      },
      conjunctions: {
        AND: {
          ...InitialConfig.conjunctions.AND,
          spelFormatConj: (children, conj, not, omitBrackets) => {
            if (not) omitBrackets = false;
            return children.size > 1
              ? (not ? '!' : '') +
                  (omitBrackets ? '' : '(') +
                  children.join(' ' + 'and' + ' ') +
                  (omitBrackets ? '' : ')')
              : (not ? '!(' : '') + children.first() + (not ? ')' : '');
          },
        },
        OR: {
          ...InitialConfig.conjunctions.OR,
          spelFormatConj: (children, conj, not, omitBrackets) => {
            if (not) omitBrackets = false;
            return children.size > 1
              ? (not ? '!' : '') +
                  (omitBrackets ? '' : '(') +
                  children.join(' ' + 'or' + ' ') +
                  (omitBrackets ? '' : ')')
              : (not ? '!(' : '') + children.first() + (not ? ')' : '');
          },
        },
      },
    }),
    [],
  );

  return {
    config,
  };
};
