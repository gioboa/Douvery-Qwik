// Component imports
import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

// Styles import
import styles from './view1.css?inline';
import { ExtraButtonContainer } from '../../container-hrs-butros';
import { ImageDetailContainer } from '../../container-views-images-details';
import { DetailContainer } from '../../container-datails';
import { ProductNameHeaderContainer } from '../../container-header-name-brands-product';
import { VariationsDetailContainer } from '../../container-variantions-details';
import { ButtonDetailContainer } from '../../container-button-details';
import { BookDescriptionContainer } from '../../crtr-description-gpt';
import { ShortDescriptionContainer } from '../../container-desc-short';
import { ExtendedCardDouvery } from '~/components/cards/douveryExtend/card-douveryExtend-1/douveryExtend1';
import { LikeButtons } from '../../components/buttons-I-like/button-I-like';
import { SponsoredProductContainer } from '../VIEW 2/components/container-sponsore-vert';
import { useLocation } from '@builder.io/qwik-city';
import { DetailPriceContainerVert } from './components/DetailPriceContainerVert/DetailPriceContainerVert';

import { HashProductDetailsPriceRightTop } from '~/services/hash/hash';

// Main component
export const View1 = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const img = useStore({ setImage: props.images[0] });
  const isOpen = useStore({ setIsOpen: false });

  useTask$(async ({ track }) => {
    track(() => props.images[0]);
    img.setImage = props.images[0];
  });

  const quantityCart = useStore({ setQuantityCart: '1' });
  const loc = useLocation();
  // const view = loc.url.searchParams.get('ss_v');
  const DetailView = <DetailContainer isOpen={isOpen} props={props} />;
  //   view === HashProductDetailsPriceTopCenter || view === null ? (
  //     <DetailContainer isOpen={isOpen} props={props} />
  //   ) : (
  //     ''
  //   );

  const showZoom = useSignal(false);
  const position = useStore({ setPosition: { x: 0, y: 0 } });
  const handleMouseOver = $((e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posición x del ratón relativa a la imagen
    const y = e.clientY - rect.top; // Posición y del ratón relativa a la imagen
    position.setPosition = { x, y };
    showZoom.value = true;
  });

  const handleMouseMove = $((e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    position.setPosition = { x, y };
  });

  const handleMouseOut = $(() => {
    showZoom.value = false;
  });
  return (
    <div>
      <ProductView
        loc={loc}
        props={props}
        img={img}
        quantityCart={quantityCart}
        isOpen={isOpen}
        DetailView={DetailView}
        handleMouseOver={handleMouseOver}
        handleMouseMove={handleMouseMove}
        handleMouseOut={handleMouseOut}
        showZoom={showZoom}
        position={position}
      />

      <ExtraButtonContainer props={props} />
    </div>
  );
});

// Subcomponents
const ProductView = ({
  loc,
  props,
  img,
  quantityCart,
  isOpen,
  DetailView,
  handleMouseOver,
  handleMouseMove,
  handleMouseOut,
  showZoom,
  position,
}: any) => (
  <div class="container-view-product">
    <div class="vert-left">
      <ImageDetailContainer
        handleMouseOver={handleMouseOver}
        handleMouseMove={handleMouseMove}
        handleMouseOut={handleMouseOut}
        showZoom={showZoom}
        position={position}
        props={props}
        img={img}
        isOpen={isOpen}
      />
    </div>

    <div class="center">
      <ProductCenter
        props={props}
        loc={loc}
        img={img}
        quantityCart={quantityCart}
        isOpen={isOpen}
        DetailView={DetailView}
        showZoom={showZoom}
        position={position}
      />
    </div>

    <div class="vert-right">
      <ProductRight loc={loc} props={props} />
    </div>
  </div>
);

const ProductCenter = ({
  props,
  // loc,
  img,
  quantityCart,
  // isOpen,
  DetailView,
  showZoom,
  position,
}: any) => {
  // const view = loc.url.searchParams.get('ss_v');

  // const DetailViewHoriz =
  //   view === HashProductDetailsPriceCenter ? (
  //     <div class="detail-view-horiz2">
  //       <DetailPriceContainerHoriz2 isOpen={isOpen} props={props} />
  //     </div>
  //   ) : (
  //     ''
  //   );
  return (
    <div class="crtr-div-ifrms-aetr">
      {showZoom.value && (
        <div class="zoom_box">
          <img
            width={300}
            height={300}
            src={img.setImage}
            class="zoomed_image"
            style={{
              transform: `translate(-${position.setPosition.x}px, -${position.setPosition.y}px)`,
            }}
          />
        </div>
      )}
      <size-w class="size-w-10" />
      <ProductNameHeaderContainer props={props} />
      {DetailView}
      {props.variations !== 0 && (
        <div class="crt-variations">
          <VariationsDetailContainer
            imgS={img}
            imgP={props.images[0]}
            props={props}
          />
        </div>
      )}

      <div class="buttons-mobiles">
        <div class="brt-irft">
          <div class="slect-qty-prt">
            <p>Cantidad : </p>
            <size-w class="size-w-10" />
            <QuantitySelector quantityCart={quantityCart} />
          </div>
        </div>
        <ButtonDetailContainer
          product={props}
          quantity={quantityCart.setQuantityCart}
        />
      </div>

      <Description props={props} />
    </div>
  );
};

const QuantitySelector = ({ quantityCart }: any) => (
  <select
    value={quantityCart.setQuantityCart}
    onChange$={(event) => (quantityCart.setQuantityCart = event.target.value)}
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
);

const Description = ({ props }: any) =>
  props.category == 'Books' ? (
    <BookDescriptionContainer props={props} />
  ) : (
    <div class="crtr-desrt">
      <ShortDescriptionContainer props={props} />
    </div>
  );

const ProductRight = ({ props, loc }: any) => {
  const view = loc.url.searchParams.get('ss_v');
  const DetailView =
    view === HashProductDetailsPriceRightTop ? (
      <DetailPriceContainerVert props={props} />
    ) : (
      ''
    );

  return (
    <div class="ctr-extend-d">
      {DetailView}
      <ExtendedCardDouvery />
      <div class="separator-border" />
      <div class="title-subtitle">
        <p class="ps-sr1">Mejora tus recomendaciones</p>
      </div>
      <div class="review-product">
        <LikeButtons product={props} />
      </div>
      <div class="separator-border" />
      <SponsoredProductContainer product={props} />
    </div>
  );
};
