import * as React from 'react';
import ButtonGroup from '@yushii/u-ui/ButtonGroup';
import Button from '@yushii/u-ui/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function LoadingButtonGroup() {
  return (
    <ButtonGroup variant="outlined" aria-label="Grupo de botones de carga">
      <Button>Enviar</Button>
      <Button>Obtener datos</Button>
      <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
        Guardar
      </Button>
    </ButtonGroup>
  );
}
