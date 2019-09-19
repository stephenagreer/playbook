import React from 'react'
import Button from '../_button.jsx'

const ButtonDefaultDark = () => (
    <div>
        <Button text="Button Primary"/>
        <Button
                text="Button Secondary"
                variant="secondary"
        />
        <Button
                text="Button Link"
                variant="link"
        />
        <Button
                text="Button Disabled"
                disabled
        />
    </div>
)

export default ButtonDefaultDark