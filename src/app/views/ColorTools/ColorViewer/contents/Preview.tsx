import { Component, createSignal } from 'solid-js';
import MdButton from '../../../../material/Button';
import SVG_CONTENTS from './preview-svg-contents';
import styles from './Preview.module.scss';


const PreviewContent: Component = () => {
  const [page, setPage] = createSignal(0);
  const pageLength = SVG_CONTENTS.length;


  return (
    <div class={styles.host}>
      <div class={styles.nav}>
        <MdButton variant="icon" disabled={(page()) === 0} onClick={() => setPage(prev => prev - 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/></svg>
        </MdButton>

        <span class={styles.label}>
          { page() + 1 } / { pageLength }
        </span>

        <MdButton variant="icon" disabled={page() === (pageLength - 1)} onClick={() => setPage(prev => prev + 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/></svg>
        </MdButton>
      </div>


      <svg  class={styles.svg} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 365 650">
        { SVG_CONTENTS[page()] }
      </svg>
    </div>
  )
}
export default PreviewContent;
