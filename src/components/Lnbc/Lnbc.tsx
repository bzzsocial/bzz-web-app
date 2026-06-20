import { Component, createEffect, createSignal, Show } from 'solid-js';
import { hookForDev } from '../../lib/devTools';
// @ts-ignore
import { decode } from 'light-bolt11-decoder';

import styles from './Lnbc.module.scss';
import { createStore, reconcile } from 'solid-js/store';
import { humanizeNumber } from '../../lib/stats';
import { date, dateFuture } from '../../lib/dates';
import ButtonGhost from '../Buttons/ButtonGhost';
import { LnbcInvoice } from '../../types/primal';
import { emptyInvoice } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { logError } from '../../lib/logger';
import { useIntl } from '@cookbook/solid-intl';
import { lnInvoice } from '../../translations';


const Lnbc: Component< {
  id?: string,
  lnbc: string,
  alternative?: boolean,
  noBack?: boolean,
} > = (props) => {

  const app = useAppContext();
  const intl = useIntl();

  const [invoice, setInvoice] = createStore<LnbcInvoice>({ ...emptyInvoice });

  const [invoiceCopied, setInvoiceCopied] = createSignal(false);

  createEffect(() => {
    try {
      const dec: LnbcInvoice = decode(props.lnbc);
      setInvoice(reconcile({...emptyInvoice}))
      setInvoice(() => ({ ...dec }));
    } catch (e) {
      logError('Failed to decode lightining unvoice: ', e);
    }
  });

  createEffect(() => {
    if (invoiceCopied()) {
      setTimeout(() => {
        setInvoiceCopied(() => false);
      }, 1_000);
    }
  })

  const isLightning = () => invoice.sections.find(s => s.name === 'lightning_network');

  const expiryDate = () => {
    const expiry = invoice.sections.find(s => s.name === 'expiry')?.value as number;
    const created = invoice.sections.find(s => s.name === 'timestamp')?.value as number;

    return expiry + created;
  }

  const hasExpired = () => {
    const today = Math.floor((new Date()).getTime() / 1_000);

    return today > expiryDate();
  }

  const amount = () =>
    `${humanizeNumber(parseInt(invoice.sections.find(s => s.name === 'amount')?.value || '0') / 1_000)} sats`;

  const description = () =>
    decodeURI(invoice.sections.find(s => s.name === 'description')?.value) || '';

  const klass = () => {
    let k = props.alternative ? styles.lnbcAlter : styles.lnbc;
    if (props.noBack) {
      k += ` ${styles.noBack}`
    }

    return k;
  }

  return (
    <div id={props.id} class={klass()}>
      <div class={styles.header}>
        <Show when={isLightning()}>
          <div class={styles.title}>
            <div class={styles.lnIcon}></div>
            <div>{intl.formatMessage(lnInvoice.title)}</div>
          </div>
        </Show>
        <div class={styles.headerActions}>
          <Show when={!hasExpired()}>
            <ButtonGhost
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                app?.actions.openLnbcModal(props.lnbc, () => {
                  app.actions.closeLnbcModal();
                });
              }}
              shrink={true}
            >
              <div class={styles.qrIcon}></div>
            </ButtonGhost>
          </Show>

          <Show
            when={!invoiceCopied()}
            fallback={<div class={styles.copyDone}><div class={styles.checkIcon}></div></div>}
          >
            <ButtonGhost
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                navigator.clipboard.writeText(props.lnbc);
                setInvoiceCopied(() => true);
              }}
              shrink={true}
            >
              <div class={styles.copyIcon}></div>
            </ButtonGhost>
          </Show>
        </div>
      </div>
      <div class={styles.body}>
        <div class={styles.description}>{description()}</div>
        <div class={styles.amount}>{amount()}</div>
      </div>

      <div class={styles.footer}>
        <Show
          when={!hasExpired()}
          fallback={
            <div class={styles.expiredDate}>
              {intl.formatMessage(lnInvoice.expired, { date: date(expiryDate(), 'long').label })}
            </div>
          }
        >
          <div class={styles.expiryDate}>
            {intl.formatMessage(lnInvoice.expires, { date: dateFuture(expiryDate(), 'long').label })}
          </div>
        </Show>
      </div>
    </div>
  );
}

export default hookForDev(Lnbc);
