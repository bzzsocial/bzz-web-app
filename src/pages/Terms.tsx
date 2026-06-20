import { Component, onMount } from 'solid-js';
import styles from './Terms.module.scss';


const Terms: Component = () => {

  onMount(() => {
    const container = document.querySelector('#root');
    container && container.setAttribute('style', 'background-color: black');
  })

  return (
    <div class={styles.terms} >
      <h1>
        Bzz Terms of Service
      </h1>
      <p>
        Last updated: February 19, 2024
      </p>
      <p>
        This Agreement is between you and Primal Systems Inc., an Ontario corporation (“Bzz”, “we”, “us”, or “our”), pertaining to your use of Bzz’s applications and services, including but not limited to the Bzz web app (collectively referred to as “Services”). This Agreement constitutes a binding obligation between you and Bzz. Services are provided by Bzz, including our affiliates, as applicable. By using our Services, you agree to be bound by this Agreement, the Acceptable Use Policy, and any additional provisions and conditions provided to you for your use of Services (collectively, the “Policies”), which may include terms and conditions from third parties. If you don’t agree to all the stated terms, you may not use our Services.
      </p>
      <p>
        We will periodically revise and update this Agreement and post the updated version to Bzz’s Website, as further described in Section 7 (Changes to Agreement or Services).
      </p>

      <section>
        <h2>
          1. Acceptable Use Policy
        </h2>

        <section>
          <h3>1.1 Eligibility and Account Creation.</h3>
          By using our Services, you represent and warrant that you are at least 18 years of age and may legally agree to this Agreement. Bzz assumes no responsibility or liability for any misrepresentation of your age.
        </section>

        <section>
          <h3>1.2 Your Account Rights and Responsibilities.</h3>
          When creating an account via Bzz, you will be assigned a cryptographic key pair, consisting of your private key (starting with “nsec”), and your public key (starting with “npub”). Your private key grants you full and exclusive control over your account on the public Nostr network. Your responsibility is to keep your private key secret and safely stored. Bzz assumes no responsibility or liability for lost or stolen keys. Bzz does not have access to your private key and has no ability to restore it if you lose it. You have the right to use your Nostr account on third party services by logging in via your private key. If you wish to do so, you may completely abandon using Bzz and continue using your Nostr account on third party services. As a sovereign owner of your Nostr account, you don’t require Bzz’s permission nor cooperation to use your Nostr account as you deem fit.
        </section>

        <section>
          <h3>1.3 Content ownership.</h3>
          You retain all your ownership rights to the content you create. However, by submitting content to Bzz, you hereby grant Primal Systems Inc. a worldwide, non-exclusive, royalty-free, sublicensable and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content in connection with our Services and Bzz's (and its successors' and affiliates') business.
        </section>

        <section>
          <h3>1.4 Prohibited content.</h3>
          You agree not to use our Services to create, upload, post, send, store, or share any content that is illegal, infringing, fraudulent, harmful, threatening, abusive, hateful, harassing, defamatory, obscene, or invasive of another's privacy. Such content includes, but is not limited to, content that is harmful to minors, pornographic material, violent images, hate speech, discriminatory content, and content that promotes terrorism or other criminal activities.
        </section>

        <section>
          <h3>1.5 Prohibited conduct.</h3>
          You agree not to use our Services to engage in any conduct that harasses others, impersonates others, is intended to intimidate, or threaten others, or is intended to promote or incite violence.
        </section>

        <section>
          <h3>1.6 Media storage limits for the Free Tier.</h3>
          If you are using our Services at no cost to you via the Free Tier, you are allowed to upload media files (images and videos) up to the storage and file size limit for Free Tier accounts, as specified on Bzz’s Website. Exceeding the specified limit means that your older media will be deleted to make room for the new files you are uploading. Bzz may change the Free Tier storage and file size limits at any time. This service is provided on a best effort basis. Bzz makes no warranties whatsoever that any media stored via the Free Tier will be preserved for any length of time.
        </section>
      </section>

      <section>
        <h2>
          2. Privacy Notice
        </h2>

        <section>
          Please refer to the "Bzz Privacy Policy", available at www.bzz.social/privacy, for information on how we collect, use, and disclose information, including your personal information. You acknowledge and agree that through your use of the Services, you consent to the collection, use, and disclosure of your information as set forth in the Privacy Policy. In providing the personal information of any individual (other than yourself) that may receive transactions from you as part of your use of the Services, you agree that you have obtained consent from such individual to disclose their personal information to us, as well as their consent to our collection, use, storage, and disclosure of such personal information, in the manner and for the purposes set out in our Privacy Policy.
        </section>
      </section>

      <section>
        <h2>
          3. Cancellation, Suspension, or Termination of Services
        </h2>

        <section>
          <h3>3.1 Account Cancellation.</h3>
          We may, in our sole discretion and without any cost or liability to you, with or without prior notice and at any time, suspend, modify, or terminate, temporarily or permanently, all or any portion of our Services, establish certain transaction limits or trading limits, or terminate your Account, with or without reason, including, if we reasonably believe: (i) you create risk or possible legal exposure for us; (ii) our provision of the Services to you is no longer commercially viable; or (iii) you breached any terms of this Agreement.
        </section>

        <section>
          <h3>3.2 Account Suspension.</h3>
          We have the right to immediately cause your Account to be suspended, and the funds and assets in your Account may be frozen if: (i) we suspect, in our sole discretion, your Account to be in violation of this Agreement or our Anti-Money Laundering program; (ii) we are required to do so by a government or regulatory authority, applicable law, court order, or a facially valid subpoena; (iii) your Account has a negative balance; (iv) a transfer to your Account was returned to your Bank Account; (v) we believe there is unusual activity in your Account or that you are using your Credentials or your Account in an unauthorized or inappropriate manner; or (vi) if you have not accessed your Account in more than two years. Your Account will remain suspended and funds and assets in your Account will remain frozen until a determination is made in the investigation by Bzz, at which point Bzz may determine to terminate your Account.
        </section>
      </section>

      <section>
        <h2>
          4. Disclaimer of Warranty
        </h2>

        <p>
          You acknowledge that our Services are provided on an "as is" and "as available" basis without any warranty of any kind, express or implied. We make no guarantees that our Services will be error-free or run without interruptions, and we do not make any warranty regarding the quality, accuracy, reliability, or suitability of our Services for any particular purpose.
        </p>
      </section>

      <section>
        <h2>
          5. Indemnity
        </h2>

        <p>
          You will indemnify and hold harmless Bzz and its affiliates, and their respective officers, directors, employees, and agents, from and against any claims, disputes, demands, liabilities, damages, losses, and costs and expenses (including, without limitation reasonable legal and accounting fees) arising out of or in any way connected with (a) your improper or unauthorized access to or use of the Services; and (b) your violation of this Agreement.
        </p>
      </section>

      <section>
        <h2>
          6. Limitations of Liability
        </h2>

        <section>
          <h3>6.1 CONSEQUENTIAL DAMAGES WAIVER.</h3>
          NOTWITHSTANDING ANY OTHER SECTION OF THIS AGREEMENT, NEITHER BZZ, ITS AFFILIATES, THIRD-PARTY SERVICE PROVIDERS, NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST REVENUES, TRADING LOSSES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR FROM THE USE OF OR INABILITY TO USE THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT BZZ, ITS AFFILIATES, OR ANY OTHER PARTY HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
        </section>

        <section>
          <h3>6.2 LIABILITY CAP.</h3>
          NOTWITHSTANDING ANY OTHER SECTION OF THIS AGREEMENT, IN NO EVENT WILL BZZ'S AND ITS AFFILIATES' TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR FROM THE USE OF OR INABILITY TO USE THE SERVICES EXCEED ONE HUNDRED U.S. DOLLARS ($100).
        </section>

        <section>
          <h3>6.3 BASIS OF BARGAIN AND FAILURE OF ESSENTIAL PURPOSE.</h3>
          THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN BZZ AND YOU. THE WAIVERS AND LIMITATIONS IN THIS SECTION 6 APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WILL SURVIVE AND APPLY EVEN IF ANY LIMITED REMEDY IN THESE TERMS FAILS OF ITS ESSENTIAL PURPOSE.
        </section>
      </section>

      <section>
        <h2>
          7. Changes to Agreement or Services
        </h2>

        <p>
          We may update this Agreement at any time at our sole discretion. If we do so, we will deliver a notice by posting the updated Agreement to Bzz’s Website at www.bzz.social/terms, and potentially through other communication(s) deemed appropriate by us. Accordingly, it is important that you review this Agreement on Bzz’s Website regularly for updates, including when you use the Services. If you continue to use the Services after we have posted an updated Agreement, you are agreeing to be bound by the updated Agreement. If you do not agree to be bound by the updated Agreement, then you may not use the Services anymore. As our Services evolve, we may change or discontinue all or any part of the Services, at any time and without notice, at our sole discretion.
        </p>
      </section>

      <section>
        <h2>
          8. Governing Law
        </h2>

        <p>
          This Agreement shall be governed by and in accordance with the laws of Ontario, Canada.
        </p>
      </section>

      <section>
        <h2>
          9. Acceptance of Terms
        </h2>

        <p>
          By using our Services, you signify your acceptance of this Agreement. If you do not agree to the terms of this Agreement, you may not use our Services.
        </p>
      </section>

      <section>
        <h2>
          10. Contact Information
        </h2>

        <p>
          If you have any questions regarding this Agreement, you may contact us at support@bzz.social.
        </p>
      </section>
    </div>
  );
}

export default Terms;
