import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import style from './carousel-all-interest.css?inline';
import type { Product } from '~/utils/types';
import { fetchProductU } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';
import { useLocation } from '@builder.io/qwik-city';
import { Carousel2 } from '~/components/use/carousel/carousel-2/carousel-2';
export const Promotion_CarouselAllInterest = component$(
  ({ styleNumber }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      productResults: [] as Product[],
    });
    const loc = useLocation();

    useTask$(async ({ track }) => {
      track(() => loc);

      const controller = new AbortController();
      state.productResults = await fetchProductU(25);

      return () => {
        controller.abort();
      };
    });

    const randomNumber = randomNum();
    return (
      <div class="ctnr-view-5" key={randomNumber}>
        {' '}
        <div class="content-carousel">
          <Carousel2
            key={randomNumber}
            styleCard={styleNumber || randomNumber}
            product={state.productResults}
          />
          <br />
        </div>
      </div>
    );
  }
);