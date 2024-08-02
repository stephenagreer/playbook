import React from 'react'
import { RichTextEditor } from 'playbook-ui'

const RichTextEditorSimple = (props) => (
  <div>
    <RichTextEditor
        simple
        {...props}
    />
  </div>
)

export default RichTextEditorSimple
