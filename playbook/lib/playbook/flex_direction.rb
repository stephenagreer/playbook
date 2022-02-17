# frozen_string_literal: true

module Playbook
  module FlexDirection
    def self.included(base)
      base.prop :flex_direction
    end

    def flex_direction_props
      selected_props = flex_direction_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_direction_value = send(k)
        if flex_direction_value.is_a?(Hash)
          flex_direction_value.map do |media_size, flex_value|
            "flex_direction_#{media_size}_#{flex_value}"
          end
        else
          "flex_direction_#{flex_direction_value}" unless flex_direction_value.nil?
        end
      end.compact.join(" ")
    end

    def flex_direction_options
      {
        flex_direction: "flex_direction",
      }
    end

    def flex_direction_values
      %w[row column row_reverse column_reverse]
    end
  end
end
