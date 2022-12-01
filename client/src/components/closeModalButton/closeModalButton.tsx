import React from 'react';
import { IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { FieldValues } from 'react-hook-form';
import { SxProps } from '@mui/material/styles';

interface CloseModalButtonProps extends FieldValues {
  action: () => void;
  styles?: SxProps;
}

export function CloseModalButton(props: CloseModalButtonProps) {
  const { action, styles, ...rest } = props;

  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={action}
      sx={{ position: 'absolute', zIndex: 1000, top: '35px', right: '30px', ...styles }}
      {...rest}>
      <CloseOutlinedIcon fontSize="medium" />
    </IconButton>
  );
}
