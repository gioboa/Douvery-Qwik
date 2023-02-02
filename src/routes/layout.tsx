import { component$, Slot, useStore } from '@builder.io/qwik';
import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';

export default component$(() => {
  const isOpen = useStore({ setIsOpen: false });

  return (
    <>
      <main>
        <Header is={isOpen} />
        <Nav />

        <section>
          {isOpen.setIsOpen && (
            <>
              {' '}
              <div
                class="shr-srhd"
                onClick$={() => (isOpen.setIsOpen = false)}
              ></div>
            </>
          )}
          <Slot />
        </section>
      </main>
      <Footer />
    </>
  );
});
