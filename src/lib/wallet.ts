import { Event } from "nostr-tools";
import { APP_ID, relayWorker } from "../App";
import { logInfo } from "./logger";
import { decrypt } from "./nostrAPI";

export type NWCConfig = {
  pubkey: string,
  relays: string[],
  secret: string,
  lud16?: string,
};

export const decodeNWCUri = (uri: string) => {
  // Uri format:
  // nostr+walletconnect://[pubkey]?relay=[relay]&secret=[secret]&lud16=[lud16]

  const url = decodeURIComponent(uri);
  const pIndex = url.indexOf('://');

  const protocol = url.slice(0, pIndex);
  const address = url.slice(pIndex+3)

  let res: NWCConfig = {
    pubkey: '',
    relays: [],
    secret: '',
  };

  if (protocol !== 'nostr+walletconnect') return res;

  const [pubkey, query] = address.split('?');

  res.pubkey = pubkey;

  const searchParams = new URLSearchParams(query);

  for (const param of searchParams.entries()) {
    if (param[0] === 'relay') {
      res.relays.push(param[1]);
      continue;
    }

    if (param[0] === 'secret') {
      res.secret = param[1];
      continue;
    }

    if (param[0] === 'lud16') {
      res.lud16 = param[1];
      continue;
    }
  }

  return res;
};

export const sendNWCInfoEvent = async (nwcConfig: NWCConfig) => {
  relayWorker.onmessage = (e: MessageEvent<{ event: Event }>) => {
    logInfo('GOT EVENT: ', e);
  };

  relayWorker.postMessage({ type: 'NWC_INFO', nwcData: { nwcConfig }})
};
