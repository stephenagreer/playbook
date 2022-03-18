import { omit } from 'lodash'

import {
  Binary,
  Display,
  DisplaySizes,
  None,
  Sizes,
} from '../types'

type Alignment = "start" | "end" | "center"

type AlignContent = {
  alignContent?: Alignment & Space
}

type AlignItems = {
  alignItems?: Alignment & ("flexStart" | "flexEnd" | "stretch" | "baseline")
}


type AlignSelf = {
  alignSelf?: Alignment & ("auto" | "stretch" | "baseline")
}
type AllSizes = None & Sizes

type BorderRadius = {
  borderRadius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded",
}

type Cursor = {
  cursor?: "pointer",
}

type Dark = {
  dark?: boolean,
}

type Flex = {
  flex?: "auto" | "initial" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none",
}

type FlexDirection = {
  flexDirection?: "row" | "column" | "rowReverse" | "columnReverse"
}

type FlexGrow = {
  flexGrow?: Binary
}
// type FlexDirectionOptions = "row" | "column" | "row_reverse" | "column_reverse"

type FlexShrink = {
  flexShrink?: Binary
}

type FlexWrap = {
  flexWrap?: "wrap" | "nowrap" | "wrapReverse"
}

type JustifyContent = {
  justifyContent?: Alignment & Space
}

type JustifySelf = {
  justifySelf?: Alignment & ("auto" | "stretch")
}

type LineHeight = {
  lineHeight?: "loosest" | "looser" | "loose" | "normal" | "tight" | "tighter" | "tightest",
}

type Margin = {
  marginRight?: AllSizes,
  marginLeft?: AllSizes,
  marginTop?: AllSizes,
  marginBottom?: AllSizes,
  marginX?: AllSizes,
  marginY?: AllSizes,
  margin?: AllSizes,
}

type MaxWidth = {
  maxWidth?: Sizes,
}

type NumberSpacing = {
  numberSpacing?: "tabular",
}

type Order = {
  order?: None| "first" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

type Padding = {
  paddingRight?: AllSizes,
  paddingLeft?: AllSizes,
  paddingTop?: AllSizes,
  paddingBottom?: AllSizes,
  paddingX?: AllSizes,
  paddingY?: AllSizes,
  padding?: AllSizes,
}

type Shadow = {
  shadow?: "none" | "deep" | "deeper" | "deepest",
}

type Space = "spaceBetween" | "spaceAround" | "spaceEvenly"

type ZIndex = {
  zIndex?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

// keep this as the last type definition
export type GlobalProps = AlignContent & AlignItems & AlignSelf &
  BorderRadius & Cursor & Dark & Display & DisplaySizes & Flex & FlexDirection &
  FlexGrow & FlexShrink & FlexWrap & JustifyContent & JustifySelf &
  LineHeight & Margin & MaxWidth & NumberSpacing & Order & Padding &
  Shadow & ZIndex

// Prop categories
const PROP_CATEGORIES: {[key:string]: (props: {[key: string]: any}) => string} = {
  spacingProps: ({
    marginRight,
    marginLeft,
    marginTop,
    marginBottom,
    marginX,
    marginY,
    margin,
    paddingRight,
    paddingLeft,
    paddingTop,
    paddingBottom,
    paddingX,
    paddingY,
    padding,
  }: Margin & Padding) => {
    let css = ''
    css += marginRight ? `mr_${marginRight} ` : ''
    css += marginLeft ? `ml_${marginLeft} ` : ''
    css += marginTop ? `mt_${marginTop} ` : ''
    css += marginBottom ? `mb_${marginBottom} ` : ''
    css += marginX ? `mx_${marginX} ` : ''
    css += marginY ? `my_${marginY} ` : ''
    css += margin ? `m_${margin} ` : ''
    css += paddingRight ? `pr_${paddingRight} ` : ''
    css += paddingLeft ? `pl_${paddingLeft} ` : ''
    css += paddingTop ? `pt_${paddingTop} ` : ''
    css += paddingBottom ? `pb_${paddingBottom} ` : ''
    css += paddingX ? `px_${paddingX} ` : ''
    css += paddingY ? `py_${paddingY} ` : ''
    css += padding ? `p_${padding} ` : ''
    return css
  },
  darkProps: ({ dark }: Dark) => {
    let css = ''
    css += dark ? 'dark' : ''
    return css
  },
  numberSpacingProps: ({ numberSpacing }: NumberSpacing) => {
    let css = ''
    css += numberSpacing ? `ns_${numberSpacing} ` : ''
    return css
  },
  maxWidthProps: ({ maxWidth }: MaxWidth) => {
    let css = ''
    css += maxWidth ? `max_width_${maxWidth } ` : ''
    return css
  },
  zIndexProps: ({ zIndex }: ZIndex) => {
    let css = ''
    css += zIndex ? `z_index_${zIndex } ` : ''
    return css
  },
  shadowProps: ({ shadow }: Shadow) => {
    let css = ''
    css += shadow ? `shadow_${shadow} ` : ''
    return css
  },
  lineHeightProps: ({ lineHeight }: LineHeight) => {
    let css = ''
    css += lineHeight ? `line_height_${lineHeight} ` : ''
    return css
  },
  displayProps: (display: Display ) => {
    let css = ''
    Object.entries(display).forEach((displayEntry) => {
      if (displayEntry[0] == "display") {
        if (typeof displayEntry[1] == "string") {
          css += `display_${displayEntry[1]}`
        } else if (typeof displayEntry[1] == "object") {
          Object.entries(displayEntry[1]).forEach((displayObj) => {
            css += `display_${displayObj[0]}_${displayObj[1]}`
          })
        } else {
          ' '
        }
      }
    })
    return css
  },
  cursorProps: ({ cursor }: Cursor) => {
    let css = ''
    css += cursor ? `cursor_${cursor} ` : ''
    return css
  },
  flexDirectionProps: ({ flexDirection }: any) => { //WIP: figure out the type
    if (typeof flexDirection !== 'object') return

    const flexKeys: string[] = Object.keys(flexDirection)

    return flexKeys.map((key: string) => {
      const flexDirectionValue: string = flexDirection[key]
      return `flex_direction_${key}_${flexDirectionValue}`
    }).join(" ")
  },
  flexWrapProps: ({ flexWrap }: FlexWrap) => {
    let css = ''
    css += flexWrap ? `flex_wrap_${flexWrap}` : ''
    return css
  },
  justifyContentProps: ({ justifyContent }: JustifyContent) => {
    let css = ''
    css += justifyContent ? `justify_content_${justifyContent}` : ''
    return css
  },
  justifySelfProps: ({ justifySelf }: JustifySelf) => {
    let css = ''
    css += justifySelf ? `justify_self_${justifySelf}` : ''
    return css
  },
  alignItemsProps: ({ alignItems }: AlignItems) => {
    let css = ''
    css += alignItems ? `align_items_${alignItems}` : ''
    return css
  },
  alignContentProps: ({ alignContent }: AlignContent) => {
    let css = ''
    css += alignContent ? `align_content_${alignContent}` : ''
    return css
  },
  alignSelfProps: ({ alignSelf }: AlignSelf) => {
    let css = ''
    css += alignSelf ? `align_self_${alignSelf}` : ''
    return css
  },
  flexProps: ({ flex }: Flex) => {
    let css =''
    css += flex ? `flex_${flex}` : ''
    return css
  },
  flexGrowProps: ({ flexGrow }: FlexGrow) => {
    let css = ''
    css += flexGrow ? `flex_grow_${flexGrow}` : ''
    return css
  },
  flexShrinkProps: ({ flexShrink }: FlexShrink) => {
    let css = ''
    css += flexShrink ? `flex_shrink_${flexShrink}` : ''
    return css
  },
  orderProps: ({ order }: Order) => {
    let css = ''
    css += order ? `order_${order}` : ''
    return css
  }
}

type DefaultProps = {[key: string]: string} | Record<string, unknown>

export const globalProps = (props: GlobalProps, defaultProps: DefaultProps = {}): string => {
  const allProps = { ...props, ...defaultProps }
  return Object.keys(PROP_CATEGORIES).map((key) => {
    return PROP_CATEGORIES[key](allProps)
  }).filter((value) => value?.length > 0).join(" ")
}

export const deprecatedProps = (kit: string, props: string[] = []): void => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    props.forEach((prop) => {
      console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    })
  }
}

export const domSafeProps = (props: {[key: string]: string}): {[key: string]: string} => {
  const notSafeProps = [
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
    'margin',
    'paddingRight',
    'paddingLeft',
    'paddingTop',
    'paddingBottom',
    'paddingX',
    'paddingY',
    'padding',
    'dark',
  ]
  return omit(props, notSafeProps)
}