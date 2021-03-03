export type Filter = {
    id: string,
    label: string,
    criteria: {
      value: string
      comparator?: 'greaterThan' | 'lessThan'
    }
}



export function filteredResults (filterKey: string, filters: Filter[], data: any[]) {
    var filterCriteria: any = [];
    filterCriteria[filterKey] = filters;

    // Filter results, AND comparator per filter set, OR comparator for filter item
    var filteredResults = data.filter(function(item, index) {
      var drop = true;
      for (var key in item) {
        if (filterCriteria.hasOwnProperty(key) && filterCriteria[key].length > 0) {
          var keep = false;
          for (var i in filterCriteria[key]) {
            switch (filterCriteria[key][i].criteria.comparator) {
              case 'greaterThan':
                keep = keep || item[key] > parseInt(filterCriteria[key][i].criteria.value);
                break;
              case 'lessThan':
                keep = keep || item[key] < parseInt(filterCriteria[key][i].criteria.value);
                break;
              default:
                keep = keep || item[key] === filterCriteria[key][i].criteria.value;
                break;
            }
          }
          drop = drop && keep;
        }
      }
      return drop;
    });

    return {
      filterCriteria: filterCriteria,
      results: filteredResults
    };
  }