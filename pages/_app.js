import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-5">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
