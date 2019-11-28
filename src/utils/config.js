let config = {
  defaultContainerElement: null,
  defaultSnackbarDuration: 3500,
  defaultUseHtml5Validation: true,
  defaultInputHasCounter: false,
  defaultInputAutocomplete: 'on',
  denseLabelScale: 0.923,
  labelScale: 0.75
}

export default config

export const setOptions = options => {
  config = options
}
