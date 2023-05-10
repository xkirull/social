import {
    useSelector,
    type TypedUseSelectorHook,
    useDispatch,
} from 'react-redux'

// @ts-expect-error
export const useAppDispatch = useDispatch<AppDispatch>

// @ts-expect-error
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
