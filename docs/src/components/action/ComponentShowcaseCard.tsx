import * as React from 'react';
import { alpha } from '@u_ui/u-ui/styles';
import Stack from '@u_ui/u-ui/Stack';
import Card from '@u_ui/u-ui/Card';
import CardMedia from '@u_ui/u-ui/CardMedia';
import Typography from '@u_ui/u-ui/Typography';
import Chip from '@u_ui/u-ui/Chip';
import { Link } from '@vandlee/docs/Link';

interface ComponentShowcaseCardProps {
  imgLoading?: 'eager';
  link: string;
  md1?: React.ReactNode;
  md2?: React.ReactNode;
  md3?: React.ReactNode;
  name: string;
  noGuidelines?: React.ReactNode;
  srcDark: string;
  srcLight: string;
}

export default function ComponentShowcaseCard(props: ComponentShowcaseCardProps) {
  const { link, srcLight, srcDark, name, md1, md2, md3, noGuidelines, imgLoading = 'lazy' } = props;
  // Fix overloading with prefetch={false}, only prefetch on hover.
  return (
    <Card
      component={Link}
      noLinkStyle
      prefetch={false}
      variant="outlined"
      href={link}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        borderColor: 'divider',
        ...theme.applyDarkStyles({
          backgroundColor: `${alpha(theme.palette.primaryDark[700], 0.1)}`,
          borderColor: 'primaryDark.700',
        }),
      })}
    >
      <CardMedia
        component="img"
        alt=""
        loading={imgLoading}
        image={srcLight}
        sx={(theme) => ({
          aspectRatio: '16 / 9',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          ...theme.applyDarkStyles({
            content: `url(${srcDark})`,
            background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
            borderColor: 'primaryDark.700',
          }),
        })}
      />
      <Stack direction="row" sx={{ justifyContent: 'space-between', px: 2, py: 1.5 }}>
        <Typography component="h2" variant="body2" sx={{ fontWeight: 'semiBold' }}>
          {name}
        </Typography>
        <Stack direction="row" spacing={0.5} useFlexGap>
          {md1 && <Chip label="MD1" size="small" variant="outlined" color="primary" />}
          {md2 && <Chip label="MD2" size="small" variant="outlined" color="primary" />}
          {md3 && <Chip label="MD3" size="small" variant="outlined" color="success" />}
          {noGuidelines && (
            <Chip label="No guidelines" size="small" variant="outlined" color="info" />
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
