import { Item, MAX_QUALITY_VALUE_OF_ITEM, DEFAULT_QUALITY_INCREMENT } from './Item'

const MIN_DOUBLE_QUALITY_INCREASE = 10
const MIN_TRIPLE_QUALITY_INCREASE = 5
const VALUE_OF_ITEM_WHEN_SELLIN_IS_ZERO = 0

export class BackstagePasses extends Item {
  increaseQuality (): void {
    this.quality += DEFAULT_QUALITY_INCREMENT
    if (this.sellIn <= MIN_DOUBLE_QUALITY_INCREASE) {
      this.quality += DEFAULT_QUALITY_INCREMENT
    }
    if (this.sellIn <= MIN_TRIPLE_QUALITY_INCREASE) {
      this.quality += DEFAULT_QUALITY_INCREMENT
    }
    if (this.quality > MAX_QUALITY_VALUE_OF_ITEM) {
      this.quality = MAX_QUALITY_VALUE_OF_ITEM
    }
  }

  updateQuality (): void {
    this.increaseQuality()
    this.decreaseSellIn()
    if (this.sellIn <= 0) {
      this.quality = VALUE_OF_ITEM_WHEN_SELLIN_IS_ZERO
    }
  }
}
