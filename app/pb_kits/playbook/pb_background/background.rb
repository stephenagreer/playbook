# frozen_string_literal: true

module Playbook
  module PbBackground
    class Background
      include Playbook::Props

      partial "pb_background/background"

      prop :background_color, type: Playbook::Props::Enum,
                              values: %w[gradient dark light white],
                              default: "light"
      prop :image_url
      prop :padding, type: Playbook::Props::Enum,
                     values: %w[none xs sm md lg xl],
                     default: "md"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "div"

      def classname
        generate_classname("pb_background_kit lazyload blur_up", padding, "bg_#{background_color}", separator: " ")
      end

    end
  end
end
