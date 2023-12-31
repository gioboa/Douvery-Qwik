import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './DetailPriceContainerVert.css?inline';

import numeral from 'numeral';
import { ButtonDetailVerticalContainer } from '~/components/(Product-details)/components/components/buttons-cart/buttons-cart';

export const DetailPriceContainerVert = component$(({ props }: any) => {
  useStylesScoped$(styles);

  const quantityCart = useStore({ setQuantityCart: '1' });

  //*CALCULAR EL DESCUENTO
  const discount = (props.price * props.discount) / 100;
  const discountedPrice = props.price - discount;
  const currencyFormat = '$0,0.00';

  return (
    <>
      <div class="product-container">
        <div class="product-details-mobile">
          <div class="container-price-discount">
            <div class="product-price-mobile">
              <div class="price-value-mobile">
                <h4 class="price-text-mobile">
                  {' '}
                  {props.discount === 0 ? (
                    <>{numeral(props.price).format(currencyFormat)}</>
                  ) : (
                    <>{numeral(discountedPrice).format(currencyFormat)}</>
                  )}
                </h4>
              </div>
            </div>
            {props.discount === 0 ? (
              ''
            ) : (
              <>
                <h5 class="tach price-tach ">
                  {' '}
                  {numeral(props.price).format(currencyFormat)}
                </h5>
              </>
            )}
          </div>
          {props.discount === 0 ? (
            <div class="free-shipping-notice">Envio gratis</div>
          ) : (
            <div class="discount-notice-mobile">
              <div class="discount-value-mobile">
                <h6 class="discount-text-mobile">
                  -%
                  {props.discount}
                </h6>
              </div>
            </div>
          )}
        </div>
        <div class="separator-border" />

        <div class="product-details-web">
          {props.quantity <= 1 ? (
            <div class="no-stock">
              <div class="circle"></div>
              <h5 class="title-prtsea">Articulo agotado</h5>
            </div>
          ) : (
            <>
              <div class="select-container">
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
              <div class="container-buttons">
                {' '}
                <ButtonDetailVerticalContainer
                  style="vertical"
                  product={props}
                  quantity={quantityCart.setQuantityCart}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});
