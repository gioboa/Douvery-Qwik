import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './css/crtr-description.css?inline';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
export const ContainerDescription = component$(
  ({ product, limitChara }: any) => {
    useStylesScoped$(styles);
    const showText = useStore({ setShowText: false });

    useTask$(async ({ track }) => {
      track(() => product.description);

      showText.setShowText = false;
    });

    const text = product.description;
    const limit = limitChara ? limitChara : 350;

    return (
      <div class="crrtr-srtrt">
        <strong class="hs-sr1">Descripcion</strong>
        <div class="descr">
          <p class="ps-sr1">
            {showText.setShowText
              ? text
              : text.slice(0, limit) + (text.length > limit ? '...' : '')}
          </p>

          {text.length > limit && (
            <button
              onClick$={() => (showText.setShowText = !showText.setShowText)}
            >
              {showText.setShowText ? (
                <srw-sr1>
                  <DouveryArrowUp size="15" /> Ver menos
                </srw-sr1>
              ) : (
                <srw-sr1>
                  <DouveryArrowDown size="15" /> Ver más
                </srw-sr1>
              )}
            </button>
          )}

          <srw></srw>
        </div>
      </div>
    );
  }
);
