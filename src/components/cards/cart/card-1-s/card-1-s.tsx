import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-1-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { UseProductDetailsLink } from '~/services/fuction';
export const Card1SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
         <a href={UseProductDetailsLink(product)}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>{' '}
          {product.price > 998 ? (
            <div class="ctr-free-shipping">
              <p>
                <DouveryCheckMark size="15px" /> Disponible
              </p>
              <div class="ctr-opa">|</div>
              <p>
                {' '}
                <DouveryCheckMark size="15px" />
                Free shipping
              </p>
            </div>
          ) : (
            <div class="ctr-free-shipping">
              <p>
                <DouveryCheckMark size="15px" /> Disponible
              </p>
            </div>
          )}
          {product.realQuantity >= 5 ? (
            <></>
          ) : (
            <div class="alert-art">
              <p>¡Queda(n) muy pocos , 5 o menos!</p>
            </div>
          )}
          <div class="product-price">
            {product.discount > 0 ? (
              <>
                {' '}
                <UsePrice price={discoun} />
                <div class="ctr-opa">|</div>
                <div class="price-t  tach">
                  {' '}
                  <UsePrice price={product.price} />
                </div>
              </>
            ) : (
              <>
                <UsePrice price={product.price} />
              </>
            )}{' '}
          </div>
          <div class="checkbox-wrapper-42">
            <input
              key={product.dui}
              type="checkbox"
              id={'isPrimary' + product.dui}
              name="isPrimary"
            />
            <label class="cbx" for={'isPrimary' + product.dui}></label>
            <label class="lbl" for={'isPrimary' + product.dui}>
              Seleccionar como regalo.{' '}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});
