import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

const StyledRow = styled(Paper)(() => ({
  backgroundColor: '#fff',
  border: '1px solid #8A8D91',
  borderRadius: '1rem',
  boxShadow: 'none',
  width: '30rem',
  minHeight: '2.5rem',
  padding: '0.1rem 1.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 5,
}));

// --------------------------------

interface RowProps {
  children: ReactNode;
}

export const Row = ({ children }: RowProps) => {
  return <StyledRow>{children}</StyledRow>;
};
