const utils = {};

utils.isNullOrUndefined = (arg) => {
  return arg === null || arg === undefined || arg === '';
};

/**
 * Used to completely stop event propagation
 * @param event
 */
utils.stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};
