import Separator from '../../../misc/separator/separator';

export type DropdownSeparatorProps = {
  /**
   * Additional class name(s) for the separator.
   */
  className?: string;
};

export const DropdownSeparator = ({ className }: DropdownSeparatorProps) => {
  return <Separator element="hr" axis="horizontal" className={className} />;
};

DropdownSeparator.displayName = 'DropdownSeparator';
