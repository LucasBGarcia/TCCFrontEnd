import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

function Cliente(ONOpen, ISOpen, ONClose) {


    let { isOpen, onOpen, onClose } = useDisclosure()
    isOpen = ISOpen
    onOpen = ONOpen
    onClose = ONClose

    return (
        <>

            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </>
    )
}
export default Cliente