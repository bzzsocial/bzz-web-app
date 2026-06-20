import { Component, createEffect, createSignal, For, onMount, Show } from 'solid-js';

import styles from './HomeSidebar.module.scss';
import { hookForDev } from '../../lib/devTools';
import { useReadsContext } from '../../contexts/ReadsContext';
import { APP_ID } from '../../App';
import { subsTo } from '../../sockets';
import { getReadsTopics } from '../../lib/feed';
import ArticleShort from '../ArticlePreview/ArticleShort';
import { A } from '@solidjs/router';
import ArticlePreviewSidebarSkeleton from '../Skeleton/ArticlePreviewSidebarSkeleton';
import ReadsFeaturedTopicsSkeleton from '../Skeleton/ReadsFeaturedTopicsSkeleton';
import { Transition } from 'solid-transition-group';

import { accountStore } from '../../stores/accountStore';


const ReadsSidebar: Component< { id?: string } > = (props) => {

  const reads= useReadsContext();

  const [isFetchingTopics, setIsFetchingTopics] = createSignal(false);


  const getTopics = () => {
    if (!reads) return;
    if (reads.topics.length > 0) return;

    const subId = `reads_topics_${APP_ID}`;


    const unsub = subsTo(subId, {
      onEvent: (_, content) => {
        const topics = JSON.parse(content.content || '[]') as string[];

        reads?.actions.setTopics(topics);
      },
      onEose: () => {
        setIsFetchingTopics(() => false);
        unsub();
      }
    })
    setIsFetchingTopics(() => true);
    getReadsTopics(subId);
  }

  onMount(() => {
    if (accountStore.isKeyLookupDone && reads?.recomendedReads.length === 0) {
      reads.actions.doSidebarSearch('');
    }

    if (accountStore.isKeyLookupDone) {
      getTopics();
    }
  });

  return (
    <div id={props.id} class={styles.readsSidebar}>
      <Show when={accountStore.isKeyLookupDone}>
        <div class={styles.headingPicks}>
          Featured Reads
        </div>

        <div class={styles.sectionTopPicks}>

        <Transition name="slide-fade">
          <Show
            when={reads && reads.topPicks.length > 0}
            fallback={
              <Show when={!reads || reads.topPicks.length === 0}>
                <div>
                  <For each={Array(3)}>
                    {() => <div class="animated"><ArticlePreviewSidebarSkeleton /></div>}
                  </For>
                </div>
              </Show>
            }
          >
            <div>
              <For
                each={reads?.topPicks}
              >
                {(note) =>
                  <div class="animated">
                    <ArticleShort article={note} />
                  </div>
                }
              </For>
            </div>
          </Show>
        </Transition>
        </div>


        <div class={styles.headingPicks}>
          Topics
        </div>

        <div class={styles.sectionTopics}>
          <Transition name="slide-fade">
            <Show
              when={reads && reads.topics.length > 0}
              fallback={
                <Show when={!reads || reads.topics.length === 0}>
                  <div class="animated">
                    <ReadsFeaturedTopicsSkeleton />
                  </div>
                </Show>
              }
            >
              <div>
                <For
                  each={reads?.topics}
                >
                  {(topic) => <A href={`/reads/${topic}`} class={styles.topic}>{topic}</A>}
                </For>
              </div>
            </Show>
          </Transition>
        </div>

      </Show>
    </div>
  );
}

export default hookForDev(ReadsSidebar);
