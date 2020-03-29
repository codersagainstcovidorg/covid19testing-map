import React from 'react';
import AssistantIcon from '@material-ui/icons/Assistant';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';

const ActionButtonContainer = styled(Fab)`
  cursor: pointer;
`;

type ActionButtonProps = {
  onClick: () => void;
};

const ActionButton = (props: ActionButtonProps) => {
  const { onClick } = props;
  return (
    <ActionButtonContainer
      color="primary"
      aria-label="guide"
      size="medium"
      onClick={onClick}
    >
      <AssistantIcon />
    </ActionButtonContainer>
  );
};

export default ActionButton;
