import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type LabelMapType = {
  [key: string]: {
    sidebar: string;
    card: string;
    icon: IconDefinition;
  };
};

export default LabelMapType;