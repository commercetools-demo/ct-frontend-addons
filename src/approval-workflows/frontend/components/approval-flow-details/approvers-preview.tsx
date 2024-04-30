import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tree, TreeNode } from 'react-organizational-chart';
import { ApproverConjunction } from '../../../types/approval/Rule';

type Props = {
  previewApprovedRoles?: string[];
  previewRejecteddRoles?: string[];
  tiers: ApproverConjunction[];
  isPreview?: boolean;
  onEdit?: () => void;
  translate: (translationKey: string) => string;
  components: {
    Button: any;
  };
};

const ApproversPreview: React.FC<Props> = ({
  tiers,
  isPreview,
  previewApprovedRoles,
  previewRejecteddRoles,
  onEdit,
  translate,
  components,
}) => {
  return (
    <div className="border border-primary-300 p-2">
      <div className="flex flex-row flex-wrap">
        {tiers?.map((tier, i) => (
          <div className={tiers.length > 1 ? 'w-1/2' : 'w-full'} key={i}>
            <Tree lineWidth={'2px'} lineColor={'var(--accent-500)'} lineBorderRadius={'10px'} label={`Tier ${i + 1}`}>
              {tier.and?.map((and, idx) => (
                <TreeNode key={idx} label="AND">
                  {and.or?.map((or, index) => (
                    <TreeNode key={index} label="OR">
                      <div className="mx-auto mt-1 flex items-center border border-accent-300 p-1">
                        <h2>{or.associateRole.key}</h2>
                        {!!previewApprovedRoles?.length && previewApprovedRoles.includes(or.associateRole.key) && (
                          <CheckIcon className="ml-2 h-4 w-4 text-green-600" />
                        )}
                        {!!previewRejecteddRoles?.length && previewRejecteddRoles.includes(or.associateRole.key) && (
                          <XMarkIcon className="ml-2 h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </Tree>
          </div>
        ))}
      </div>
      {!isPreview && (
        <div className="mt-2 w-full border-t">
          <components.Button className="mt-2 bg-primary-400" onClick={onEdit}>
            {translate('edit')}
          </components.Button>
        </div>
      )}
    </div>
  );
};

export default ApproversPreview;
