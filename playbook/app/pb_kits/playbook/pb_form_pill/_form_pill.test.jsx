import React from 'react';
import { render, screen } from '../utilities/test-utils';
import FormPill from './_form_pill';

const testId = 'formpill';

test('should render classname', () => {
    render(
        <FormPill
            data={{ testid: testId }}
            text="test"
        /> 
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_form_pill_kit_primary none')
});

test('displays text content', () => {
    render(
        <FormPill
            data={{ testid: testId }}
            text="test"
        /> 
    )
  
    const text = screen.getByText("test")
    expect(text).toBeInTheDocument()
});

test('displays color variant', () => {
    render(
        <FormPill
            color={"neutral"}
            data={{ testid: testId }}
            text={"test"}
        />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_form_pill_kit_neutral none`)
});

test('displays size variant', () => {
    render(
        <FormPill            
            data={{ testid: testId }}
            size={"small"}
            text={"test"}
        />
    )
    const kit = screen.getByTestId('formpill')
    expect(kit).toHaveClass(`pb_form_pill_kit_primary small none`)
});

test('displays icon', () => {
    render(
        <FormPill            
            data={{ testid: testId }}
            icon={"test"}
        />
    )
    const kit = screen.getByTestId('formpill')
    expect(kit).toHaveClass(`pb_form_pill_kit_primary_icon none`)
});