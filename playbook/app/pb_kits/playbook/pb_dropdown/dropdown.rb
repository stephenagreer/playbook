# frozen_string_literal: true

module Playbook
  module PbDropdown
    class Dropdown < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :label, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :error, type: Playbook::Props::String
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :default_value

      def data
        Hash(prop(:data)).merge(pb_dropdown: true)
      end

      def classname
        generate_classname("pb_dropdown")
      end

    private

      def error_class
        error.present? ? " error" : ""
      end

      def input_default_value
        default_value.present? ? default_value.transform_keys(&:to_s) : ""
      end
    end
  end
end
