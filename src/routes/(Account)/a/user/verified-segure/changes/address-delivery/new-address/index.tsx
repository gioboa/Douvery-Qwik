import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  Form,
  globalAction$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerNode } from '~/services/fechProduct';

import { DouveryLeft3 } from '~/components/icons/arrow-left-3';

export const useSubmit = globalAction$(
  async (
    {
      name,
      addressLine1,
      addressLine2,
      street,
      city,
      states,
      postalCode,
      locationType,
      country,
      isPrimary,
    },
    { fail, cookie, redirect }
  ) => {
    const serverUrl = `${urlServerNode}/api/save-user-address`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        userId: user.id,
        address: {
          name: name,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          street: street,
          city: city,
          state: states,
          zip: postalCode,
          locationType: locationType,
          country: country,
          isPrimary: isPrimary == 'true' ? true : false,
        },
      }),
    });

    const response = await res.json();

    // Verificar el estado de la respuesta HTTP en lugar de 'response.ok'
    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        response.error || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }

    if (response.success) {
      setCookiesData(response.userData, cookie);
      throw redirect(302, '/a/user/verified-segure/changes/address-delivery/');
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    name: z
      .string()
      .min(4, 'Upps! Your name is too short')
      .max(15, 'upps! Your name is too long')
      .nonempty('Full name is required'),
    addressLine1: z.string().nonempty('Address line 1 is required'),
    addressLine2: z.string(),
    city: z.string().nonempty('City is required'),
    street: z.string().nonempty('Street is required'),
    states: z.string().nonempty('State/Province is required'),
    postalCode: z.string().nonempty('Postal code is required'),
    locationType: z.string().nonempty('Location type is required'),
    country: z.string().nonempty('Country is required'),
    isPrimary: z.string().default('false'),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const action = useSubmit();

  const nav = useNavigate();

  const isPrimary = useStore({ setIsPrimary: false });

  return (
    <div class="container-all">
      {' '}
      <div
        class="container-ret"
        onClick$={() =>
          nav('/a/user/verified-segure/changes/address-delivery/')
        }
      >
        <DouveryLeft3 size="15" />
        <p>Volver</p>
      </div>
      <div class="container-title">
        <div>
          <p>Create new address</p>
        </div>
      </div>
      <Form class="form" action={action}>
        <div>
          <label for="name">Nombre & Apellido</label>
          <input type="text" id="name" name="name" required />
          {action.value?.fieldErrors?.name && (
            <span class="error">{action.value?.fieldErrors?.name}</span>
          )}
          <label for="addressLine1">Dirección línea 1:</label>
          <input type="text" id="addressLine1" name="addressLine1" required />
          {action.value?.fieldErrors?.addressLine1 && (
            <span class="error">{action.value?.fieldErrors?.addressLine1}</span>
          )}
          <label for="addressLine2">Dirección línea 2 (opcional):</label>
          <input type="text" id="addressLine2" name="addressLine2" />
          <label for="street">Calle:</label>
          <input type="text" id="street" name="street" required />
          {action.value?.fieldErrors?.street && (
            <span class="error">{action.value?.fieldErrors?.street}</span>
          )}
          <label for="city">Ciudad:</label>
          <input type="text" id="city" name="city" required />

          <label for="states">Estado/Provincia:</label>
          <input type="text" id="states" name="states" required />
          {action.value?.fieldErrors?.states && (
            <span class="error">{action.value?.fieldErrors?.states}</span>
          )}
          <label for="postalCode">Código postal:</label>
          <input type="text" id="postalCode" name="postalCode" required />
          {action.value?.fieldErrors?.postalCode && (
            <span class="error">{action.value?.fieldErrors?.postalCode}</span>
          )}
          <label for="locationType">Tipo de lugar:</label>
          <select id="locationType" name="locationType" required>
            <option value="">Tipo de location</option>
            <option value="Residential">Residential</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
          {action.value?.fieldErrors?.locationType && (
            <span class="error">{action.value?.fieldErrors?.locationType}</span>
          )}
          <label for="country">País:</label>
          <select id="country" name="country" required>
            <option value={''}>Seleccionar país</option>
            <option value="us">Estados Unidos</option>
            <option value="es">España</option>
            <option value="mx">México</option>
            <option value="ar">Argentina</option>
            <option value="do">Republica Dominicana</option>
          </select>
          {action.value?.fieldErrors?.country && (
            <span class="error">{action.value?.fieldErrors?.country}</span>
          )}
        </div>
        <div class="container-send">
          <div class="container-button-send">
            <div class="checkbox-wrapper-42">
              <input
                type="checkbox"
                id="isPrimary"
                name="isPrimary"
                value={isPrimary.setIsPrimary ? 'true' : 'false'}
                onClick$={() =>
                  (isPrimary.setIsPrimary = !isPrimary.setIsPrimary)
                }
              />
              <label class="cbx" for="isPrimary"></label>
              <label class="lbl" for="isPrimary">
                Seleccionar como dirección principal.{' '}
              </label>
            </div>

            <div class="container-inputs-password">
              {action.value?.message && (
                <div>
                  {' '}
                  <br />
                  {action.isRunning ? (
                    <span class="loa-s">Verifying...</span>
                  ) : (
                    <span class="error ">{action.value?.message}</span>
                  )}
                  <div class="form-group need-account">
                    ¿Crees que presenta un error al crear?
                    <a href="/a/" class="forgot-new-account-link">
                      Reportar
                    </a>
                  </div>{' '}
                  <br />
                </div>
              )}
              {action.isRunning && (
                <span class="error">{action.value?.fieldErrors?.country}</span>
              )}
            </div>
            <button type="submit" class="button-address-new">
              {action.isRunning
                ? 'Loading...'
                : action.value?.message
                ? 'Error'
                : 'Create address'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
});
