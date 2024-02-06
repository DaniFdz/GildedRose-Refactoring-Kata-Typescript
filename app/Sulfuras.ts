import { Item } from './Item'

const SULFURAS_DEFAULT_QUALITY = 80

export class Sulfuras extends Item {
  constructor () {
    super(0, SULFURAS_DEFAULT_QUALITY)
  }

  // Sulfuras never change its quality
  updateQuality (): void {}

  // Sulfuras never change its quality
  increaseQuality (): void {}

  // Sulfuras never change its quality
  decreaseQuality (): void {}

  // Sulfuras never change its sellIn
  decreaseSellIn (): void {}
}
