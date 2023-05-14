import React, {useState, ReactNode, useEffect} from 'react';
import {Box, ScrollView, Modal} from 'native-base';

export const SelectModal = ({
  text,
  showModal,
  children,
}: {
  children: ReactNode;
  text: string;
  showModal: boolean;
}) => {
  const [showModalChildren, setShowModalChildren] = useState(showModal);

  useEffect(() => {
    setShowModalChildren(showModal);
  }, [showModal]);

  return (
    <Modal
      isOpen={showModalChildren}
      onClose={() => setShowModalChildren(!showModal)}
      size={'full'}>
      <Modal.Content w={'90%'} padding={5}>
        <Modal.CloseButton />
        <Modal.Header w={'90%'}>{text}</Modal.Header>
        <Modal.Body maxHeight={200}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box>{children}</Box>
          </ScrollView>
          <Box />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
