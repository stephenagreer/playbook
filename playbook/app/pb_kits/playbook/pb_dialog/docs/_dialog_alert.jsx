/* eslint-disable react/jsx-handler-names */
/* @flow */

import React, { useState } from "react"
import { Button, Dialog, Flex } from "../.."

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)
  return [opened, toggle]

}

const DialogAlert = () => {
  const [infoAlertOpened, toggleInfoAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [successAlertOpened, toggleSuccessAlert] = useDialog()
  const [errorAlertOpened, toggleErrorAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()

  const dialogs = [
    {
      sweetAlert: "default",
      status: "info",
      text: "Text explainig why there is an alert",
      title: "Are you Sure?",
      toggle: toggleInfoAlert,
      visible: infoAlertOpened,
      buttonOneText:"No, Cancel",
      buttonTwoText: "Yes, Action"
    },
    {
      sweetAlert: "default",
      status: "caution",
      text: "This is the action you will be taking",
      title: "Are you Sure?",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
      buttonOneText:"No, Cancel",
      buttonTwoText: "Yes, Action"
    },
    {
      sweetAlert: "default",
      status: "delete",
      text: "You are about to delete ...",
      title: "Delete",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
      buttonOneText:"No, Cancel",
      buttonTwoText: "Yes, Delete"
    },
    {
      sweetAlert: "default",
      status: "error",
      text: "Text explaining the error",
      title: "Error Message",
      toggle: toggleErrorAlert,
      visible: errorAlertOpened,
      buttonOneText:"No, Cancel",
      buttonTwoText: "Ok, Thanks"
    },
    {
      sweetAlert: "default",
      status: "success",
      text: "Text explaining what is successful",
      title: "Success!",
      toggle: toggleSuccessAlert,
      visible: successAlertOpened,
      buttonOneText:"No, Cancel",
      buttonTwoText: "Ok, Thanks"
    },
  ]

  return (
    <div>
      <Flex rowGap="md">
        <Button onClick={toggleInfoAlert}>
            {"Info Status"}
        </Button>
        <Button onClick={toggleCautionAlert}>
            {"Caution Status"}
        </Button>
        <Button onClick={toggleSuccessAlert}>
            {"Success Status"}
        </Button>
        <Button onClick={toggleErrorAlert}>
            {"Error Status"}
        </Button>
        <Button onClick={toggleDeleteAlert}>
          {"Delete Status"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map((dialog) => (
          <Dialog
              key={dialog.status}
              onClose={dialog.toggle}
              opened={dialog.visible}
              status={dialog.status}
              sweetAlert={dialog.sweetAlert}
              text={dialog.text}
              title={dialog.title}
          >
          <Dialog.Footer>
            <Button
                onClick={dialog.toggle}
                variant="link"
            >
            {dialog.buttonOneText}
            </Button>
            <Button
                onClick={dialog.toggle}
            >
            {dialog.buttonTwoText}
            </Button>
          </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </div>
  )
}

export default DialogAlert
