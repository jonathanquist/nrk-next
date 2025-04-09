export const navButtons = (
  ref: any,
  setDayInfo: (info: any) => void,
  setCurrentDayEvents: (events: any[]) => void
) => ({
  customPrevButton: {
    text: '', // Set an empty string to hide the default text
    click: () => {
      const api = ref?.current?.getApi();
      api.prev();
      setDayInfo({}); // Clear dayInfo
      setCurrentDayEvents([]); // Clear currentDayEvents
    },
    icon: 'custom',
  },
  customNextButton: {
    text: '', // Set an empty string to hide the default text
    click: () => {
      const api = ref?.current?.getApi();
      api.next();
      setDayInfo({}); // Clear dayInfo
      setCurrentDayEvents([]); // Clear currentDayEvents
    },
    icon: 'custom',
  },
});
