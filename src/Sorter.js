
export default class Sorter
{
    sortArrayByField(arr, field, dir) {
       
        return arr.sort( function( a, b )
        {
          var index = field;
          var direction = dir;
          if ( a[index].toLowerCase() === b[index].toLowerCase() ) return 0;
          return a[index].toLowerCase() < b[index].toLowerCase() ? -direction : direction;
        });
    }
}