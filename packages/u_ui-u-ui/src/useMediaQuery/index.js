import { unstable_createUseMediaQuery } from '@u_ui/system/useMediaQuery';
import THEME_ID from '../styles/identifier';

const useMediaQuery = unstable_createUseMediaQuery({ themeId: THEME_ID });

export default useMediaQuery;