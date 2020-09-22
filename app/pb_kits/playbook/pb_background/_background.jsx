/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type BackgroundProps = {

  aria?: object,
  backgroundColor?: "bg_gradient" | "bg_dark" | "bg_light" | "white",
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  id?: string,
  imageUrl?: string,
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl",
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
}

const Background = (props: BackgroundProps) => {
  const {
    aria = {},
    backgroundColor = 'bg_light',
    children,
    className,
    data = {},
    id,
    imageUrl = '',
    padding = 'md',
    tag = 'div',
    text = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background_kit'), className, globalProps(props, { padding }))
  const Tag = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        id={id}
    >
      <If condition={imageUrl}>
        <div
            className={classes}
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
          { text || children }
        </div>
        <Else />
        <div className={classes + backgroundColor}>
          { text || children }
        </div>
      </If>
    </Tag>
  )
}

export default Background
