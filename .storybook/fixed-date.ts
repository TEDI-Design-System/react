import isChromatic from 'chromatic/isChromatic';

// Chromatic compares snapshots taken on different days, so stories and components that read "today"
// (calendar today marker, default month, relative story dates) must see the same date on every run.
// Noon keeps the calendar day the same in every timezone.
const FIXED_NOW = new Date(2026, 9, 22, 12).getTime();

// Exported and called from preview.tsx rather than run on import: package.json declares
// "sideEffects": false, so the production Storybook build tree-shakes a bare `import './fixed-date'`.
export const freezeDateInChromatic = () => {
  if (!isChromatic()) {
    return;
  }

  const RealDate = Date;

  class FixedDate extends RealDate {
    constructor(...args: unknown[]) {
      if (args.length === 0) {
        super(FIXED_NOW);
        return;
      }
      super(...(args as ConstructorParameters<typeof Date>));
    }

    static override now(): number {
      return FIXED_NOW;
    }
  }

  globalThis.Date = FixedDate as DateConstructor;
};
