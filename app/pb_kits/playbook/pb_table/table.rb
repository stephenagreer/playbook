# frozen_string_literal: true

module Playbook
  module PbTable
    class Table
      include Playbook::Props

      partial "pb_table/table"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"
      prop :single_line, type: Playbook::Props::Boolean,
                         default: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :disable_hover, type: Playbook::Props::Boolean,
                           default: false
      prop :container, type: Playbook::Props::Boolean,
                       default: true
      prop :text

      def classname
        generate_classname(
          "pb_table", "table-#{size}", single_line_class, dark_class,
          disable_hover_class, container_class, separator: " "
        )
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def single_line_class
        single_line ? "single-line" : nil
      end

      def disable_hover_class
        disable_hover ? "no-hover" : nil
      end

      def container_class
        container ? "table-card" : nil
      end
    end
  end
end
