import * as React from 'react';
import Chip from '@yushii/u-ui/Chip';
import Stack from '@yushii/u-ui/Stack';

export default function ClickableLinkChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Enlace cliqueable" component="a" href="#chip-básico" clickable />
      <Chip
        label="Enlace cliqueable"
        component="a"
        href="#chip-básico"
        variant="outlined"
        clickable
      />
    </Stack>
  );
}
