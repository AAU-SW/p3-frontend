import { cn } from '@/lib/utils';
import React from 'react';

import type { [FTName]Props } from './[FTName].types';

export const [FTName]: React.FC<[FTName]Props> = ({
  className = '',
}) => <div className={cn('', className)}>[FTName]</div>;
