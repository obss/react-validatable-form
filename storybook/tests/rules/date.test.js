import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('date test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('08-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date equalTo test', () => {
    const initialFormData = {
        val: new Date('07-08-1999'),
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date', equalTo: new Date('08-08-1999') }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('08-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date notEqualTo test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date', notEqualTo: new Date('08-08-1999') }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('07-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date greaterThan test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date', greaterThan: new Date('08-08-1999') }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('09-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: new Date('07-08-1999'),
    };
    const rules = [
        { path: 'val', ruleSet: ['required', { rule: 'date', greaterThanOrEqualTo: new Date('08-08-1999') }] },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('08-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date lessThan test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date', lessThan: new Date('07-08-1999') }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('06-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'date', lessThanOrEqualTo: new Date('07-08-1999') }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('07-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});
