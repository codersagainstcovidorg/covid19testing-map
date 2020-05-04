import * as React from 'react';
import LegalModal from './LegalModal';
import RedirectModal from './RedirectModal';

type ModalType = 'none' | 'legal' | 'redirect';

const urls = ['communitiesagainstcovid.com', 'pruebadecovid.com'];

export default function Interstitial() {
  const [modalType, setModalType] = React.useState<ModalType>('none');
  const openLegalModal = React.useCallback(() => {
    setModalType('legal');
  }, []);

  React.useEffect(() => {
    // const { referrer } = document;
    // TEMP for testing:
    const referrer = 'https://www.communitiesagainstcovid.com';
    const showRedirectModal: boolean = urls.reduce(
      (prev: boolean, curr: string): boolean => prev || referrer.includes(curr),
      false
    );

    if (showRedirectModal) {
      setModalType('redirect');
    } else {
      setModalType('legal');
    }
  }, []);

  switch (modalType) {
    case 'legal': {
      return <LegalModal />;
    }
    case 'redirect': {
      return <RedirectModal onClose={openLegalModal} />;
    }
    default: {
      return null;
    }
  }
}
