import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './header.css?inline';

import { DouveryUser } from '../icons/user';
import { DouveryCart } from '../icons/cart';
import { DouveryLogo105X40PX } from '../icons/logo105X40';
import { fetchSuggestions } from '~/services/fechProduct';
import { IconsSearch } from '../icons/search';
<<<<<<< HEAD
import { fetchUser } from '~/services/auth/token/token';

=======
>>>>>>> master
interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export default component$(({ is }: any) => {
  useStylesScoped$(styles);

  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });

  useTask$(async ({ track }) => {
    const searchInput = track(() => state.searchInput);

    if (!searchInput) {
      state.searchResults = [];
      return;
    }

    const controller = new AbortController();
    state.searchResults = await fetchSuggestions(state.searchInput, controller);

    return () => {
      controller.abort();
    };
  });

<<<<<<< HEAD
  const data = fetchUser(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2YyNGNjMjI1MGQzMjhkNmFhMGE3OSIsImlhdCI6MTY3Nzk1MjA5N30.fwXsnqRTJtoe3DM90usCFXoOx9_GJmHRc_CzvwxWAII'
  );
  const name = data;
  console.log(name);
=======
>>>>>>> master
  return (
    <header>
      <div class="container container-cajas-header ">
        <div class="cajas">
          <a href="/" class="logo" aria-label="Douvery">
            <DouveryLogo105X40PX />
          </a>
        </div>

        <div class="cajas">
          <div class="search">
            <form class="searchTerm">
              <div class="select container">
                <select>
                  <option class="texts-opts-crt-gg" value="1">
                    All
                  </option>
                  <option class="texts-opts-crt-gg" value="2">
                    No JS
                  </option>
                  <option class="texts-opts-crt-gg" value="3">
                    Nice!
                  </option>
                </select>
              </div>
              <input
                type="text"
                class="searchTerm"
                placeholder="Busca tus futuros productos aquí ..."
                onClick$={() => (is.setIsOpen = true)}
                onInput$={(ev) =>
                  (state.searchInput = (ev.target as HTMLInputElement).value)
                }
              />
              {is.setIsOpen && (
                <>
                  <div class="suggestions">
                    {state.searchResults?.length ? (
                      <ul>
                        {state.searchResults.map((suggestion) => {
                          return (
                            <div class="crrtrSrers">
                              {' '}
                              <IconsSearch />
                              <li
                                class="lis-sgrs"
                                onClick$={() =>
                                  (state.selectedValue = suggestion)
                                }
                              >
                                {suggestion}
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}

              <button
                aria-label="button-search"
                name="button-search"
                type="submit"
                id="button-search"
                class="searchButton"
              >
                <div class="searc">
                  {' '}
                  <IconsSearch />
                </div>
              </button>
            </form>
          </div>
        </div>
        <div class="cajas">
          <div class="main">
            <a href="/cart" class="user">
              <DouveryCart />
              <div class="badget-circle">1</div>
            </a>
            <DouveryUser />
            <div class="cuenta_botom">
              <a class="title-desplg" href="/signin">
                <span class="wl-hi">¡Hola! </span>
<<<<<<< HEAD
                <h4 class="pointer">{name}</h4>
=======
                <h4 class="pointer">Registrate</h4>
>>>>>>> master
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
