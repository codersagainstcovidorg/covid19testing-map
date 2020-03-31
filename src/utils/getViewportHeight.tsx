// calculate browser height
const getViewportHeight = (): number =>
  (document &&
    document.documentElement &&
    document.documentElement.clientHeight) ||
  window.innerHeight;

export default getViewportHeight;
