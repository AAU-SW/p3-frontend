/* eslint-disable */
import type { Case } from '@/types/case.ts';

export const groupByAssignee = (cases: Case[]) => {
  return cases.reduce(
    (groups, c) => {
      const id = c.assignedTo?.id ?? 'unknown';

      if (!groups[id]) {
        groups[id] = {
          assignee: c.assignedTo,
          cases: [],
        };
      }

      groups[id].cases.push(c);

      return groups;
    },
    {} as Record<string, { assignee: Case['assignedTo']; cases: Case[] }>,
  );
};
