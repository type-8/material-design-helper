import { Component } from 'solid-js';
import MdDialog, { MdDialogStyles } from '../../../material/Dialog';
import { ColorViewerContextProps, useColorViewer } from '../ColorViewer';
import styles from './Exporting.module.scss';


interface Props {
  opened: boolean;
  onClose: (opened: false) => void;
}

const ExportingDialog: Component<Props> = (props) => {
  const primaryColor = useColorViewer.primary()[0];
  const secondaryColor = useColorViewer.secondary()[0];


  /** @description <a>を作り、クリックの動作を用いてファイルをダウンロードさせる */
  const download = (createMapText: CreateMapText, prefix: string, extension : string, type: string) => {
    const anchor = document.createElement('a');

    const mapText = createMapText(primaryColor(), secondaryColor());
    const fileName = `${prefix}my-material-theme-variables.${extension}`;

    const file = new window.File([mapText], fileName, { type });

    const url = URL.createObjectURL(file);

    anchor.href = url;
    anchor.download = fileName;
    anchor.type = type;

    anchor.click();

    URL.revokeObjectURL(url);
    props.onClose(false);
  }


  return (
    <MdDialog opened={props.opened} onClose={props.onClose} config={{ trapFocus: () => void 0 }}>
      <h2 class={MdDialogStyles.title}>Export</h2>
      <div class={`${styles.content} ${MdDialogStyles.content}`}>
        <div
          class={styles.card}
          onClick={() => download(createJSONText, '', 'json', 'application/json')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 24 24"><path fill="#fbc02d" d="M5 3h2v2H5v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2m-7 12a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-4 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1Z" /></svg>
          <span class={styles.label}>JSON</span>
          <div class={styles.overlay}></div>
        </div>
  
        <div
          class={styles.card}
          onClick={() => download(createJavaScriptText, '', 'js', 'text/javascript')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 32 32"><path fill="#f5de19" d="M2 2h28v28H2z"/><path fill="#000" d="M20.809 23.875a2.866 2.866 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.889 3.889 0 0 1 3.742 2.107L25 18.128A1.789 1.789 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.055 5.055 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z"/></svg>
          <span class={styles.label}>JavaScript</span>
          <div class={styles.overlay}></div>
        </div>

        <div
          class={styles.card}
          onClick={() => download(createSCSSMapText, '_', 'scss', 'text/scss')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 32 32"><path fill="#cd6799" d="M26.11 17.572a5.8 5.8 0 0 0-2.537.588a5.345 5.345 0 0 1-.568-1.314a3.53 3.53 0 0 1-.051-1.1a9.811 9.811 0 0 1 .332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256a6.171 6.171 0 0 0-.235.834a19.686 19.686 0 0 1-1.713 3.294a3.186 3.186 0 0 1-.44-2.066a9.811 9.811 0 0 1 .332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256s-.118.5-.235.834s-1.483 3.386-1.841 4.173c-.184.4-.343.726-.455.946a.233.233 0 0 1-.02.041l-.153.292v.005c-.077.138-.159.266-.2.266a1.711 1.711 0 0 1 .01-.869c.2-1.059.69-2.705.685-2.762c0-.031.092-.317-.317-.465a.508.508 0 0 0-.578.1c-.036 0-.061.087-.061.087s.445-1.851-.849-1.851a3.855 3.855 0 0 0-2.475 1.683c-.348.189-1.089.593-1.882 1.028c-.3.169-.614.338-.905.5c-.02-.02-.041-.046-.061-.066C6.87 17.6 3.975 16.416 4.1 14.171c.046-.818.327-2.966 5.559-5.575c4.306-2.122 7.733-1.534 8.326-.23c.849 1.862-1.836 5.319-6.285 5.82a3.351 3.351 0 0 1-2.813-.711c-.235-.256-.271-.271-.358-.22c-.143.077-.051.307 0 .44a2.626 2.626 0 0 0 1.606 1.263a8.55 8.55 0 0 0 5.217-.517c2.7-1.043 4.8-3.943 4.184-6.372c-.619-2.465-4.71-3.278-8.582-1.9a19.5 19.5 0 0 0-6.595 3.783c-2.133 1.995-2.47 3.728-2.332 4.455c.5 2.578 4.051 4.255 5.472 5.5a8.554 8.554 0 0 1-.194.107c-.711.353-3.421 1.77-4.1 3.268c-.767 1.7.123 2.915.711 3.079a4.374 4.374 0 0 0 4.71-1.908a4.725 4.725 0 0 0 .423-4.353a.107.107 0 0 0-.02-.031l.557-.327a27.2 27.2 0 0 1 1.028-.578a6.74 6.74 0 0 0-.363 1.862a3.886 3.886 0 0 0 .834 2.7a.921.921 0 0 0 .675.22c.6 0 .875-.5 1.176-1.094c.368-.726.7-1.57.7-1.57s-.414 2.281.711 2.281c.409 0 .823-.532 1.008-.8v.005l.031-.051l.066-.107v-.01c.164-.286.532-.936 1.079-2.015c.706-1.391 1.386-3.13 1.386-3.13a8.888 8.888 0 0 0 .271 1.13a10.643 10.643 0 0 0 .583 1.309c-.164.23-.266.358-.266.358l.005.005c-.133.174-.276.363-.435.547a16.3 16.3 0 0 0-1.314 1.647a.447.447 0 0 0 .123.6a1.116 1.116 0 0 0 .685.113a3.147 3.147 0 0 0 1.028-.235a3.45 3.45 0 0 0 .885-.465a1.98 1.98 0 0 0 .849-1.744a3.521 3.521 0 0 0-.322-1.233c.051-.072.1-.143.148-.215a23.428 23.428 0 0 0 1.534-2.649a8.888 8.888 0 0 0 .271 1.13a7.57 7.57 0 0 0 .5 1.125a4.861 4.861 0 0 0-1.497 1.922c-.322.931-.072 1.35.4 1.447a1.425 1.425 0 0 0 .747-.153a3.4 3.4 0 0 0 .946-.486a2.126 2.126 0 0 0 1.043-1.729a3.268 3.268 0 0 0-.235-1.023a5.356 5.356 0 0 1 2.716-.312c2.434.286 2.915 1.805 2.823 2.445a1.618 1.618 0 0 1-.772 1.094c-.169.107-.225.143-.21.22c.02.113.1.107.245.087A1.9 1.9 0 0 0 30 20.7c.077-1.5-1.355-3.145-3.887-3.13ZM7.33 23.9c-.808.88-1.933 1.212-2.419.931c-.522-.3-.317-1.6.675-2.532a12.884 12.884 0 0 1 1.9-1.417c.118-.072.292-.174.5-.3l.056-.031l.123-.077A3.493 3.493 0 0 1 7.33 23.9Zm5.881-4c-.281.685-.869 2.44-1.227 2.342c-.307-.082-.5-1.412-.061-2.726a6.193 6.193 0 0 1 .956-1.754c.44-.491.926-.655 1.043-.455a9.062 9.062 0 0 1-.711 2.593Zm4.853 2.322c-.118.061-.23.1-.281.072c-.036-.02.051-.1.051-.1s.609-.655.849-.951c.138-.174.3-.378.476-.609v.066c0 .782-.757 1.309-1.094 1.524Zm3.744-.854c-.087-.061-.072-.266.22-.905a3.408 3.408 0 0 1 .834-1.074a1.448 1.448 0 0 1 .082.471a1.547 1.547 0 0 1-1.135 1.509Z"></path></svg>
          <span class={styles.label}>SCSS</span>
          <div class={styles.overlay}></div>
        </div>

        <div
          class={styles.card}
          onClick={() => download(createSassMapText, '_', 'sass', 'text/sass')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 32 32"><path fill="#cd6799" d="M26.11 17.572a5.8 5.8 0 0 0-2.537.588a5.345 5.345 0 0 1-.568-1.314a3.53 3.53 0 0 1-.051-1.1a9.811 9.811 0 0 1 .332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256a6.171 6.171 0 0 0-.235.834a19.686 19.686 0 0 1-1.713 3.294a3.186 3.186 0 0 1-.44-2.066a9.811 9.811 0 0 1 .332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256s-.118.5-.235.834s-1.483 3.386-1.841 4.173c-.184.4-.343.726-.455.946a.233.233 0 0 1-.02.041l-.153.292v.005c-.077.138-.159.266-.2.266a1.711 1.711 0 0 1 .01-.869c.2-1.059.69-2.705.685-2.762c0-.031.092-.317-.317-.465a.508.508 0 0 0-.578.1c-.036 0-.061.087-.061.087s.445-1.851-.849-1.851a3.855 3.855 0 0 0-2.475 1.683c-.348.189-1.089.593-1.882 1.028c-.3.169-.614.338-.905.5c-.02-.02-.041-.046-.061-.066C6.87 17.6 3.975 16.416 4.1 14.171c.046-.818.327-2.966 5.559-5.575c4.306-2.122 7.733-1.534 8.326-.23c.849 1.862-1.836 5.319-6.285 5.82a3.351 3.351 0 0 1-2.813-.711c-.235-.256-.271-.271-.358-.22c-.143.077-.051.307 0 .44a2.626 2.626 0 0 0 1.606 1.263a8.55 8.55 0 0 0 5.217-.517c2.7-1.043 4.8-3.943 4.184-6.372c-.619-2.465-4.71-3.278-8.582-1.9a19.5 19.5 0 0 0-6.595 3.783c-2.133 1.995-2.47 3.728-2.332 4.455c.5 2.578 4.051 4.255 5.472 5.5a8.554 8.554 0 0 1-.194.107c-.711.353-3.421 1.77-4.1 3.268c-.767 1.7.123 2.915.711 3.079a4.374 4.374 0 0 0 4.71-1.908a4.725 4.725 0 0 0 .423-4.353a.107.107 0 0 0-.02-.031l.557-.327a27.2 27.2 0 0 1 1.028-.578a6.74 6.74 0 0 0-.363 1.862a3.886 3.886 0 0 0 .834 2.7a.921.921 0 0 0 .675.22c.6 0 .875-.5 1.176-1.094c.368-.726.7-1.57.7-1.57s-.414 2.281.711 2.281c.409 0 .823-.532 1.008-.8v.005l.031-.051l.066-.107v-.01c.164-.286.532-.936 1.079-2.015c.706-1.391 1.386-3.13 1.386-3.13a8.888 8.888 0 0 0 .271 1.13a10.643 10.643 0 0 0 .583 1.309c-.164.23-.266.358-.266.358l.005.005c-.133.174-.276.363-.435.547a16.3 16.3 0 0 0-1.314 1.647a.447.447 0 0 0 .123.6a1.116 1.116 0 0 0 .685.113a3.147 3.147 0 0 0 1.028-.235a3.45 3.45 0 0 0 .885-.465a1.98 1.98 0 0 0 .849-1.744a3.521 3.521 0 0 0-.322-1.233c.051-.072.1-.143.148-.215a23.428 23.428 0 0 0 1.534-2.649a8.888 8.888 0 0 0 .271 1.13a7.57 7.57 0 0 0 .5 1.125a4.861 4.861 0 0 0-1.497 1.922c-.322.931-.072 1.35.4 1.447a1.425 1.425 0 0 0 .747-.153a3.4 3.4 0 0 0 .946-.486a2.126 2.126 0 0 0 1.043-1.729a3.268 3.268 0 0 0-.235-1.023a5.356 5.356 0 0 1 2.716-.312c2.434.286 2.915 1.805 2.823 2.445a1.618 1.618 0 0 1-.772 1.094c-.169.107-.225.143-.21.22c.02.113.1.107.245.087A1.9 1.9 0 0 0 30 20.7c.077-1.5-1.355-3.145-3.887-3.13ZM7.33 23.9c-.808.88-1.933 1.212-2.419.931c-.522-.3-.317-1.6.675-2.532a12.884 12.884 0 0 1 1.9-1.417c.118-.072.292-.174.5-.3l.056-.031l.123-.077A3.493 3.493 0 0 1 7.33 23.9Zm5.881-4c-.281.685-.869 2.44-1.227 2.342c-.307-.082-.5-1.412-.061-2.726a6.193 6.193 0 0 1 .956-1.754c.44-.491.926-.655 1.043-.455a9.062 9.062 0 0 1-.711 2.593Zm4.853 2.322c-.118.061-.23.1-.281.072c-.036-.02.051-.1.051-.1s.609-.655.849-.951c.138-.174.3-.378.476-.609v.066c0 .782-.757 1.309-1.094 1.524Zm3.744-.854c-.087-.061-.072-.266.22-.905a3.408 3.408 0 0 1 .834-1.074a1.448 1.448 0 0 1 .082.471a1.547 1.547 0 0 1-1.135 1.509Z"></path></svg>
          <span class={styles.label}>Sass</span>
          <div class={styles.overlay}></div>
        </div>

        <div
          class={styles.card}
          onClick={() => download(createSCSSMapText, '_', 'styl', 'text/styl')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 256 244"><path fill="#606060" d="M32.167 98.573c2.9 0 5.246.396 7.028 1.19 1.782.792 2.672 1.78 2.672 2.97 0 1.453-.366 3.101-1.09 4.948-.727 1.848-1.42 3.364-2.079 4.552-.265.265-.593.297-.989.1-.396-.199-.595-.56-.595-1.089.397-.921.595-2.242.595-3.96 0-1.846-.495-3.366-1.485-4.552-.989-1.188-2.344-1.781-4.057-1.781-2.246 0-4.058.692-5.444 2.078-1.385 1.385-2.078 3.334-2.078 5.837 0 2.114.559 4.127 1.682 6.038a69.666 69.666 0 0 0 3.761 5.742 56.847 56.847 0 0 1 3.86 6.137c1.188 2.178 1.782 4.652 1.782 7.423 0 4.749-1.914 8.444-5.74 11.082-3.828 2.643-8.843 3.96-15.043 3.96-4.487 0-8.017-.725-10.59-2.177-2.575-1.45-3.86-3.032-3.86-4.75 0-.525.197-1.253.593-2.178.396-.921.922-1.91 1.585-2.97a45.614 45.614 0 0 1 2.178-3.168c.791-1.054 1.647-1.91 2.572-2.57.396-.265.759-.201 1.09.196.328.396.362.792.1 1.188-.793.79-1.385 1.617-1.783 2.475-.396.857-.594 2.014-.594 3.463 0 2.374.792 4.324 2.377 5.837 1.583 1.52 3.627 2.278 6.135 2.278 3.43 0 6.102-.957 8.017-2.87 1.912-1.911 2.87-4.256 2.87-7.028 0-2.506-.562-4.849-1.683-7.026a76.243 76.243 0 0 0-3.661-6.335 83.818 83.818 0 0 1-3.663-6.237 14.104 14.104 0 0 1-1.682-6.73c0-3.428 1.45-6.3 4.355-8.608 2.899-2.304 7.188-3.465 12.864-3.465zM86.203 99.566c.66.264.924.629.794 1.09-.135.463-.727.824-1.783 1.088-1.98 0-4.255.068-6.828.197-2.575.132-5.315.332-8.215.593-2.643 6.469-4.819 12.767-6.533 18.905-1.717 6.135-2.572 11.118-2.572 14.945 0 4.485 1.712 6.727 5.145 6.727 3.43 0 7.257-2.967 11.483-8.904.394-.265.757-.265 1.086 0 .329.264.428.724.299 1.385a35.851 35.851 0 0 1-8.512 9.601c-3.433 2.706-6.798 4.056-10.095 4.056-3.434 0-5.973-.82-7.621-2.474-1.651-1.65-2.475-3.925-2.475-6.83 0-3.824.922-9.105 2.77-15.835 1.848-6.73 4.223-13.588 7.128-20.586-3.434.396-6.6.929-9.501 1.585-.662-.128-.828-.46-.496-.99.328-.525.922-1.089 1.782-1.682.855-.596 1.88-1.121 3.067-1.585 1.187-.46 2.309-.692 3.365-.692h1.584c.527 0 1.056-.065 1.584-.197a214.313 214.313 0 0 1 5.344-11.086c1.847-3.564 3.693-6.794 5.543-9.7.79-.922 1.88-1.747 3.265-2.475 1.385-.722 2.738-1.285 4.057-1.682 1.318-.396 2.407-.625 3.268-.693.856-.064 1.217.168 1.09.693-2.247 3.434-4.454 7.259-6.633 11.481a206.783 206.783 0 0 0-6.235 13.262c2.506-.13 5.048-.197 7.62-.197h7.225z"/><path fill="#B3D107" d="M206.299.528c1.979 0 3.593.496 4.85 1.485 1.251.989 2.109 2.31 2.572 3.96.462 1.649.526 3.53.198 5.641-.33 2.113-1.088 4.224-2.276 6.334-.265.264-.594.264-.99 0-.395-.265-.66-.593-.791-.99.263-1.584-.296-2.902-1.683-3.959-1.385-1.054-3.532-1.584-6.433-1.584-5.412 0-10.855 2.013-16.33 6.038-5.477 4.027-10.789 9.34-15.934 15.934-5.147 6.6-9.965 14.19-14.45 22.765a215.382 215.382 0 0 0-11.68 26.524c-3.298 9.105-5.907 18.145-7.818 27.118-1.913 8.976-2.868 17.155-2.868 24.547 0 3.956 1.12 5.937 3.365 5.937 1.583 0 3.133-.66 4.65-1.981 1.516-1.318 3.268-3.296 5.247-5.938.395-.26.758-.228 1.087.1.329.333.428.76.299 1.285-2.643 3.96-5.741 7.259-9.305 9.897-3.562 2.642-6.798 3.96-9.699 3.96-2.508 0-4.255-.726-5.244-2.179-.989-1.45-1.485-3.295-1.485-5.54 0-6.203 1.317-13.958 3.96-23.258 2.638-9.304 6.165-19.134 10.59-29.495 4.42-10.358 9.533-20.684 15.34-30.977 5.806-10.293 11.844-19.562 18.113-27.81 6.266-8.247 12.57-14.945 18.903-20.093C194.817 3.1 200.755.528 206.3.528zM30.55 243.76c-1.98 0-3.595-.495-4.851-1.484-1.252-.989-2.11-2.31-2.573-3.96-.46-1.651-.526-3.53-.198-5.641.332-2.113 1.089-4.223 2.276-6.334.266-.266.594-.266.99 0 .395.262.66.593.791.99-.262 1.584.297 2.902 1.683 3.959 1.385 1.053 3.531 1.582 6.433 1.582 5.412 0 10.856-2.013 16.33-6.038 5.477-4.023 10.79-9.335 15.936-15.931 5.146-6.6 9.964-14.188 14.45-22.765a215.31 215.31 0 0 0 11.677-26.525c3.3-9.105 5.908-18.144 7.82-27.118 1.913-8.975 2.868-17.155 2.868-24.545 0-3.96-1.12-5.938-3.365-5.938-1.584 0-3.134.657-4.65 1.978-1.516 1.317-3.268 3.3-5.247 5.94-.395.26-.757.228-1.087-.1-.328-.332-.427-.761-.298-1.289 2.642-3.956 5.74-7.258 9.304-9.897 3.562-2.638 6.797-3.956 9.699-3.956 2.508 0 4.255.722 5.244 2.175.99 1.453 1.486 3.3 1.486 5.545 0 6.202-1.318 13.953-3.96 23.258-2.638 9.304-6.166 19.133-10.59 29.494-4.42 10.358-9.534 20.684-15.34 30.977-5.807 10.293-11.844 19.562-18.113 27.81-6.266 8.247-12.57 14.946-18.904 20.091-6.331 5.148-12.269 7.722-17.811 7.722z"/><path fill="#606060" d="M164.264 149.248c-5.543 0-8.314-3.035-8.314-9.105 0-2.11.228-4.552.692-7.322.461-2.774 1.19-5.64 2.178-8.611.99-2.971 2.142-5.97 3.463-9.009a55.473 55.473 0 0 1 4.751-8.707 65.65 65.65 0 0 0-4.155 2.87 33.104 33.104 0 0 0-3.564 3.067c-.396.268-.76.168-1.089-.296-.33-.461-.363-.89-.099-1.286 2.243-2.377 5.444-4.815 9.601-7.326 4.155-2.503 8.146-4.485 11.976-5.937.659 0 1.153.167 1.484.496.328.332.363.76.1 1.285a75.925 75.925 0 0 0-10.195 18.013c-2.573 6.468-3.86 12.738-3.86 18.805 0 3.83 1.19 5.74 3.564 5.74 1.713 0 3.825-1.154 6.333-3.463 2.507-2.31 5.148-5.344 7.92-9.107 2.77-3.76 5.572-8.016 8.412-12.765a192.034 192.034 0 0 0 7.82-14.453c.394-.789 1.55-1.582 3.462-2.374 1.913-.794 3.86-1.19 5.84-1.19s2.573.532 1.782 1.586a190.54 190.54 0 0 0-4.85 9.6 73.37 73.37 0 0 0-3.463 8.808 58.564 58.564 0 0 0-2.079 8.807c-.465 2.971-.693 6.235-.693 9.797 0 4.227 1.12 6.334 3.366 6.334 2.242 0 4.75-1.978 7.521-5.938.397-.26.793-.26 1.187 0 .397.268.527.665.397 1.189-2.245 3.431-4.72 6.037-7.423 7.82-2.706 1.78-5.18 2.67-7.422 2.67-5.544 0-8.314-3.232-8.314-9.698 0-6.73 1.186-13.393 3.562-19.994-5.016 9.105-10.293 16.331-15.834 21.676-5.545 5.348-10.232 8.018-14.057 8.018zM246.011 98.573c2.9 0 5.247.396 7.028 1.19 1.782.792 2.672 1.78 2.672 2.97 0 1.453-.365 3.101-1.088 4.948-.729 1.848-1.42 3.364-2.08 4.552-.266.265-.593.297-.99.1-.395-.199-.593-.56-.593-1.089.396-.921.594-2.242.594-3.96 0-1.846-.494-3.366-1.484-4.552-.99-1.188-2.344-1.781-4.058-1.781-2.244 0-4.057.692-5.443 2.078-1.387 1.386-2.078 3.334-2.078 5.837 0 2.114.559 4.127 1.682 6.038a69.666 69.666 0 0 0 3.761 5.742 56.847 56.847 0 0 1 3.86 6.137c1.188 2.178 1.782 4.652 1.782 7.423 0 4.749-1.914 8.444-5.74 11.082-3.83 2.643-8.844 3.96-15.044 3.96-4.489 0-8.017-.725-10.59-2.177-2.575-1.45-3.86-3.032-3.86-4.75 0-.525.197-1.253.593-2.178.396-.921.921-1.91 1.584-2.97a45.589 45.589 0 0 1 2.177-3.168c.791-1.054 1.649-1.91 2.574-2.57.396-.265.758-.201 1.088.196.328.396.363.792.1 1.188-.792.79-1.385 1.617-1.782 2.475-.396.857-.594 2.014-.594 3.463 0 2.374.792 4.324 2.376 5.837 1.584 1.52 3.627 2.278 6.136 2.278 3.429 0 6.102-.957 8.018-2.87 1.91-1.911 2.869-4.256 2.869-7.028 0-2.506-.563-4.849-1.682-7.026a76.243 76.243 0 0 0-3.662-6.335 84.256 84.256 0 0 1-3.663-6.237 14.104 14.104 0 0 1-1.682-6.73c0-3.428 1.45-6.3 4.354-8.608 2.9-2.304 7.188-3.465 12.865-3.465z"/></svg>
          <span class={styles.label}>Stylus</span>
          <div class={styles.overlay}></div>
        </div>

        <div
          class={styles.card}
          onClick={() => download(createLessText, '_', 'less', 'text/less')}
        >
          <svg class={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" aria-hidden="true" viewBox="0 0 24 24"><path fill="#283593" d="M22.991 10.958v.005c0 .231.091.441.24.595a1 1 0 0 0 .773.262H24v1.05a1 1 0 0 0-.77.263l.001-.001a.875.875 0 0 0-.24.604v.015v-.001q0 .356.056.975t.056 1.069a1.884 1.884 0 0 1-.36 1.318l.004-.005a1.566 1.566 0 0 1-1.188.375l.007.001h-.75v-.936h.229v-.038a.68.68 0 0 0 .526-.169l-.001.001a1.013 1.013 0 0 0 .149-.661v.005l-.075-1.95a1.778 1.778 0 0 1 .211-.97l-.005.009c.152-.219.382-.376.649-.43l.007-.001v-.075a1.077 1.077 0 0 1-.654-.41l-.002-.003a1.752 1.752 0 0 1-.206-.982v.006l.075-1.95a1.135 1.135 0 0 0-.134-.662l.003.006a.667.667 0 0 0-.547-.168h.004h-.225v-.898h.75a1.57 1.57 0 0 1 1.183.377l-.002-.002a1.882 1.882 0 0 1 .355 1.321l.001-.008q0 .45-.056 1.069t-.059.994zm-3.976 1.2q1.614.525 1.614 1.801v.029a1.72 1.72 0 0 1-.637 1.338l-.003.002a2.674 2.674 0 0 1-1.809.543h.008a3.515 3.515 0 0 1-1.186-.233l.024.008a3.05 3.05 0 0 1-1.053-.603l.003.003l.787-1.162c.414.352.948.574 1.533.6h.005q.75 0 .75-.487q0-.225-.338-.45a4.235 4.235 0 0 0-.718-.292l-.031-.008l-.15-.075q-1.538-.6-1.538-1.726l-.001-.05c0-.518.24-.98.616-1.279l.003-.003a2.511 2.511 0 0 1 1.657-.506h-.006a3.404 3.404 0 0 1 2.051.755l-.006-.005l-.785 1.048a2.2 2.2 0 0 0-1.27-.487h-.005q-.64 0-.64.45a.52.52 0 0 0 .26.411l.003.001c.173.108.372.197.583.258l.017.004q.19.074.266.112zM5.549 14.372h.225l.223 1.275a2.37 2.37 0 0 1-.842.151l-.061-.001h.003q-1.614 0-1.614-2.026V8.145h-.526a.614.614 0 0 0-.507.169a1.132 1.132 0 0 0-.131.66v-.005l.038 1.914a1.872 1.872 0 0 1-.205 1.004l.005-.01a.916.916 0 0 1-.652.393h-.004v.075c.274.055.504.212.654.428l.002.003a1.755 1.755 0 0 1 .206.965v-.006q0 .375-.038 1.05v.9a1.23 1.23 0 0 0 .134.682l-.003-.007a.58.58 0 0 0 .51.187h-.003h.226v.9h-.754a1.568 1.568 0 0 1-1.184-.379l.002.002a1.882 1.882 0 0 1-.355-1.322l-.001.008q0-.45.056-1.069t.056-.975v-.022a.815.815 0 0 0-.24-.578a1.043 1.043 0 0 0-.772-.239h.004v-1.05a1 1 0 0 0 .77-.263l-.001.001a.853.853 0 0 0 .24-.595v-.006q0-.338-.056-.975T.898 8.9a1.884 1.884 0 0 1 .36-1.318l-.004.005a1.566 1.566 0 0 1 1.188-.375l-.007-.001h2.814v6.678c-.002.016-.002.034-.002.053c0 .12.036.231.097.324l-.001-.002a.266.266 0 0 0 .206.106zm8.702-2.214q1.614.525 1.614 1.801v.029a1.72 1.72 0 0 1-.637 1.338l-.003.002a2.674 2.674 0 0 1-1.809.543h.008a3.446 3.446 0 0 1-1.211-.234l.024.008a3.547 3.547 0 0 1-1.075-.605l.006.005l.787-1.162c.414.352.948.574 1.533.6h.005q.75 0 .75-.487q0-.225-.338-.45a4.235 4.235 0 0 0-.718-.292l-.031-.008l-.113-.075q-1.576-.6-1.576-1.726l-.001-.042c0-.525.25-.991.637-1.287l.004-.003a2.587 2.587 0 0 1 1.675-.506h-.006a3.247 3.247 0 0 1 2.012.755l-.005-.004l-.786 1.049a2.163 2.163 0 0 0-1.231-.487h-.007q-.675 0-.675.45a.46.46 0 0 0 .26.412l.003.001c.184.111.397.201.623.259l.017.004q.186.074.261.112zM8.437 9.57a2.254 2.254 0 0 1 1.854.803l.003.003a3.11 3.11 0 0 1 .655 2.051v-.006c-.003.241-.03.474-.079.698l.004-.023v.038H7.312c.034.388.221.726.499.958l.002.002a1.392 1.392 0 0 0 1.046.315l-.006.001a2.68 2.68 0 0 0 1.325-.382l-.012.007l.56 1.05a3.592 3.592 0 0 1-2.101.675a2.888 2.888 0 0 1-2.139-.825a3.065 3.065 0 0 1-.846-2.119l.002-.118v.006a3.028 3.028 0 0 1 .827-2.271l-.001.001a2.666 2.666 0 0 1 1.967-.864h.005zm-1.125 2.476H9.45q0-1.162-1.013-1.162a1.04 1.04 0 0 0-.731.3a1.386 1.386 0 0 0-.394.857z"></path></svg>
          <span class={styles.label}>Less</span>
          <div class={styles.overlay}></div>
        </div>
      </div>
    </MdDialog>
  )
}
export default ExportingDialog;



type ColorRef = ColorViewerContextProps | null;
type CreateMapText = (primaryColor: ColorRef, secondaryColor: ColorRef) => string;
type CreateMapTextFactory = (createContent: (colorKey: 'primary' | 'secondary', colorRef: NonNullable<ColorRef>) => string, head: string, divider: string, foot: string) => CreateMapText;

const createMapTextFactory: CreateMapTextFactory = (createContent, head, divider, foot) => {
  return (primaryColor, secondaryColor) => (
    (primaryColor && secondaryColor)
      ? head + createContent('primary', primaryColor) + divider + createContent('secondary', secondaryColor) + foot
      
      : primaryColor
        ? head + createContent('primary', primaryColor) + foot
        
        : secondaryColor
          ? head + createContent('secondary', secondaryColor) + foot
          : head + foot
  );
};


const createJSONText = createMapTextFactory(
  (colorKey, { value }) => (
`  "${colorKey}": {
    "default": {
      "color": "${value.default.color}",
      "contrast": "${value.default.contrast}"
    },
    "lighter": {
      "color": "${value.lighter.color}",
      "contrast": "${value.lighter.contrast}"
    },
    "darker": {
      "color": "${value.darker.color}",
      "contrast": "${value.darker.contrast}"
    }
  }`),
  '{\n', ',\n', '\n}'
);


const createJavaScriptText = createMapTextFactory(
  (colorKey, { value }) => (
`  ${colorKey}: {
    default: {
      color: '${value.default.color}',
      contrast: '${value.default.contrast}'
    },
    lighter: {
      color: '${value.lighter.color}',
      contrast: '${value.lighter.contrast}'
    },
    darker: {
      color: '${value.darker.color}',
      contrast: '${value.darker.contrast}'
    }
  }`),
  'const theme = {\n', ',\n', '\n};'
);


const createSCSSMapText = createMapTextFactory(
  (colorKey, { value }) => (
`  ${colorKey}: (
    default: (
      color: ${value.default.color},
      contrast: ${value.default.contrast}
    ),
    lighter: (
      color: ${value.lighter.color},
      contrast: ${value.lighter.contrast}
    ),
    darker: (
      color: ${value.darker.color},
      contrast: ${value.darker.contrast}
    )
  )`),
  '$theme: (\n', ',\n', '\n);'
);


const createSassMapText = createMapTextFactory(
  (colorKey, { value }) => (`${colorKey}: (default: (color: ${value.default.color}, contrast: ${value.default.contrast}), lighter: (color: ${value.lighter.color}, contrast: ${value.lighter.contrast}), darker: (color: ${value.darker.color}, contrast: ${value.darker.contrast}))`),
  '$theme: (', ',', ')'
);


const createLessText = createMapTextFactory(
  (colorKey, { value }) => (
`  @${colorKey}: {
    @default: {
      color: ${value.default.color};
      contrast: ${value.default.contrast};
    };
    @lighter: {
      color: ${value.lighter.color};
      contrast: ${value.lighter.contrast};
    };
    @darker: {
      color: ${value.darker.color};
      contrast: ${value.darker.contrast};
    };
  };`),
  '@theme: {\n', '\n', '\n};'
);
