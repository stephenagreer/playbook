# frozen_string_literal: true

module Playbook
  module PbFormPill
    class FormPill < Playbook::KitBase
      prop :avatar_url
      prop :name
      prop :text
      prop :size

      prop :text_transform, type: Playbook::Props::Enum,
                            values: %w[none lowercase],
                            default: "none"
      prop :color, type: Playbook::Props::Enum,
                   values: %w[primary neutral],
                   default: "primary"
      prop :tabindex

      def classname
        generate_classname("pb_form_pill_kit", color, name, text, text_transform)
      end

      def display_text
        object.text
      end

      def size_class
        size == "small" ? " small" : ""
      end
    end
  end
end
