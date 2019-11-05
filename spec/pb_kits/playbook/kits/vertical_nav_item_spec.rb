# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_vertical_nav/item"

RSpec.describe Playbook::PbVerticalNav::Item do
  subject { Playbook::PbVerticalNav::Item }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:active) }
  it { is_expected.to define_prop(:link)
                  .with_default("#") }
  it { is_expected.to define_prop(:text) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "vertical_nav_list_border_item"
      expect(subject.new(active: true).classname).to eq "vertical_nav_list_border_item_active"
      expect(subject.new(classname: "additional_class").classname).to eq "vertical_nav_list_border_item additional_class"
    end
  end
end
