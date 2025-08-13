import fetchUrl from '@/shared/utils/fetchUrl';
import type { Cryptocurrency } from '@/types/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'

const TOP100_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const Route = createFileRoute('/cryptos/')({
  component: Cryptos,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>,
  validateSearch: (search) => {
    return {
      q: (search.q as string) || '',
    };
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q }, context: { queryClient } }) => {
    await Promise.all([
      queryClient.prefetchQuery<Cryptocurrency[]>({
        queryKey: ["cryptos", "btc"],
        queryFn: () => fetchUrl<Cryptocurrency[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin"),
      }),
      // Other prefetchQuery can be put in here
    ]);

    

    const cryptos = ["btc", "eth", "xrp"];
    return {
      cryptos: cryptos.filter((crypto) => crypto === q)
    }
  },
});

function Cryptos() {
  const { cryptos } = Route.useLoaderData();
  const { q } = Route.useSearch();

  const btcQuery = useSuspenseQuery<Cryptocurrency[]>({
    queryKey: ["cryptos", "btc"],
    queryFn: () => fetchUrl<Cryptocurrency[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin"),
  })

  const btc = btcQuery.data?.[0];

  return <div>
    {cryptos.map((crypto) => <div key={crypto}><Link to="/cryptos/$cryptoId" params={{
      cryptoId: crypto
    }}>{crypto}
    </Link>
    </div>)}
    <div>
      {btc && (
        <>
          <h2>{btc.name}</h2>
          <p>Prijs: ${btc.current_price}</p>
          <p>Marktkap: ${btc.market_cap}</p>
          <img src={btc.image} alt={btc.name} width={24} height={24} />
        </>
      )}
    </div>
  </div>
};
