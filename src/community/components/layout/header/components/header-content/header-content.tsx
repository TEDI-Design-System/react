export interface HeaderContentProps {
  /**
   * Content of HeaderDropdown
   */
  children?: React.ReactNode;
}

/**
 * @deprecated Use `Header.Center` or `Header.Actions` from `@tedi-design-system/react/tedi` instead.
 */
export const HeaderContent: React.FC<HeaderContentProps> = ({ children }) => <>{children}</>;

HeaderContent.displayName = 'HeaderContent';

export default HeaderContent;
