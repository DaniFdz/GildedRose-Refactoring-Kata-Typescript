import { Item } from './Item'

export class AgedBrie extends Item {
  updateQuality (): void {
    this.increaseQuality()
    this.decreaseSellIn()
    if (this.sellIn < 0) {
      this.increaseQuality()
    }
  }
}
