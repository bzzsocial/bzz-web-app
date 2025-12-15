import { Component, Match, onCleanup, onMount, Show, Switch } from 'solid-js';

import styles from './Landing.module.scss';



import nvk from '../assets/images/nvk.png';
import odell from '../assets/images/odell.png';
import preston from '../assets/images/preston.png';
import pablo from '../assets/images/pablo.png';

import bzzLogo from '../assets/images/bzz_logo.png';
import { A, useNavigate } from '@solidjs/router';
import { useIntl } from '@cookbook/solid-intl';
import { landing as t } from '../translations';

const Landing: Component = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const hasUserInfo = () => {
    return localStorage.getItem('pubkey');
  };

  onMount(() => {
    if (hasUserInfo()) {
      navigate('/home');
      return;
    }
    const html = document.querySelector('html');

    // @ts-ignore
    html.style = 'background-color: white';
  });

  onCleanup(() => {
    const html = document.querySelector('html');

    // @ts-ignore
    html?.removeAttribute('style');
  })

  return (
    <div class={styles.landingPage}>
      <div class={styles.landingContent}>
        <div class={styles.mobileBranding}>
          <img src={bzzLogo} />
        </div>
        <div class={styles.landingVideo}>
          <video
            src='https://m.primal.net/HcyV.mp4'
            controls={false}
            muted={true}
            loop={true}
            playsinline={true}
            autoplay={true}
          />
        </div>
        <div class={styles.landingInfo}>
          <div class={styles.branding}>
            <img src={bzzLogo} width={128} />
          </div>
          <div class={styles.text}>
            <div class={styles.tagline}>
              {intl.formatMessage(t.tagline)}
            </div>
            <div class={styles.description}>
              {intl.formatMessage(t.description)}
            </div>
          </div>
          <div class={styles.actions}>
            <div class={styles.qrCode}>
              <img src={bzzLogo} width={180} />
            </div>
            <div class={styles.appLinks}>
              <A href="/home" class={styles.linkToWeb}>
                <img src={bzzLogo} />
                <p>{intl.formatMessage(t.browserOption)}</p>
              </A>
            </div>
          </div>
        </div>
      </div>
      <div class={styles.landingTestemonials}>
        <div class={styles.testemonial}>
          <p class={styles.pink}>
            Nostr & Bitcoin Lightning is a game changer. Bzz is not just better than Wallet of Satoshi, it is 1000x better than Venmo.
          </p>
          <img src={nvk} />
        </div>

        <div class={styles.testemonial}>
          <p class={styles.cyan}>
            Bzz is the freedom tech alternative to platforms like Twitter and TikTok. True free speech does not have gatekeepers.</p>
          <img src={odell} />
        </div>

        <div class={styles.testemonial}>
          <p class={styles.orange}>
            I don’t know how anyone can stop this. I think we finally have a payments revolution for this epoch.
          </p>
          <img src={preston} />
        </div>

        <div class={styles.testemonial}>
          <p class={styles.blue}>
            The Bzz wallet has erased all my memories of other wallets. Having an integrated social graph is a game-changer.
          </p>
          <img src={pablo} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
