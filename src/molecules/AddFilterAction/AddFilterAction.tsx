import { DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ModalDialog } from 'atoms/ModalDialog/ModalDialog';
import { nanoid } from 'nanoid';
import { useStore } from 'store/useStore';
import { NODE_TYPE, type FilterNode } from 'types/general';
import { FilterForm } from '../FilterForm/FilterForm';

interface AddFilterActionProps {
  parentId: string;
}

export const AddFilterAction = ({ parentId }: AddFilterActionProps) => {
  const addInstance = useStore((store) => store.addInstance);

  const handleAddFilter = (filterConfig: FilterNode) => {
    addInstance(parentId, {
      ...filterConfig,
      id: nanoid(),
      type: NODE_TYPE.FILTER,
    });
  };

  return (
    <ModalDialog trigger={<Button>Add Filter</Button>}>
      <DialogTitle>Add filter</DialogTitle>
      <DialogContent>
        <FilterForm
          id="add-filter-form"
          onSubmit={(data) => {
            handleAddFilter(data);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="add-filter-form">
          Save
        </Button>
      </DialogActions>
    </ModalDialog>
  );
};
