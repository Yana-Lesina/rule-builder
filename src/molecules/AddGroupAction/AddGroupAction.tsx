import { DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ModalDialog } from 'atoms/ModalDialog/ModalDialog';
import { nanoid } from 'nanoid';
import { useStore } from 'store/useStore';
import { NODE_TYPE, type GroupNode } from 'types/general';
import { GroupForm } from '../GroupForm/GroupForm';

interface AddGroupActionProps {
  parentId: string;
}

export const AddGroupAction = ({ parentId }: AddGroupActionProps) => {
  const addInstance = useStore((store) => store.addInstance);

  const handleAddGroup = (groupConfig: GroupNode) => {
    addInstance(parentId, {
      ...groupConfig,
      id: nanoid(),
      type: NODE_TYPE.GROUP,
    });
  };

  return (
    <ModalDialog trigger={<Button>Add Group</Button>}>
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        <GroupForm
          id="add-group-form"
          onSubmit={(data) => {
            handleAddGroup(data);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="add-group-form">
          Save
        </Button>
      </DialogActions>
    </ModalDialog>
  );
};
