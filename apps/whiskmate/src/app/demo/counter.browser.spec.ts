import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { Counter } from './counter.ng';

describe(Counter, () => {
  it('increments when the increment button is clicked', async () => {
    const { countStatus, incrementButton } = await setUp();

    await incrementButton.click();

    expect(countStatus).toHaveTextContent('1');
  });

  it('decrements when the decrement button is clicked', async () => {
    const { countStatus, decrementButton, incrementButton } = await setUp();

    await incrementButton.click();
    await incrementButton.click();
    await decrementButton.click();

    expect(countStatus).toHaveTextContent('1');
  });

  it('does not decrement below 0', async () => {
    const { countStatus, decrementButton } = await setUp();

    await decrementButton.click();

    expect(countStatus).toHaveTextContent('0');
  });
});

function setUp() {
  TestBed.createComponent(Counter);

  return {
    incrementButton: page.getByRole('button', { name: 'Increment' }),
    decrementButton: page.getByRole('button', { name: 'Decrement' }),
    countStatus: page.getByRole('status'),
  };
}
