import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

import type { RootState, AppDispatch } from './appStore'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
