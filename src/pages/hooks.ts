import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { dom } from "shared/lib";

export const useResetScrollAtEveryPage = () => {
    const location = useLocation();
    const prev = useRef<string>();

    const historyHandler = (location: ReturnType<typeof useLocation>) => {
        if (prev.current !== location.pathname) {
            dom.scrollToTop();
        }

        prev.current = location.pathname;
    }

    useEffect(() => {
        historyHandler(location);
    }, [location]);
};
