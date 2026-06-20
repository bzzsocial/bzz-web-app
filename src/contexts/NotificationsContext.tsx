import { createStore } from "solid-js/store";
import { Kind } from "../constants";
import {
  createContext,
  createEffect,
  onCleanup,
  useContext
} from "solid-js";
import {
  isConnected,
  readData,
  refreshSocketListeners,
  removeSocketListeners,
  socket,
  subsTo
} from "../sockets";
import {
  ContextChildren,
  NostrEOSE,
  NostrEvent,
  NostrEventContent,
  NostrEvents,
} from "../types/primal";
import { APP_ID } from "../App";
import { getLastSeen, subscribeToNotificationStats, unsubscribeToNotificationStats } from "../lib/notifications";
import { timeNow } from "../utils";
import { useAppContext } from "./AppContext";
import { accountStore, hasPublicKey } from "../stores/accountStore";

export type NotificationsContextStore = {
  notificationCount: number,
  actions: {
    resetNotificationCounter: () => void,
  }
}

export const initialData = {
  notificationCount: 0,
};

export let notifSince = timeNow();

export const setNotifSince = (val: number) => {
  notifSince = val;
}

export const NotificationsContext = createContext<NotificationsContextStore>();

export const NotificationsProvider = (props: { children: ContextChildren }) => {
  const app = useAppContext();

  let notifSubscribed = '|';

  const notfiStatsSubId = () => `notif_stats_${notifSubscribed}_${APP_ID}`;

// ACTIONS --------------------------------------

  const subToNotificationStats = () => {

    if (notifSubscribed !== accountStore.publicKey) {
      unsubscribeToNotificationStats(notfiStatsSubId());
      notifSubscribed = '';
    }

    if (!accountStore.publicKey) return;

    notifSubscribed = accountStore.publicKey;
    subscribeToNotificationStats(accountStore.publicKey, notfiStatsSubId());
  }

  const resetNotificationCounter = () => updateStore('notificationCount', () => 0);

// SOCKET HANDLERS ------------------------------

  const handleNotifStatsEvent = (content: NostrEventContent) => {
    if (content?.kind === Kind.NotificationStats) {
      const sum = Object.keys(content).reduce((acc, key) => {
        if (key === 'pubkey' || key == 'kind') {
          return acc;
        }

        // @ts-ignore
        return acc + content[key];
      }, 0);

      if (sum !== store.notificationCount) {
        updateStore('notificationCount', () => sum)
      }

    }
  }
  const onMessage = async (event: MessageEvent) => {
    const data = await readData(event);
    const message: NostrEvent | NostrEOSE | NostrEvents = JSON.parse(data);

    const [type, subId, content] = message;

    if (subId === notfiStatsSubId()) {
      if (type === 'EVENTS') {
        for (let i=0;i<content.length;i++) {
          const e = content[i];
          handleNotifStatsEvent(e);
        }

      }
      if (type === 'EVENT') {
        handleNotifStatsEvent(content);
      }
    }
  };

  const onSocketClose = (closeEvent: CloseEvent) => {
    const webSocket = closeEvent.target as WebSocket;

    removeSocketListeners(
      webSocket,
      { message: onMessage, close: onSocketClose },
    );
  };

// EFFECTS --------------------------------------

  createEffect(() => {
    if (isConnected() && accountStore.isKeyLookupDone && hasPublicKey() && !app?.isInactive) {
      subToNotificationStats();
    } else {
      unsubscribeToNotificationStats(notfiStatsSubId());
    }
  });

  createEffect(() => {
    if (isConnected()) {
      refreshSocketListeners(
        socket(),
        { message: onMessage, close: onSocketClose },
      );
    }
  });


  createEffect(() => {
    const pk = accountStore.publicKey;

    if (pk) {
      const subid = `notif_ls_${APP_ID}`

      const unsub = subsTo(subid, {
        onEvent: (_, content) => {
          if (content?.kind === Kind.Timestamp) {

            const timestamp = parseInt(content.content);

            if (!isNaN(timestamp)) {
              setNotifSince(timestamp);
            }

            unsub();
            return;
          }
        },
        onEose: () => {
          if (!notifSince) {
            setNotifSince(0);
          }
        },
      });

      getLastSeen(pk as string, subid);
      return;
    }

    updateStore('notificationCount', () => 0);
  });

  onCleanup(() => {
    removeSocketListeners(
      socket(),
      { message: onMessage, close: onSocketClose },
    );
  });

// STORES ---------------------------------------


  const [store, updateStore] = createStore<NotificationsContextStore>({
    ...initialData,
    actions: {
      resetNotificationCounter,
    },
  });

// RENDER ---------------------------------------

  return (
    <NotificationsContext.Provider value={store}>
      {props.children}
    </NotificationsContext.Provider>
  );
}

export const useNotificationsContext = () => useContext(NotificationsContext);
