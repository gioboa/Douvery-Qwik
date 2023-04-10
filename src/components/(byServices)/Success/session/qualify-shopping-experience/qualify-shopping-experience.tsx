import {
  Resource,
  component$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './qualify-shopping-experience.css?inline';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { TextCL } from '~/components/use/textCL/textCL';
import { urlServerLocal } from '~/services/fechProduct';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DouveryArrowUp } from '~/components/icons/arrow-up';

export const useQualifyExperience = globalAction$(
  async ({ qualify }, { fail, headers, cookie, url }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);
    const ordrId = url.searchParams.get('order') || '';
    const data = await fetch(
      `${urlServerLocal}/api/calification-purchase-shop`,
      {
        method: 'POST',
        headers: {
          'x-auth-token': user.token,
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({
          qualify: qualify,
          orderId: ordrId,
        }),
      }
    );

    const dataAccess = await data.json();

    if (!data.ok || !dataAccess) {
      const errorMessage = 'Something went wrong. Please try again later.';
      console.error('Error:', errorMessage); // log the error to the console for debugging
      return fail(400, {
        message: errorMessage,
      });
    }

    const query = url.searchParams.get('rr') || '';
    headers.set('location', query);
  },
  zod$({
    qualify: z
      .string({
        required_error: 'Qualify is required',
      })
      .min(1, {
        message: 'Upps! Your qualify is too short',
      })
      .max(50, {
        message: 'upps! Your qualify is too long',
      }),
  })
);
export const QualifyShoppingExperience = component$(
  ({ orderInfoResource, statepr }: any) => {
    useStylesScoped$(styles);
    const submitted = useStore({
      setSubmitted: false,
    });
    const conten = useStore({
      setCont: true,
    });
    const state = useStore({
      select: '',
    });
    const options = [
      'Increíblemente rápido',
      'Velocidad aceptable',
      'Un poco lento, pero manejable',
      'Demasiado lento, necesita mejorar',
    ];
    const action = useQualifyExperience();

    return (
      <div class="container-all">
        {submitted.setSubmitted && <>Pepepe</>}
        {action.isRunning ? (
          submitted.setSubmitted == true
        ) : (
          <span class="error ">{action.value?.message}</span>
        )}
        <Resource
          value={orderInfoResource}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <div class="container-title">
              {statepr?.order?.userCalification
                ?.userQualifyExperiencePurchase ? (
                <p>¡Gracias por calificar tu experiencia de compra!</p>
              ) : (
                <>
                  <div class="container-exper">
                    <p>Califica tu experiencia de compra</p>
                    <button
                      class="container-view-conten"
                      onClick$={() => (conten.setCont = !conten.setCont)}
                    >
                      {conten.setCont ? (
                        <>
                          <DouveryArrowUp size="15" /> Ocultar contenido
                        </>
                      ) : (
                        <>
                          <DouveryArrowDown size="15" /> Ver contenido
                        </>
                      )}
                    </button>
                  </div>
                  {conten.setCont && (
                    <Form action={action}>
                      <div class="options">
                        {' '}
                        {options.map((item: any, i: any) => {
                          return (
                            <label key={i} class="option">
                              <input
                                type="radio"
                                name="qualify"
                                id={`qualify ${i}`}
                                value={item}
                                onChange$={() => {
                                  state.select = item;
                                }}
                              />
                              <span>
                                <TextCL text={item} />
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      <button class="container-send-form">Enviar</button>
                    </Form>
                  )}
                </>
              )}
            </div>
          )}
        />
      </div>
    );
  }
);
