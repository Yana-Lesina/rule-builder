import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, Stack } from '@mui/material';
import { Filter } from 'molecules/Filter/Filter';
import { useState } from 'react';
import { NODE_TYPE, type FilterNode, type GroupNode } from 'types/general';
import { Actions } from 'molecules/Actions/Actions';
import { AccessGuard } from 'atoms/AccessGuard/AccessGuard';

interface GroupProps {
  childConfig: FilterNode | GroupNode | null;
}

export const Group = ({ childConfig }: GroupProps) => {
  const [open, setOpen] = useState(true);

  const handleCollapse = () => {
    setOpen(!open);
  };

  if (!childConfig?.children && childConfig?.type === NODE_TYPE.FILTER) {
    return <Filter key={childConfig.id} props={childConfig} />;
  }

  if (childConfig?.children && childConfig.type === NODE_TYPE.GROUP) {
    return (
      <Stack
        key={childConfig.id}
        sx={{
          border: '1px solid #8A8D91',
          borderRadius: '1rem',
          padding: '10px 20px',
          mt: 2,
        }}
        direction="column"
        spacing={3}
      >
        <Stack direction="row" gap={2}>
          <IconButton onClick={handleCollapse}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
          {childConfig.name}
        </Stack>
        <Collapse in={open} unmountOnExit>
          {childConfig.children.map((child) => (
            <Group key={child.id} childConfig={child} />
          ))}
          <AccessGuard haveAccessRights={!(childConfig.locked ?? childConfig.disabled)}>
            {<Actions parentId={childConfig.id} />}
          </AccessGuard>
        </Collapse>
      </Stack>
    );
  }

  return <Actions parentId={'root'} />;
};
