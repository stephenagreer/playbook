/* @flow */

import React from "react"

import pbChart from "../plugins/pb_chart_plugin.js"

type LineGraphProps = {
    axisTitle?: String,
    className?: String,
    chartData: Array<{
        name: String,
        data: Array<Number>,
    }>,
    gradient?: Boolean,
    id: String,
    pointStart: Number,
    subTitle?: String,
    title: String,
}

export default class LineGraph extends React.Component<LineGraphProps> {
    static defaultProps = {
        className: 'pb_bar_graph',
        gradient: false,
        type: 'line',
    }

    componentDidMount() {
        const {
            axisTitle,
            className,
            chartData,
            id,
            pointStart,
            subTitle,
            title,
            type,
        } = this.props
    
        new pbChart(`.${className}`, {
            axisTitle: axisTitle,
            chartData: chartData,
            id: id,
            pointStart: pointStart,
            subtitle: subTitle,
            type,
            title: title,
        })
    }

    props: LineGraphProps

    render() {
      const { className, id } = this.props
  
      return (
        <div
            className={className}
            id={id}
        />
      )
    }
}
