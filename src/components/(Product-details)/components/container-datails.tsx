import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-datails.css?inline';

import { ButtonDetailContainer } from './container-button-details';

import numeral from 'numeral';

export const DetailContainer = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const quantityCart = useStore({ setQuantityCart: '1' });

  //*CALCULAR EL DESCUENTO
  const discount = (props.price * props.discount) / 100;
  const price_discount = props.price - discount;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locateCurrency = 'US';
  const formCurrency = '$0,0.00';

  return (
    <>
      <div class="super-container">
        <div class="container-NavAggPayProduct-table-mobiles">
          <div class="price-table-mobiles">
            <h5 class="title-prtsea">
              <>Precio :</>
            </h5>
            <size-w class="size-w-10" />
            <h4 class="font-price-mobiles">
              {' '}
              {props.discount === 0 ? (
                <>{numeral(props.price).format(formCurrency)}</>
              ) : (
                <>{numeral(price_discount).format(formCurrency)}</>
              )}
            </h4>
          </div>
          {props.discount === 0 ? (
            <>
              {' '}
              <div class="shw-free">Envio gratis</div>
            </>
          ) : (
            <>
              <div class="price-descount-table-mobiles">
                <div class="ctr-porce-mobiles">
                  <h6 class="porce-mobiles  ">
                    -%
                    {props.discount}
                    SAVE {numeral(discount).format(formCurrency)}
                  </h6>
                </div>
              </div>
            </>
          )}
        </div>

        <div class="container-NavAggPayProduct-web">
          <div class="session_price">
            <div class="titles-of">Precio :</div>
            <size-w class="size-w-10" />{' '}
            <h4 class="font-price ">
              {props.discount === 0 ? (
                <>{numeral(props.price).format(formCurrency)}</>
              ) : (
                <div>{numeral(price_discount).format(formCurrency)}</div>
              )}
            </h4>{' '}
            <size-w class="size-w-10" />
            {props.discount === 0 ? (
              ''
            ) : (
              <>
                <div class="ctr-p-s">
                  {' '}
                  <div
                    class={
                      props.discount < 20 ? 'ctr-porce' : 'ctr-porce ctr-p-red '
                    }
                  >
                    <h6 class="porce  ">
                      -%
                      {props.discount}
                      {/* {props.discount < 20 ? (
                        ''
                      ) : (
                        <> SAVE {numeral(discount).format(formCurrency)}</>
                      )} */}
                    </h6>
                  </div>
                </div>
                <size-w class="size-w-10" />
                <size-w class="size-w-10" />
                <div class="titles-of"> Antes: </div>
                <size-w class="size-w-10" />{' '}
                <h5 class="tach price-tach ">
                  {' '}
                  {numeral(props.price).format(formCurrency)}
                </h5>
                <size-w class="size-w-10" />
              </>
            )}
            <size-w class="size-w-10" />
            <size-w class="size-w-10" />
            <size-w class="size-w-10" />
          </div>
          <div class="session_buttons">
            {props.quantity <= 1 ? (
              <div class="no-stock">
                <div class="circle"></div>
                <h5 class="title-prtsea">Articulo agotado</h5>
              </div>
            ) : (
              <div class="content_qty">
                <span>Qty:</span>
                <div class="div-input-sertts">
                  <div class="select-input-cart">
                    <select
                      value={quantityCart.setQuantityCart}
                      onChange$={(event) =>
                        (quantityCart.setQuantityCart = event.target.value)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div class="div-button">
              {' '}
              <ButtonDetailContainer
                product={props}
                quantity={quantityCart.setQuantityCart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
