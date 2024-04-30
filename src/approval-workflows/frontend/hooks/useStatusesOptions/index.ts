
const useStatusesOptions = (translate: (key: string) => string) => {
  const flowStatusOptions = [
    { name: 'Pending', value: 'Pending' },
    { name: 'Approved', value: 'Approved' },
    { name: 'Rejected', value: 'Rejected' },
  ];

  const mapOptions = (options: typeof flowStatusOptions) => {
    return options.map(({ name, value }) => ({
      name: translate(`dashboard.flows.status.${name.toLowerCase()}`),
      value,
    }));
  };

  return {
    flowStatusOptions: mapOptions(flowStatusOptions),
  };
};

export default useStatusesOptions;
