import { Stack } from '@mui/material';
import { AddFilterAction } from '../AddFilterAction/AddFilterAction';
import { AddGroupAction } from '../AddGroupAction/AddGroupAction';

interface ActionButtonsBlockProps {
  parentId: string;
}

export const Actions = ({ parentId }: ActionButtonsBlockProps) => {
  return (
    <Stack direction="row" gap={2}>
      <AddFilterAction parentId={parentId} />
      <AddGroupAction parentId={parentId} />
    </Stack>
  );
};
