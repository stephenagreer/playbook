# frozen_string_literal: true

module Playbook
  module Display
    def self.included(base)
      base.prop :display
    end

    def display_props
      selected_props = display_options.keys.select { |sk| try(sk) }

      return nil unless selected_props.present?

      puts "***" * 50
      puts selected_props
      puts display_value
      puts screen_size
      puts display
      puts "***" * 50

      selected_props.map do |k|
        display_value = send(k)
        screen_size = display_value[:size]
        display = display_value[:display]

        return "display_#{screen_size}_#{display}" unless screen_size.blank? || display.blank?
      end.compact.join(" ")
    end

    def display_options
      {
        display: "display",
      }
    end

    def display_values
      %w[block inline_block inline flex inline_flex hidden]
    end
  end
end
