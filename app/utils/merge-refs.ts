// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mergeRefs<T = any>(
  ...refs: Array<React.Ref<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
