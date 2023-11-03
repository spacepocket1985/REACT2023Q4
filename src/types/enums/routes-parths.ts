enum ROUTE_PARTH {
  MAIN = '/',
  CHARACTER = '/character/:characterId',
  PAGE = '/page/:pageNum',
  SEARCH = '/search/:queryParam',
  PAGE404 = '*',
  DEFAULT_SEARCH = 'search',
}

export default ROUTE_PARTH;
