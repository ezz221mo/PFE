import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AnimatedCursor } from "@/components/shared/AnimatedCursor";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { BackToTop } from "@/components/shared/BackToTop";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <AnimatedCursor />
        <Navbar />
        <main className="min-h-screen flex flex-col">
          <Router />
        </main>
        <Footer />
        <BackToTop />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
