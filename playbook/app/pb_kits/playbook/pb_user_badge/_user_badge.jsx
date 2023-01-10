/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Veteran from './badges/veteran.jsx';
import MillionDollar from './badges/million-dollar.jsx';


type UserBadgeProps = {
  aria?: object,
  badge?: "million-dollar" | "veteran",
  className?: string,
  data?: object,
  id?: string,
  size?: "sm" | "md" | "lg",
}

const UserBadge = (props: UserBadgeProps) => {
  const {
    aria = {},
    badge = 'million-dollar',
    className,
    data = {},
    id,
    size = 'md',
  } = props

  const image = badge === "million-dollar" ? <MillionDollar /> : <Veteran />
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_user_badge_kit', size),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <div className="pb_user_badge_wrapper">
        {image}
      </div>
    </div>
  )
}
export default UserBadge
