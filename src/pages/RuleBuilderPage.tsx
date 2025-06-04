import { Typography } from '@mui/material';
import { Group } from 'organisms/Group/Group';
import { useStore } from 'store/useStore';
import { Actions } from 'molecules/Actions/Actions';

const RuleBuilderPage = () => {
  const ruleConfig = useStore((store) => store.rule);

  const renderContent = ruleConfig.child ? <Group childConfig={ruleConfig.child} /> : <Actions parentId={'root'} />;

  return (
    <>
      <Typography variant={'h5'}>{ruleConfig.name}</Typography>
      {renderContent}
    </>
  );
};

export default RuleBuilderPage;
