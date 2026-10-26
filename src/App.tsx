import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LinktreePage from "@/pages/LinktreePage";
import ImagesPage from "@/pages/images";
import VenueInfoPage from "@/pages/EPK";
import ThankYouPage from "@/pages/ThankYou";
import { useEffect } from "react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/testing" component={Home} />
	  <Route path="/info" component={VenueInfoPage} />
      <Route path="/links" component={LinktreePage} />
      <Route path="/images" component={ImagesPage} />
      <Route path="/fotos" component={ImagesPage} />
      <Route path="/thankyou" component={ThankYouPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <div className="min-h-[100dvh] flex flex-col bg-background text-foreground relative">
            <div className="noise-overlay" />
            <main className="flex-1">
              <Router />
            </main>
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
