export function getWrapper(identifier: string) {
  let wrapper = null;
  if (identifier) {
    wrapper = document.getElementById(identifier) as HTMLElement;
    if (!wrapper) {
      wrapper = document.getElementsByClassName(identifier)[0] as HTMLElement;
    }
  }

  return wrapper;
}