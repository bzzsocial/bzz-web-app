import styles from "./VerificationCheck.module.scss";

import { Component, createSignal, JSXElement, onMount, Show } from "solid-js";
import { PrimalUser } from "../../types/primal";
import { isAccountVerified } from "../../lib/profile";
import { hookForDev } from "../../lib/devTools";


const VerificationCheck: Component<{
  user: PrimalUser | undefined,
  large?: boolean,
  fallback?: JSXElement,
  id?: string,
  mock?: boolean,
  inline?: boolean,
}> = (props) => {
  const [isVerified, setIsVerified] = createSignal(false);

  const checkVerification = () => {
    const nip05 = props.user?.nip05;

    if (!nip05) {
      setIsVerified(false);
      return;
    }

    isAccountVerified(nip05).then(profile => {
      if (profile) {
        setIsVerified(() => profile.pubkey === props.user?.pubkey);
        return;
      }

      setIsVerified(() => false);
    });
  }

  onMount(() => {
    checkVerification();
  })

  return (
    <Show when={isVerified()} fallback={props.fallback}>
      <div
        id={props.id}
        data-user={props.user?.pubkey}
        class={`${props.large ? styles.verificationIconL : styles.verificationIcon} ${props.inline ? styles.inline : ''} `}
      >
        <span class={styles.verifiedIcon} />
      </div>
    </Show>
  )
}

export default hookForDev(VerificationCheck);
