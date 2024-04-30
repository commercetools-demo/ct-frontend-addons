import React, { useState, useEffect } from 'react';
import { ApproverConjunction } from '../../../types/approval/Rule';
import { AssociateRoleAssignment } from '@commercetools/platform-sdk';
import { RuleComponents } from '.';

type Props = {
  tiers: ApproverConjunction[];
  associateRoles?: { value: string; name: string }[];
  onUpdate: (tiers: Tier[]) => void;
  onPreview: () => void;
  translate: (key: string) => string;
  components: RuleComponents
};

interface OR extends AssociateRoleAssignment {
  id: number;
}

interface Tier extends ApproverConjunction {
  id: number;

  and: {
    id: number;
    or: OR[];
  }[];
}

const Approvers: React.FC<Props> = ({
  tiers: initialTiers,
  onUpdate,
  onPreview,
  associateRoles,
  translate,
  components,
}) => {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers as Tier[]);

  const addTier = () => {
    const newTiers = [
      ...tiers,
      {
        id: new Date().getTime(),
        and: [],
      },
    ];

    setTiers(newTiers);
  };

  const removeTier = (id: number) => {
    const newTiers = tiers.filter((tier) => tier.id !== id);

    setTiers(newTiers);
  };

  const addAndGroup = (id: number) => {
    const newTiers = tiers.map((tier) => {
      if (tier.id === id) {
        return {
          id,
          and: [
            ...tier.and,
            {
              id: new Date().getTime(),
              or: [],
            },
          ],
        };
      }
      return tier;
    });
    setTiers(newTiers);
  };

  const removeAndGroup = (tierId: number, andId: number) => {
    const newTiers = tiers.map((tier) => {
      if (tier.id === tierId) {
        return {
          id: tierId,
          and: tier.and.filter((and) => and.id !== andId),
        };
      }
      return tier;
    });
    setTiers(newTiers);
  };

  const addOrGroup = (tierId: number, andGroupId: number) => {
    const newTiers = tiers.map((tier) => {
      if (tier.id === tierId) {
        return {
          id: tierId,
          and: tier.and.map((and) => {
            if (and.id === andGroupId) {
              return {
                id: andGroupId,
                or: [
                  ...and.or,
                  {
                    id: new Date().getTime(),
                    associateRole: {
                      typeId: 'associate-role',
                      key: associateRoles?.[0].value,
                    },
                  },
                ],
              };
            }
            return and;
          }),
        };
      }
      return tier;
    });
    // @ts-ignore
    setTiers(newTiers);
  };

  const removeOrGroup = (tierId: number, andGroupId: number, orGroupId: number) => {
    const newTiers = tiers.map((tier) => {
      if (tier.id === tierId) {
        return {
          id: tierId,
          and: tier.and.map((and) => {
            if (and.id === andGroupId) {
              return {
                id: andGroupId,
                or: and.or.filter((or) => or.id !== orGroupId),
              };
            }
            return and;
          }),
        };
      }
      return tier;
    });
    // @ts-ignore
    setTiers(newTiers);
  };
  const updateAssociateRole = (tierId: number, andGroupId: number, orGroupId: number, value: string) => {
    const newTiers = tiers.map((tier) => {
      if (tier.id === tierId) {
        return {
          id: tierId,
          and: tier.and.map((and) => {
            if (and.id === andGroupId) {
              return {
                id: andGroupId,
                or: and.or.map((or) => {
                  if (or.id === orGroupId) {
                    return {
                      ...or,
                      associateRole: {
                        ...or.associateRole,
                        key: value,
                      },
                    };
                  }
                  return or;
                }),
              };
            }
            return and;
          }),
        };
      }
      return tier;
    });
    // @ts-ignore
    setTiers(newTiers);
  };

  useEffect(() => {
    if (tiers) {
      onUpdate(tiers);
    }
  }, [tiers]);

  if (!associateRoles?.length) {
    return null;
  }

  return (
    <div className="border-primary-400 flex w-full flex-col items-end border p-2">
      <div className="flex w-full flex-row-reverse justify-between">
        <components.Button type="button" variant="primary" size="s" onClick={addTier} data-cy="approvers-add-tier">
          <span className="text-xs">{translate('dashboard.rule.details.add.tier')}</span>
        </components.Button>
      </div>
      {!!tiers.length && (
        <div className="mt-2 flex w-full flex-col">
          {tiers.map((tier, i) => (
            <div className="border-primary-300 mt-2 flex w-full flex-col border p-2" key={tier.id}>
              <div className="flex w-full flex-row justify-between">
                <div className="py-1/2 px-1 ">
                  <span>{`Tier ${i + 1}`}</span>
                </div>
                <div className="flex gap-x-1">
                  <components.Button type="button" variant="warning" size="s" onClick={() => removeTier(tier.id)}>
                    <span className="whitespace-nowrap text-xs">{translate('dashboard.rule.details.remove.tier')}</span>
                  </components.Button>
                  <components.Button
                    type="button"
                    variant="secondary"
                    size="s"
                    onClick={() => addAndGroup(tier.id)}
                    data-cy="approvers-add-and"
                  >
                    <span className="whitespace-nowrap text-xs">{translate('dashboard.rule.details.add.and')}</span>
                  </components.Button>
                </div>
              </div>
              <div>
                <div className="my-4 flex w-full grow flex-col">
                  <span className="py-1/2 w-fit bg-primary px-1 text-neutral-100 rounded-md">
                    {translate('dashboard.rule.details.conjunctions')}
                  </span>
                  {tier.and.map((and) => (
                    <div className="approvers__group-item ml-6 " key={and.id}>
                      <div className="approvers__group-wrapper border-primary-300 mb-2 flex grow flex-col border">
                        <div className="flex w-full grow flex-row justify-end gap-x-2 p-2">
                          <components.Button
                            type="button"
                            variant="warning"
                            size="s"
                            onClick={() => removeAndGroup(tier.id, and.id)}
                          >
                            <span className="whitespace-nowrap text-xs">
                              {translate('dashboard.rule.details.remove.and')}
                            </span>
                          </components.Button>
                          <components.Button
                            type="button"
                            variant="secondary"
                            size="s"
                            onClick={() => addOrGroup(tier.id, and.id)}
                            data-cy="approvers-add-or"
                          >
                            <span className="text-xs">{translate('dashboard.rule.details.add.or')}</span>
                          </components.Button>
                        </div>
                        {!!and.or.length && (
                          <div className="ml-2">
                            <span className="py-1/2 w-fit bg-primary px-1 text-neutral-100 rounded-md">
                              {translate('dashboard.rule.details.disjunctions')}
                            </span>
                            <div className="flex flex-col pl-6">
                              {and.or.map((or) => (
                                <div
                                  key={or.id}
                                  className="approvers__group-item flex flex-row items-center gap-x-2 pb-2"
                                >
                                  <span className="approvers__group-wrapper">
                                    {translate('dashboard.rule.details.associate.role')}
                                  </span>
                                  <div className="w-1/2">
                                    <components.Select
                                      options={associateRoles}
                                      value={or.associateRole.key}
                                      onChange={(e: string) => updateAssociateRole(tier.id, and.id, or.id, e)}
                                    />
                                  </div>
                                  <components.Button
                                    type="button"
                                    variant="warning"
                                    size="s"
                                    onClick={() => removeOrGroup(tier.id, and.id, or.id)}
                                  >
                                    <span className="whitespace-nowrap text-xs">
                                      {translate('dashboard.rule.details.remove.or')}
                                    </span>
                                  </components.Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 w-full border-t pt-2">
        <components.Button type="button" variant="primary" onClick={onPreview} data-cy="approvers-preview">
          {translate('dashboard.rule.details.preview')}
        </components.Button>
      </div>
    </div>
  );
};

export default Approvers;
