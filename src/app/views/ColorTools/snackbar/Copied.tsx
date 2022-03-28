import {
  Component,
  createSignal,
  For,
  JSXElement,
  onMount
  } from 'solid-js';
import { render } from 'solid-js/web';
import MdButton from '../../../material/Button';
import MdSnackbar from '../../../material/Snackbar/Snackbar';
import { copyText } from '../../../utils';
import { useConfig } from '../Config';


export type OpenCopiedSnackbarRef = {
  ref: (text: string, event: Event) => Promise<JSXElement | false>
};

interface Props {
  open: OpenCopiedSnackbarRef
}

const CopiedSnackbar: Component<Props> = (props) => {
  const config = useConfig()[0];

  const [hasOpened, setHasOpened] = createSignal(false);

  let messageHead = '';
  let messageBody = '';


  const onSuccess = () => {
    messageHead = 'Copied';
    setHasOpened(true);
  }


  const onFail = () => {
    messageHead = 'Failed to copy';
    setHasOpened(true);
  }


  props.open.ref = async (text, event) => {
    event.preventDefault();
    event.stopPropagation();

    const canCopy = config().copy?.state;

    if (canCopy) {
      setHasOpened(false);
      messageBody = text;

      await copyText(text)
        .then(onSuccess)
        .catch(onFail);

      return true;
    }

    return false;
  }


  return (<>
    <MdSnackbar
      opened={hasOpened()}
      onClose={setHasOpened}
      message={<span>{ messageHead } <b>"{ messageBody }"</b></span>}
      action={<MdButton>Close</MdButton>}
    />
  </>)
}
export default CopiedSnackbar;