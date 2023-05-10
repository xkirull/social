import React, { Suspense } from "react";
import { Location } from "history";
import { BrowserRouter, useLocation, useNavigate, Location as RouterLocation } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

type TRouteAdapter = React.FunctionComponent<{
    children: React.FunctionComponent<{
        history: {
            replace(location: Location): void;
            push(location: Location): void;
        },
        location: RouterLocation 
    }>;
}>;

const RouteAdapter: TRouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location: Location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        navigate(location, { replace: false, state: location.state });
      },
    }), [navigate],
  );
  
  if (!children) {
    return null;
  }

  return children({ history: adaptedHistory, location: routerLocation });
};

const withRouter = (component: () => React.ReactNode) => () => {
    return (
        <BrowserRouter>
            <Suspense>
                <QueryParamProvider adapter={RouteAdapter as unknown as React.FunctionComponent}>{component()}</QueryParamProvider>
            </Suspense>
        </BrowserRouter>
    );
}

export default withRouter;
