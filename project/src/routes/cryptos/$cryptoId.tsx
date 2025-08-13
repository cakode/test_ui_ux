import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cryptos/$cryptoId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    //throw new Error();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      cryptoId: params.cryptoId,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>
});

function RouteComponent() {
  const { cryptoId } = Route.useLoaderData();
  return <div>Hello {cryptoId}!</div>
}
