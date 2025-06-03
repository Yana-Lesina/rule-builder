import { Dialog, styled, type DialogProps } from '@mui/material';
import { cloneElement, useState, type ReactElement } from 'react';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '40vw',
    minHeight: '65vh',
    borderRadius: '1rem',
    padding: '2rem 1rem',
  },

  // '& .MuiDialogContent-root': {
  //   // paddingTop: '2rem 1.5rem',
  // },
}));

interface ModalDialogProps extends Partial<DialogProps> {
  trigger?: ReactElement;
}

export const ModalDialog = ({ trigger, ...props }: ModalDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const triggerWithHandler = trigger
    ? cloneElement(trigger, {
        onClick: () => {
          handleOpen();
        },
      })
    : null;

  return (
    <>
      {triggerWithHandler}
      <StyledDialog open={isOpen} onClose={handleClose} onSubmit={handleClose}>
        {props.children}
      </StyledDialog>
    </>
  );
};
