import type { ParsedUrlQuery } from 'querystring';

/**
 * t('note_0006')
 * @param query
 * @returns
 */
export function getServerSidePropsQuery(query: ParsedUrlQuery): BCMP.Objects {
  return {
    ...query,
    ps: query.ps ? Number(query.ps) : 10,
    pn: query.pn ? Number(query.pn) : 1,
  };
}
