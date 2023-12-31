import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import styles from './filter-product-1.css?inline';
export const Filter_Product1 = component$(({ subCategories }: any) => {
  useStylesScoped$(styles);

  const loc = useLocation();
  return (
    <>
      <div class="filter-section-body">
        <div class="scroll-container">
          <h3>Sub categories</h3>
          <div class="container-ul">
            <ul class="sub-categories-list">
              {subCategories?.map((c: any, i: number) => (
                <li class="container-sub-category" key={i}>
                  <div class="item" key={i}>
                    <DouveryRight3
                      color={
                        loc.url.searchParams.get('or-sc') === c ? '#256D85' : ''
                      }
                      size="14px"
                    />
                    <label
                      class={
                        loc.url.searchParams.get('or-sc') === c
                          ? 'active-underline'
                          : ''
                      }
                    >
                      <Link href={loc.url.pathname + `?or-sc=${c}`}>{c}</Link>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Resto del código */}
      </div>
    </>
  );
});
