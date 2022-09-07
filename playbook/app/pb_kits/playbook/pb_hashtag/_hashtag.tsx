/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Badge from '../pb_badge/_badge'

type HashtagProps = {
  aria?: {[key: string]: string},
  className?: string,
  dark?: boolean,
  data?: string,
  id?: string,
  newWindow?: boolean,
  rel?: string,
  text?: string,
  type: "default" | "home" | "project" | "appointment",
  url?: string,
} & GlobalProps

const typeMap = {
  home: 'H#',
  project: 'P#',
  appointment: 'A#',
  default: '#',
}

const Hashtag = (props: HashtagProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    newWindow,
    rel,
    text,
    type = 'default',
    url,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_hashtag_kit'), globalProps(props), className)

  return (
    <span
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <a
          href={url}
          rel={(newWindow ? "noreferrer" : rel)}
          target={(newWindow ? '_blank' : '_self')}
      >
        <Badge
            dark={dark}
            text={typeMap[type] + text}
            variant="primary"
        />
      </a>
    </span>
  )
}

export default Hashtag
