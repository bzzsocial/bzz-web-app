import { Component } from 'solid-js';
import styles from './Terms.module.scss';


const Support: Component = () => {
  return (
    <div class={styles.terms} >
      <h1>
        Bzz Support
      </h1>
      <p>
        Last updated on: September 14, 2023
      </p>
      <p>
        For assistance when using Bzz products, please feel free to contact us via email: <a href="mailto:support@bzz.social">support@bzz.social</a>.
      </p>
    </div>
  );
}

export default Support;
