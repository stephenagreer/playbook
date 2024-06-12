# frozen_string_literal: true

require "playbook/classnames"
require "playbook/spacing"
require "playbook/z_index"
require "playbook/number_spacing"
require "playbook/shadow"
require "playbook/line_height"
require "playbook/display"
require "playbook/cursor"
require "playbook/flex_direction"
require "playbook/flex_wrap"
require "playbook/justify_content"
require "playbook/justify_self"
require "playbook/align_items"
require "playbook/align_content"
require "playbook/align_self"
require "playbook/flex"
require "playbook/flex_grow"
require "playbook/flex_shrink"
require "playbook/order"
require "playbook/position"
require "playbook/hover"
require "playbook/border_radius"
require "playbook/text_align"
require "playbook/overflow"
require "playbook/truncate"
require "playbook/left"
require "playbook/top"
require "playbook/right"
require "playbook/bottom"
require "playbook/vertical_align"

module Playbook
  include ActionView::Helpers

  class KitBase < ViewComponent::Base
    include Playbook::PbKitHelper
    include Playbook::Props
    include Playbook::Classnames
    include Playbook::Spacing
    include Playbook::ZIndex
    include Playbook::NumberSpacing
    include Playbook::Shadow
    include Playbook::LineHeight
    include Playbook::Display
    include Playbook::Cursor
    include Playbook::FlexDirection
    include Playbook::FlexWrap
    include Playbook::JustifyContent
    include Playbook::JustifySelf
    include Playbook::AlignItems
    include Playbook::AlignContent
    include Playbook::AlignSelf
    include Playbook::Flex
    include Playbook::FlexGrow
    include Playbook::FlexShrink
    include Playbook::Order
    include Playbook::Position
    include Playbook::Hover
    include Playbook::BorderRadius
    include Playbook::TextAlign
    include Playbook::Overflow
    include Playbook::Truncate
    include Playbook::Left
    include Playbook::Top
    include Playbook::Right
    include Playbook::Bottom
    include Playbook::VerticalAlign

    prop :id
    prop :data, type: Playbook::Props::HashProp, default: {}
    prop :aria, type: Playbook::Props::HashProp, default: {}
    prop :html_options, type: Playbook::Props::HashProp, default: {}
    prop :children, type: Playbook::Props::Proc

    def object
      self
    end

    def combined_html_options
      default_html_options.merge(html_options.deep_merge(data_attributes))
    end

    # rubocop:disable Layout/CommentIndentation
    # pb_content_tag information (potentially to be abstracted into its own dev doc in the future)
    # The pb_content_tag generates HTML content tags for rails kits with flexible options.
    # Modify a generated kit.html.erb file accordingly (the default_options listed below no longer need to be explictly outlined in that file, only modifications).
    # name - the first argument is for HTML tag. The default is :div.
    # content_or_options_with_block - additional content or options for the tag (i.e., the customizations a dev adds to kit.html.erb).
    # options - Within combined_options, the empty options hash allows for customizations to
        # merge with the default_options and combined_html_options.
    # escape - set to true, this allows for HTML-escape.
    # block - an optional block for content inside the tag.
    # The return is a HTML tag that includes any provided customizations. If nothing is specified in kit.html.erb, the default shape is:
        # :div,
        # aria: object.aria,
        # class: object.classname,
        # data: object.data,
        # id: object.id,
        # **combined_html_options
    # rubocop:enable Layout/CommentIndentation

    # rubocop:disable Style/OptionalBooleanParameter
    def pb_content_tag(name = :div, content_or_options_with_block = {}, options = {}, escape = true, &block)
      combined_options = options
                         .merge(combined_html_options)
                         .merge(default_options.merge(content_or_options_with_block))
      content_tag(name, combined_options, options, escape, &block)
    end
    # rubocop:enable Style/OptionalBooleanParameter

  private

    def default_options
      {
        id: id,
        data: data,
        class: classname,
        aria: aria,
      }
    end

    def default_html_options
      {}
    end

    def data_attributes
      {
        data: data,
        aria: aria,
      }.transform_keys { |key| key.to_s.tr("_", "-").to_sym }
    end
  end
end
