import * as React from 'react';
import Chip from '@yushii/u-ui/Chip';
import Stack from '@yushii/u-ui/Stack';
import FaceIcon from '@mui/icons-material/Face';

export default function IconChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip icon={<FaceIcon />} label="Con Icono" />
      <Chip icon={<FaceIcon />} label="Con Icono" variant="outlined" />
    </Stack>
  );
}
