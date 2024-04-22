'use client';
import React, { useCallback, useEffect, useState } from 'react';
import type { Config, ImmutableTree, BuilderProps } from '@react-awesome-query-builder/ui';
import { Utils as QbUtils, Query, Builder } from '@react-awesome-query-builder/ui';
import { PredicateBuilderStyles } from './predicate-builder-styles';
import { useAwesomeQueryConfig } from './hooks/useAwesomeQueryConfig';
import { RuleComponents } from '.';

type Props = {
  onError: () => void;
  onPreview: () => void;
  onUpdate: (predicate: string) => void;
  onUpdateJson: (predicate: any) => void;
  predicate: string;
  predicateJsonFormat: any;
  components: RuleComponents;
  fields: any;
  translate: (translationKey: string) => string;
};

const PredicateBuilder: React.FC<Props> = ({
  fields,
  translate,
  predicateJsonFormat,
  predicate,
  components,
  onUpdate,
  onUpdateJson,
  onError,
  onPreview,
}) => {
  const { config } = useAwesomeQueryConfig(fields);
  const [state, setState] = useState({
    tree: QbUtils.checkTree(
      QbUtils.loadTree(predicateJsonFormat ? predicateJsonFormat : { id: QbUtils.uuid(), type: 'group' }),
      config,
    ),
    config: config,
  });

  const onChange = useCallback(
    (immutableTree: ImmutableTree, conf: Config) => {
      setState((prevState) => ({ ...prevState, tree: immutableTree, config: conf }));

      try {
        const q = QbUtils.spelFormat(immutableTree, config);
        if (q) {
          onUpdate(q.replaceAll("'", '"'));
        }
        const jsonTree = QbUtils.getTree(immutableTree);
        onUpdateJson(jsonTree);
      } catch (e) {
        console.log(e);
      }
    },
    [onUpdate],
  );

  useEffect(() => {
    if (config && predicate) {
      const spel = predicate.replace(/(?<![<=>!])=(?!=)/g, '==');
      const [immutable, errors] = QbUtils.loadFromSpel(spel, config);
      const tree = QbUtils.checkTree(immutable!, config);
      if (errors.length) {
        onError();
        return;
      }
      setState({ tree, config });
    }
  }, []);

  const renderBuilder = useCallback((props: BuilderProps) => {
    return (
      <div className="query-builder-container mb-2">
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    );
  }, []);
  return (
    <div className="w-full">
      <PredicateBuilderStyles />
      <div className={`predicateBuilder max-h-[400px] overflow-x-hidden overflow-y-scroll`}>
        <Query {...config} value={state.tree} onChange={onChange} renderBuilder={renderBuilder} />
      </div>
      <div className="bordet-t border-primary-300">
        <components.Button variant="primary" size="s" onClick={onPreview} data-cy="predicate-preview-button">
          {translate('dashboard.rule.predicate.preview')}
        </components.Button>
      </div>
    </div>
  );
};

export default PredicateBuilder;
