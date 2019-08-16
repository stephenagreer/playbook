module Playbook
  module PbPhone
    class Phone < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_icon,
          :configured_number].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              icon: default_configuration,
              number: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_icon = icon
        self.configured_number = number
      end

      def icon
        if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true}
          pb_icon = Playbook::PbIcon::Icon.new(icon_props)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          ""
        end
      end

      def number
        if is_set? configured_number
          if configured_number =~ /^(\d{3})(\d{3})(\d{4})$/
            return "(#{$1}) #{$2}-#{$3}"
          end
        end
      end

      def value
        pb_body = Playbook::PbBody::Body.new(color: "light") do
          icon + number
        end
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def to_partial_path
        "pb_phone/phone"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
