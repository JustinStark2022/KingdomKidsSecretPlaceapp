import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Bible from "./pages/Bible";
import Prayer from "./pages/Prayer";
import Devotionals from "./pages/Devotionals";
import Lessons from "./pages/Lessons";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/bible" component={Bible} />
              <Route path="/prayer" component={Prayer} />
              <Route path="/devotionals" component={Devotionals} />
              <Route path="/lessons" component={Lessons} />
              <Route path="/monitoring" component={Monitoring} />
              <Route path="/settings" component={Settings} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
