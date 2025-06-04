import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { LOGIC_TYPE_COLORS } from 'consts/colors';
import { _logicTypes } from 'mock-data/forms';

interface ToggleButtonProps {
  value: string;
}

export const ToggleView = ({ value }: ToggleButtonProps) => {
  return (
    <ToggleButtonGroup value={value} exclusive disabled aria-label="text alignment" size="small">
      {_logicTypes.map((logicType) => {
        return (
          <ToggleButton
            key={logicType.id}
            value={logicType.label}
            aria-label={logicType.label}
            sx={{
              '&.Mui-selected': {
                backgroundColor: LOGIC_TYPE_COLORS[logicType.label],
              },
            }}
          >
            {logicType.label}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
