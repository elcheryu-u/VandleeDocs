import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useTheme, styled, alpha } from '@u_ui/u-ui/styles';
import IconButton from '@u_ui/u-ui/IconButton';
import Fade from '@u_ui/u-ui/Fade';
import YuButton from '@u_ui/u-ui/Button';
import Box from '@u_ui/u-ui/Box';
import YuToggleButton from '@u_ui/u-ui/ToggleButton';
import YuToggleButtonGroup, { toggleButtonGroupClasses } from '@u_ui/u-ui/ToggleButtonGroup';
import SvgIcon from '@u_ui/u-ui/SvgIcon';

import Menu from '@u_ui/u-ui/Menu';
import YuMenuItem, { menuItemClasses } from '@u_ui/u-ui/MenuItem';
import Tooltip from '@u_ui/u-ui/Tooltip';
import Divider from '@u_ui/u-ui/Divider';
import { useRouter } from 'next/router';
import { CODE_VARIANTS, CODE_STYLING } from 'docs/src/modules/constants';
import { useSetCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { useSetCodeStyling, useCodeStyling } from 'docs/src/modules/utils/codeStylingSolution';
import { useTranslate } from '@vandlee/docs/i18n';
import stylingSolutionMapping from 'docs/src/modules/utils/stylingSolutionMapping';
import codeSandbox from '../sandbox/CodeSandbox';
import stackBlitz from '../sandbox/StackBlitz';
import { ExpandMoreRounded, CenterFocusWeak, RefreshRounded, MoreVert } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

const Root = styled('div')(({ theme }) => [
  {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    '& .uiIconButton-root, .uiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
      },
    },
    '& .uiSvgIcon-root, & .MuiSvgIcon-root': {
      fontSize: 16,
      color: (theme.vars || theme).palette.grey[900],
    },
  },
  theme.applyDarkStyles({
    '& .uiIconButton-root, .uiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    '& .uiSvgIcon-root, & .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

function DemoTooltip(props) {
  return (
    <Tooltip
      slotProps={{
        popper: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        },
      }}
      {...props}
    />
  );
}

const alwaysTrue = () => true;

const ToggleButtonGroup = styled(YuToggleButtonGroup)(({ theme }) => [
  theme.unstable_sx({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      '&:not(:first-of-type)': {
        pr: '2px',
      },
      '&:not(:last-of-type)': {
        pl: '2px'
      }
    }
  })
]);

const Button = styled(YuButton)(({ theme }) => ({
  height: 26,
  padding: '7px 8px 8px 8px',
  flexShrink: 0,
  borderRadius: 999,
  border: '1px solid',
  borderColor: alpha(theme.palette.grey[200], 0.8),
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.primary[600],
  '& .uiSvgIcon-root, & .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
    borderColor: theme.palette.primary[200],
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  ...theme.applyDarkStyles({
    color: theme.palette.primary[300],
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '& .uiSvgIcon-root, & .MuiSvgIcon-root': {
      color: theme.palette.primary[300],
    },
    '&:hover': {
      borderColor: alpha(theme.palette.primary[300], 0.5),
      backgroundColor: alpha(theme.palette.primary[500], 0.2),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  }),
}));

const MenuItem = styled(YuMenuItem)(({ theme }) => ({
  padding: theme.spacing(1),
  [`& .${menuItemClasses.selected}`]: {
    backgroundColor: theme.palette.primary[50],
  },
}));

const ToggleButton = styled(YuToggleButton)(({ theme }) => [
  theme.unstable_sx({
    height: 26,
    width: 38,
    p: 0,
    fontSize: theme.typography.pxToRem(13),
    borderRadius: '999px',
    '&.ui-disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
  }),
]);

/**
 * @param {React.Ref<HTMLElement>[]} controlRefs
 * @param {object} [options]
 * @param {(index: number) => boolean} [options.isFocusableControl] In case certain controls become unfocusable
 * @param {number} [options.defaultActiveIndex]
 */
function useToolbar(controlRefs, options = {}) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options;
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex);

  // TODO: do we need to do this during layout practically? It's technically
  // a bit too late since we allow user interaction between layout and passive effects
  React.useEffect(() => {
    setActiveControlIndex((currentActiveControlIndex) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex;
      }
      return currentActiveControlIndex;
    });
  }, [defaultActiveIndex, isFocusableControl]);

  // controlRefs.findIndex(controlRef => controlRef.current = element)
  function findControlIndex(element) {
  }

  function handleControlFocus(event) {
  }

  let handleToolbarFocus;
  if (process.env.NODE_ENV !== 'production') {
    handleToolbarFocus = (event) => {
    };
  }

  const { direction } = useTheme();

  function handleToolbarKeyDown(event) {
  }

  function getControlProps(index) {
  }

  return {
    getControlProps,
    toolbarProps: {
      // TODO: good opportunity to warn on missing `aria-label`
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar',
    },
  };
}

export default function DemoToolbar(props) {
  const {
    codeOpen,
    codeVariant,
    copyButtonOnClick,
    copyIcon,
    hasNonSystemDemos,
    demo,
    demoData,
    demoId,
    demoName,
    demoOptions,
    demoSourceId,
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props;

  const setCodeVariant = useSetCodeVariant();
  const styleSolution = useCodeStyling();
  const setCodeStyling = useSetCodeStyling();
  const t = useTranslate();

  const hasTSVariant = demo.rawTS;
  const renderedCodeVariant = () =>  {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }

    if (codeVariant === CODE_VARIANTS.HTML) {
      return CODE_VARIANTS.HTML;
    }

    return CODE_VARIANTS.JS;
  };

  const handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if (clickedCodeVariant !== null && codeVariant !== clickedCodeVariant) {
      setCodeVariant(clickedCodeVariant);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const createHandleCodeSourceLink = (anchor, codeVariantParam, stylingSolution) => async () => {
    try {
      await copy(
        `${window.location.href.split('#')[0]}#${
          stylingSolution ? `${stylingSolutionMapping[stylingSolution]}-` : ''
        }${anchor}${codeVariantParam === CODE_VARIANTS.TS ? '.tsx' : '.js'}`,
      );
      setSnackbarMessage(t('copiedSourceLink'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const handleResetFocusClick = () => {
    initialFocusRef.current.focusVisible();
  }

  let showCodeLabel;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const controlRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];
  // if the code is not open we hide the language controls
  const isFocusableControl = React.useCallback(
    (index) => (codeOpen ? true : index !== 1 && index !== 2),
    [codeOpen],
  );

  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 0,
    isFocusableControl,
  });
  
  const devMenuItems = [];
  if (process.env.DEPLOY_ENV === 'staging' || process.env.DEPLOY_ENV === 'pull-request') {
    /* eslint-disable material-ui/no-hardcoded-labels -- staging only */
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- valid reason to disable rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env never changes
    const router = useRouter();

    if (process.env.PULL_REQUEST_ID) {
      devMenuItems.push(
        <MenuItem
          key="link-deploy-preview"
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="link-deploy-preview"
          component="a"
          href={`https://deploy-preview-${process.env.PULL_REQUEST_ID}--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          demo on PR #{process.env.PULL_REQUEST_ID}
        </MenuItem>,
      );
    }

    devMenuItems.push(
      <MenuItem
        key="link-next"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="link-next"
        component="a"
        href={`https://next--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>next</code>
      </MenuItem>,
      <MenuItem
        key="permalink"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="permalink"
        component="a"
        href={`${process.env.NETLIFY_DEPLOY_URL}${router.route}#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo permalink
      </MenuItem>,
      <MenuItem
        key="link-master"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="link-master"
        component="a"
        href={`https://master--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>master</code>
      </MenuItem>,
    );
    /* eslint-enable material-ui/no-hardcoded-labels */
  }
  
  const [stylingAnchorEl, setStylingAnchorEl] = React.useState(null);
  const stylingMenuOpen = Boolean(stylingAnchorEl);
  
  const handleStylingButtonClose = () => {
    setStylingAnchorEl(null);
  };

  const handleStylingSolutionChange = (eventStylingSolution) => {
    if (eventStylingSolution !== null && eventStylingSolution !== styleSolution) {
      setCodeStyling(eventStylingSolution);
    }
    handleStylingButtonClose();
  };

  const codeStylingLabels = {
    [CODE_STYLING.SYSTEM]: t('demoStylingSelectSystem'),
    [CODE_STYLING.TAILWIND]: t('demoStylingSelectTailwind'),
    [CODE_STYLING.CSS]: t('demoStylingSelectCSS'),
  };

  const handleStylingButtonClick = (event) => {
    setStylingAnchorEl(event.currentTarget);
  };

  return (
    <React.Fragment>
      <Root aria-label={t('demoToolbarLabel')} {...toolbarProps}>
        {hasNonSystemDemos && (
          <Button>
            <ExpandMoreRounded />
          </Button>
        )}
        <Fade in={codeOpen}>
          <Box sx={{ display: 'flex' }}>
            {hasNonSystemDemos && (
              <Divider orientation='vertical' variant='middle' sx={{ mx: 1, height: '24px' }} />
            )}
              {demoData.codeVariant !== CODE_VARIANTS.HTML &&
                <ToggleButtonGroup
                  sx={{ margin: '8px 0' }}
                  exclusive
                  value={renderedCodeVariant()}
                  onChange={handleCodeLanguageClick}
                >
                  <ToggleButton
                    value={CODE_VARIANTS.JS}
                    aria-label={t('showJSSource')}
                    data-ga-event-category="demo"
                    data-ga-event-action="source-js"
                    data-ga-event-label={demo.gaLabel}
                    {...getControlProps(1)}
                    // eslint-disable-next-line material-ui/no-hardcoded-labels
                  >
                    JS
                  </ToggleButton>
                  <ToggleButton
                    value={CODE_VARIANTS.TS}
                    disabled={!hasTSVariant}
                    aria-label={t('showTSSource')}
                    data-ga-event-category="demo"
                    data-ga-event-action="source-ts"
                    data-ga-event-label={demo.gaLabel}
                    {...getControlProps(2)}
                    // eslint-disable-next-line material-ui/no-hardcoded-labels
                  >
                    TS
                  </ToggleButton>
                </ToggleButtonGroup>
              }
          </Box>
        </Fade>
        <Box sx={{ ml: 'auto' }}>
          <Button
            aria-controls={openDemoSource ? demoSourceId : null}
            data-ga-event-category="demo"
            data-ga-event-label={demo.gaLabel}
            data-ga-event-action="expand"
            onClick={onCodeOpenChange}
            {...getControlProps(3)}
            sx={{ mr: 0.5 }}
          >
            {showCodeLabel}
          </Button>
          {demoOptions.hideEditButton ? null : (
            <React.Fragment>
              <DemoTooltip title={t('stackblitz')} placement="bottom">
                <IconButton
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="stackblitz"
                  onClick={() => stackBlitz.createReactApp(demoData).openSandbox()}
                  {...getControlProps(4)}
                  sx={{ borderRadius: 1 }}
                >
                  <SvgIcon viewBox="0 0 19 28">
                    <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
              <DemoTooltip title={t('codesandbox')} placement="bottom">
                <IconButton
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="codesandbox"
                  onClick={() => codeSandbox.createReactApp(demoData).openSandbox()}
                  {...getControlProps(5)}
                  sx={{ borderRadius: 1 }}
                >
                  <SvgIcon viewBox="0 0 1024 1024">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
            </React.Fragment>
          )}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="copy"
              onClick={copyButtonOnClick}
              {...getControlProps(6)}
              sx={{ borderRadius: 1 }}
            >
              {copyIcon}
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetFocus')} placement="bottom">
            <IconButton
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset-focus"
              onClick={handleResetFocusClick}
              {...getControlProps(7)}
              sx={{ borderRadius: 1 }}
            >
              <CenterFocusWeak />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetDemo')} placement="bottom">
            <IconButton
              aria-controls={demoId}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset"
              onClick={onResetDemoClick}
              {...getControlProps(8)}
              sx={{ borderRadius: 1 }}
            >
              <RefreshRounded />
            </IconButton>
          </DemoTooltip>
          <IconButton
            onClick={handleMoreClick}
            aria-label={t('seeMore')}
            aria-owns={anchorEl ? 'demo-menu-more' : undefined}
            aria-haspopup="true"
            {...getControlProps(9)}
            sx={{ borderRadius: 1 }}
          >
            <MoreVert />
          </IconButton>
        </Box>
      </Root>
      <Menu
        id="demo-styling-menu"
        anchorEl={stylingAnchorEl}
        open={stylingMenuOpen}
        onClose={handleStylingButtonClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          value={CODE_STYLING.SYSTEM}
          data-ga-event-category="demo"
          data-ga-event-action="styling-system"
          data-ga-event-label={demo.gaLabel}
          selected={styleSolution === CODE_STYLING.SYSTEM}
          onClick={() => handleStylingSolutionChange(CODE_STYLING.SYSTEM)}
        >
          {codeStylingLabels[CODE_STYLING.SYSTEM]}
          {styleSolution === CODE_STYLING.SYSTEM && (
            <Check sx={{ fontSize: '0.85rem', ml: 'auto' }} />
          )}
        </MenuItem>
        <MenuItem
          value={CODE_STYLING.TAILWIND}
          data-ga-event-category="demo"
          data-ga-event-action="styling-tailwind"
          data-ga-event-label={demo.gaLabel}
          selected={styleSolution === CODE_STYLING.TAILWIND}
          onClick={() => handleStylingSolutionChange(CODE_STYLING.TAILWIND)}
        >
          {codeStylingLabels[CODE_STYLING.TAILWIND]}
          {styleSolution === CODE_STYLING.TAILWIND && (
            <Check sx={{ fontSize: '0.85rem', ml: 'auto' }} />
          )}
        </MenuItem>
        <MenuItem
          value={CODE_STYLING.CSS}
          data-ga-event-category="demo"
          data-ga-event-action="styling-css"
          data-ga-event-label={demo.gaLabel}
          selected={styleSolution === CODE_STYLING.CSS}
          onClick={() => handleStylingSolutionChange(CODE_STYLING.CSS)}
        >
          {codeStylingLabels[CODE_STYLING.CSS]}
          {styleSolution === CODE_STYLING.CSS && (
            <Check sx={{ fontSize: '0.85rem', ml: 'auto' }} />
          )}
        </MenuItem>
      </Menu>
      <Menu
        id="demo-menu-more"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="github"
          component="a"
          href={demoData.githubLocation}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          {t('viewGitHub')}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-js-source-link"
          onClick={createHandleCodeSourceLink(demoName, CODE_VARIANTS.JS, styleSolution)}
        >
          {t('copySourceLinkJS')}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-ts-source-link"
          onClick={createHandleCodeSourceLink(demoName, CODE_VARIANTS.TS, styleSolution)}
        >
          {t('copySourceLinkTS')}
        </MenuItem>
        {devMenuItems}
      </Menu>
    </React.Fragment>
  );
}

DemoToolbar.propTypes = {
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  copyButtonOnClick: PropTypes.func.isRequired,
  copyIcon: PropTypes.object.isRequired,
  demo: PropTypes.object.isRequired,
  demoData: PropTypes.object.isRequired,
  demoId: PropTypes.string,
  demoName: PropTypes.string.isRequired,
  demoOptions: PropTypes.object.isRequired,
  demoSourceId: PropTypes.string,
  hasNonSystemDemos: PropTypes.string,
  initialFocusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  onCodeOpenChange: PropTypes.func.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  openDemoSource: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired,
};
