import { Button, DialogActions, DialogContent, DialogTitle, IconButton, Stack, styled, Typography } from '@mui/material';
import { Row } from 'atoms/Row/Row';
import type { FilterNode } from 'types/general';
import EditIcon from '@mui/icons-material/Edit';
import { ModalDialog } from 'atoms/ModalDialog/ModalDialog';
import { FilterForm } from '../FilterForm/FilterForm';
import { useStore } from 'store/useStore';
import { AccessGuard } from 'atoms/AccessGuard/AccessGuard';

interface FilterProps {
  props: FilterNode;
}

const StyledFilterContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: 15,
  alignItems: 'left',
}));

export const Filter = ({ props }: FilterProps) => {
  const updateFilter = useStore((store) => store.updateFilter);

  const { id, field, operator, value, disabled, locked } = props;

  const triggerOpenButton = (
    <IconButton size="small">
      <EditIcon />
    </IconButton>
  );

  return (
    <Row>
      <StyledFilterContainer>
        <Typography variant="body1">{field}</Typography>
        <Typography variant="body1">{operator}</Typography>
        <Typography variant="body1">{value}</Typography>
      </StyledFilterContainer>
      <AccessGuard haveAccessRights={!(disabled || locked)}>
        <ModalDialog trigger={triggerOpenButton}>
          <DialogTitle>Edit filter</DialogTitle>
          <DialogContent>
            <FilterForm id="edit-filter-form" values={{ field, operator, value }} onSubmit={(data) => updateFilter(id, data)} />
          </DialogContent>
          <DialogActions>
            <Button type="submit" form="edit-filter-form">
              Save
            </Button>
          </DialogActions>
        </ModalDialog>
      </AccessGuard>
    </Row>
  );
};
