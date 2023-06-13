import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './css/container-combined-by-seller.css?inline';
import { CtnrCardImageOnly } from '~/components/cards/product-img-only/product-img-only';
import { DouveryAdd } from '~/components/icons/add';
import { ContainerCombinedAGG } from './container-combined-agg';
import { DouveryEqual } from '~/components/icons/equal';
import { fetchProductSubCategory } from '~/services/fechProduct';
import type { Product } from '~/utils/types';

export const ContainerCombinedBySeller = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const state = useStore({
    productResults: [] as Product[],
  });
  const totalPrice = useStore({
    setTotalPrice: 0,
  });
  const totalDiscount = useStore({
    setTotalDiscount: 0,
  });
  const totalAll = useStore({
    setTotalAl: 0,
  });
  const discount = 10;

  const productReducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => product.dui);
    const controller = new AbortController();
    const subCategory = product.subCategory;
    const dui = product.dui;
    const result = await fetchProductSubCategory(subCategory, dui);
    state.productResults = result;
    let total = 0;
    for (let i = 0; i < state.productResults.length; i++) {
      total += state.productResults[i].price;
    }
    totalPrice.setTotalPrice = total;

    const totalD = 0;
    for (let i = 0; i < state.productResults.length; i++) {
      total += state.productResults[i].discount;
    }
    totalDiscount.setTotalDiscount = totalD;

    const totalP =
      totalPrice.setTotalPrice - (totalPrice.setTotalPrice * discount) / 100;

    totalAll.setTotalAl = totalP;

    cleanup(() => controller.abort());

    return result;
  });

  return (
    <div class="crrts-csrtos">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Combinaciones por el vendedor</hs-sr3>
          <div class="srs-v">
            <a href="/" class="ps-sr1">
              Saber mas
            </a>
          </div>
        </div>

        <p class="ps-sr1">Ahorra dinero al comprar en conjunto</p>
        <div class="srs-md">
          <a class="ps-sr1">Saber mas</a>
        </div>
      </div>

      <div class="psr-sor">
        {' '}
        <div class="p-istnr">
          <>
            <CtnrCardImageOnly product={product} />
          </>
          <Resource
            value={productReducer}
            onPending={() => <div class="loader"></div>}
            onRejected={() => (
              <>
                Al parecer, hay un error en la solicitud. Por favor, actualiza
                la página para verificar nuevamente.
              </>
            )}
            onResolved={(data: any) => (
              <>
                {data.length === 0 ? (
                  <p>No hay productos para mostrar.</p>
                ) : (
                  <>
                    {' '}
                    {data.map((val: any, key: any) => (
                      <>
                        {key !== val.length - 1 && (
                          <div class="slxr">
                            <DouveryAdd />
                          </div>
                        )}
                        <CtnrCardImageOnly product={val} key={key} />
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          />

          <div class="srtr-eqs">
            {' '}
            <DouveryEqual />
          </div>
        </div>
        <div class="dirs">
          <ContainerCombinedAGG
            totalPrice={
              totalAll.setTotalAl == 0
                ? product.price - discount
                : totalAll.setTotalAl
            }
            discount={discount}
          />
        </div>
      </div>
    </div>
  );
});
