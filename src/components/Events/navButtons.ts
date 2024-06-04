export const navButtons = (ref: any) => ({
  customPrevButton: {
    text: '', // Set an empty string to hide the default text
    click: () => {
      const api = ref?.current?.getApi();
      api.prev();
    },
    icon: 'custom',
  },
  customNextButton: {
    text: '', // Set an empty string to hide the default text
    click: () => {
      const api = ref?.current?.getApi();
      api.next();
    },
    icon: 'custom',
  },
});
