import React, { useState, useCallback, useContext, createContext } from 'react';
import { Loading } from '../_components/Loading';

const LoadingContext = createContext({
    loading: false,
    setLoading: (isLoading: boolean) => { },
});

export const useLoading = () => {
    return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }: any) => {
    const [loading, setLoadingState] = useState(false);

    const setLoading = useCallback((isLoading: boolean) => {
        setLoadingState(isLoading);
    }, []);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading ? <Loading /> : children}
        </LoadingContext.Provider>
    );
};
