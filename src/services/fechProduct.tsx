export const urlServerLocal = 'http://localhost:9035';
export const urlServerNode = 'https://server-douvery.vercel.app';
// export const urlServerNode = 'https://server-douvery.onrender.com';
const urlServerPython = 'https://htyr.onrender.com';

export async function fetchProduct(
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/products/${dui}`,
    {
      signal: controller?.signal,
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchProductU(
  limit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `${urlServerNode}/productsByRandom/?limit=${limit}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  return results;
}

export async function fetchAllPopularProducts(
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `${urlServerNode}/api/products/all-popular-products`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  return results;
}

export async function fetchProductCategory(
  category: string,
  dui: string,
  numlimit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/productsByCategory/?category=${category}&limit=${numlimit}&excludeDui=${dui}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchProductSubCategory(
  subCategory: string,
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/productsBySubCategory/?subCategory=${subCategory}&limit=2&excludeDui=${dui}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  return results;
}

export async function fetchSuggestions(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/suggestions?q=${searchInput}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}
export async function fetchCode(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
 ${urlServerNode}/geocode?q=${searchInput}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchCodePostal(
  codepostal: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/q?code=${codepostal}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch code');
  }
  const results = await response.json();

  return results;
}

export async function fetchSystemRecomendationProductU(
  dui: string,
  numlimit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerPython}/recommend_products/${dui}?limit=${numlimit}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener recomendaciones');
  }
  const results = await response.json();

  return results;
}

export async function fetchSystemRecomendation_5lastViewedProducts(
  userId: string,
  numlimit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
  https://sytm-nn-12.onrender.com/recommend_products_based_on_last_viewed/${userId}?limit=${numlimit}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener recomendaciones');
  }
  const results = await response.json();

  return results;
}

export async function fetchIpInfo(): Promise<any> {
  const response = await fetch(
    `
  https://ipinfo.io/country?token=0d62ca75f9e230`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch code');
  }
  const results = await response.text();

  return results;
}
