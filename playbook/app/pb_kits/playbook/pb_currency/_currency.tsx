import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Title from '../pb_title/_title'

type CurrencyProps = {
  abbreviate?: boolean,
  align?: 'center' | 'left' | 'right',
  amount: string,
  aria?: {[key:string]:string},
  className?: string,
  dark?: boolean,
  data?: {[key:string]:string},
  decimals?: 'default' | 'matching',
  emphasized?: boolean,
  id?: string,
  label?: string,
  size?: 'sm' | 'md' | 'lg',
  symbol?: string,
  variant?: 'default' | 'light' | 'bold',
  unit?: string,
  unstyled?: boolean,
}

const sizes: {lg: 1, md: 3, sm: 4} = {
  lg: 1,
  md: 3,
  sm: 4,
}

const Currency = (props: CurrencyProps) => {
  const {
    abbreviate = false,
    align = 'left',
    aria = {},
    amount,
    data = {},
    decimals = 'default',
    emphasized = true,
    id,
    unit,
    className,
    label = '',
    size = 'sm',
    symbol = '$',
    variant = 'default',
    dark = false,
    unstyled = false,
  } = props

  const emphasizedClass = emphasized ? '' : '_deemphasized'

  let variantClass
  if (variant === 'light') {
    variantClass = '_light'
  } else if (variant === 'bold') {
    variantClass = '_bold'
  }

  const [whole, decimal = '00'] = amount.split('.')
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_currency_kit', align, size),
    globalProps(props),
    className
  )

  const getFormattedNumber = (input: number | any ) => new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(input)

  type AbbrType = 'amount' | 'unit'

  const getAbbreviatedValue = (abbrType: AbbrType) => {
    const num = `${getFormattedNumber(whole.split(',').join(''))}`,
      isAmount = abbrType === 'amount',
      isUnit =  abbrType === 'unit'
    return isAmount ? num.slice(0, -1) : isUnit ? num.slice(-1) : ''
  }

  const getMatchingDecimalAmount = decimals === "matching" ? amount : whole,
    getMatchingDecimalValue = decimals === "matching" ? '' : `.${decimal}`

  const getAmount = abbreviate ? getAbbreviatedValue('amount') : getMatchingDecimalAmount,
    getAbbreviation = abbreviate ? getAbbreviatedValue('unit') : null,
    getDecimalValue = abbreviate ? '' : getMatchingDecimalValue

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Caption dark={dark}>{label}</Caption>

      <div className={`pb_currency_wrapper${variantClass || emphasizedClass}`}>
        {unstyled ? (
          <>
            <div>{symbol}</div>
            <div>{getAmount}</div>
            <div>
              {getAbbreviation}
              {unit ? unit : getDecimalValue}
            </div>
          </>
        ) : (
          <>
            <Body
                className="dollar_sign"
                color="light"
                dark={dark}
            >
              {symbol}
            </Body>

            <Title
                className="pb_currency_value"
                dark={dark}
                size={sizes[size]}
            >
              {getAmount}
            </Title>

            <Body
                className="unit"
                color="light"
                dark={dark}
            >
              {getAbbreviation}
              {unit ? unit : getDecimalValue}
            </Body>
          </>
        )}
      </div>
    </div>
  )
}

export default Currency
