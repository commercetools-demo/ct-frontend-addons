var useStatusesOptions = function (translate) {
    var flowStatusOptions = [
        { name: 'Pending', value: 'Pending' },
        { name: 'Approved', value: 'Approved' },
        { name: 'Rejected', value: 'Rejected' },
    ];
    var mapOptions = function (options) {
        return options.map(function (_a) {
            var name = _a.name, value = _a.value;
            return ({
                name: translate("dashboard.flows.status.".concat(name.toLowerCase())),
                value: value,
            });
        });
    };
    return {
        flowStatusOptions: mapOptions(flowStatusOptions),
    };
};
export default useStatusesOptions;
