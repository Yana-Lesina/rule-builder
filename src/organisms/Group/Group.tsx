import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, Stack, styled, Typography } from '@mui/material';
import { Filter } from 'molecules/Filter/Filter';
import { useState } from 'react';
import { NODE_TYPE, type FilterNode, type GroupNode } from 'types/general';
import { Actions } from 'molecules/Actions/Actions';
import { AccessGuard } from 'atoms/AccessGuard/AccessGuard';
import { ToggleView } from 'atoms/ToggleButton/ToggleButton';
import { LOGIC_TYPE_COLORS } from 'consts/colors';

interface GroupProps {
  childConfig: FilterNode | GroupNode | null;
}

const StyledGroupContainer = styled(Stack)(() => ({
  flexDirection: 'column',
  spacing: 3,
  minWidth: '40vw',
  borderRadius: '1rem',
  padding: '10px 20px',
  marginTop: 2,
}));

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
      <StyledGroupContainer key={childConfig.id} sx={{ border: `2px solid ${LOGIC_TYPE_COLORS[childConfig.logic_type]}` }}>
        <Stack direction="row" gap={2} mb={2}>
          <Stack>
            <IconButton onClick={handleCollapse}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
          </Stack>
          <Stack direction="row" gap={3} alignItems="center">
            <Typography variant="h6">{childConfig.name}</Typography>
            <ToggleView value={childConfig.logic_type}></ToggleView>
          </Stack>
        </Stack>
        <Collapse in={open} unmountOnExit>
          {childConfig.children.map((child) => (
            <Group key={child.id} childConfig={child} />
          ))}
          <AccessGuard haveAccessRights={!(childConfig.locked ?? childConfig.disabled)}>
            {<Actions parentId={childConfig.id} />}
          </AccessGuard>
        </Collapse>
      </StyledGroupContainer>
    );
  }

  return <Actions parentId={'root'} />;
};
