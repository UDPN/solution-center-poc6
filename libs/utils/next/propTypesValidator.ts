/**
 * t('note_0009')
 * @param props
 * @param propName
 * @param componentName
 * @param location
 * @param propFullName
 * @returns
 */
export const propTypesValidator: PropTypesValidator = (
  props,
  propName,
  componentName,
  location,
  propFullName
) => {
  return props[propName] === null || props[propName] === undefined
    ? null
    : null;
  // : new Error(
  //     componentName + "." + location + "." + propName + "__" + propFullName
  //   )
  // null;
};
