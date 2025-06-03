import { Button, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
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
      <Stack direction="row" spacing={3} alignItems="left">
        <Typography variant="body1">{field}</Typography>
        <Typography variant="body1">{operator}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Stack>
      <AccessGuard haveAccessRights={!(disabled ?? locked)}>
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
