
type CopyText = (text: string) => Promise<boolean | void>;
export const copyText: CopyText = (() => {
  const clipboard = window.navigator.clipboard;

  return clipboard
    ? clipboard.writeText.bind(clipboard)
    : (text: string) => new Promise<boolean>(resolve => resolve(document.execCommand('copy', void 0, text)))
})();
