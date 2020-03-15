import { date, datetime, minutetime, monthtime } from './datetime'
import { commonScore, friendlyPrice, commaPrice } from './price'
import { commonVolume } from './volume'
import { commonWeight } from './weight'
import { sales } from './sales'

export default {}.install = function (Vue, options) {
  let filters = [
    { name: 'date', filter: date },
    { name: 'datetime', filter: datetime },
    { name: 'score', filter: commonScore },
    { name: 'friendlyPrice', filter: friendlyPrice },
    { name: 'commaPrice', filter: commaPrice },
    { name: 'monthtime', filter: monthtime },
    { name: 'minutetime', filter: minutetime },
    { name: 'volume', filter: commonVolume },
    { name: 'weight', filter: commonWeight },
    { name: 'sales', filter: sales }
  ]
  for (let i = 0; i < filters.length; i++) {
    let filer = filters[i]
    Vue.filter(filer.name, filer.filter)
  }
}
