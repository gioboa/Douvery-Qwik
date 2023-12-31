import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './alert-1.css?inline';
export const Alert1 = component$(({ text, ttlHrf, hrf }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="inform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="#111827"
            d="M28 6H8c-1.2 0-2 .8-2 2v14c0 1.2.8 2 2 2h8v-2H8V8h20v14h-7.2L16 28.8l1.6 1.2l4.2-6H28c1.2 0 2-.8 2-2V8c0-1.2-.8-2-2-2z"
          />
          <path
            fill="#111827"
            d="M4 18H2V5c0-1.7 1.3-3 3-3h13v2H5c-.6 0-1 .4-1 1v13z"
          />
        </svg>
        <p>{text}</p>
      </div>
      <div class="show-more">
        <a href={hrf}>{ttlHrf}</a>
      </div>
    </div>
  );
});
