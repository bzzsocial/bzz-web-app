import { Component, createSignal, JSXElement, onCleanup, onMount, Show } from 'solid-js';

import styles from './Layout.module.scss';

import { useLocation } from '@solidjs/router';
import NewNote from '../NewNote/NewNote';
import { SendNoteResult } from '../../types/primal';
import NavPhone from '../NavMenu/NavPhone';
import { accountStore } from '../../stores/accountStore';

export const [isHome, setIsHome] = createSignal(false);

const LayoutPhone: Component<{
  children: JSXElement,
  onNewNotePosted: (result: SendNoteResult) => void,
}> = (props) => {

  const location = useLocation();

  let container: HTMLDivElement | undefined;

  const onResize = () => {
    container?.style.setProperty('height', `${window.innerHeight}px`);
  };

  onMount(() => {
    window.addEventListener('resize', onResize);
  });

  onCleanup(() => {
    window.removeEventListener('resize', onResize);
  });

  const containerClass = () => styles.containerPhone;

  return (
    <Show
      when={location.pathname !== '/'}
      fallback={<>
        <div id="modal" class={styles.modal}></div>
        {props.children}
      </>}
    >
      <>
        <div id="container" ref={container} class={containerClass()}>
          <Show when={accountStore.isKeyLookupDone}>
            <div class={styles.phoneContent}>
              <div id="new_note_input" class={styles.headerFloater}>
                <NewNote onSuccess={props.onNewNotePosted}/>
              </div>
              {props.children}
            </div>

            <div class={styles.phoneFooter}>
              <NavPhone />
            </div>
          </Show>
        </div>
      </>
    </Show>
  )
}

export default LayoutPhone;
