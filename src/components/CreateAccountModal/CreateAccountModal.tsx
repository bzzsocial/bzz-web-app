import { useIntl } from '@cookbook/solid-intl';
import { Component } from 'solid-js';
import Modal from '../Modal/Modal';

import { account as t, actions as tActions } from '../../translations';

import styles from './CreateAccountModal.module.scss';
import { hookForDev } from '../../lib/devTools';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import ButtonLink from '../Buttons/ButtonLink';
import { useNavigate } from '@solidjs/router';
import AdvancedSearchDialog from '../AdvancedSearch/AdvancedSearchDialog';


import bzzLogo from '../../assets/images/bzz_logo.png';

const CreateAccountModal: Component<{
  id?: string,
  open?: boolean,
  onLogin?: () => void,
  onAbort?: () => void,
}> = (props) => {

  const intl = useIntl();
  const navigate = useNavigate();

  const onCreateAccount = () => {
    props.onAbort && props.onAbort();
    navigate('/new');
  };

  return (
    <AdvancedSearchDialog
      open={props.open}
      setOpen={(isOpen: boolean) => !isOpen && props.onAbort && props.onAbort()}
      title={
        <div class={styles.title}>
          {intl.formatMessage(tActions.getStartedTitle)}
        </div>
      }
      triggerClass={styles.hidden}
    >
      <div id={props.id} class={styles.modal}>
        <div class={styles.infoWrapper}>
          <img src={bzzLogo}></img>
          <div class={styles.loginSteps}>
            <div class={styles.loginExplain}>
              {intl.formatMessage(t.createNewDescription)}
            </div>
          </div>
        </div>

        <div class={styles.bellowInfo}>
          <ButtonPrimary onClick={onCreateAccount}>
            {intl.formatMessage(tActions.getStarted)}
          </ButtonPrimary>

          <div class={styles.loginNow}>
            {intl.formatMessage(t.alreadyHaveAccount)}&nbsp;
            <button onClick={props.onLogin}>{intl.formatMessage(tActions.loginNow)}</button>
          </div>
        </div>
      </div>

    </AdvancedSearchDialog>
  );
}

export default hookForDev(CreateAccountModal);
