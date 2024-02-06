import { type Item } from '@/Item'

export class GildedRose {
  items: Item[]

  constructor (items = [] as Item[]) {
    this.items = items
  }

  updateQuality (): Item[] {
    this.items.forEach(item => {
      item.updateQuality()
    })
    return this.items
  }
}
