import fetchUrl from "@/shared/utils/fetchUrl";
import { QueryClient, QueryClientProvider, useQuery, type QueryKey } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

/*export const Route = createFileRoute('/')({
    component: Index,
    loader: async ({context: {queryClient}}) => {
        await queryClient.prefetchQuery({
            queryKey
        })
    }
});*/

const Index = () => {
    return (
        <div>

        </div>
    );
};