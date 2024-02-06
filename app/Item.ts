export const MAX_QUALITY_VALUE_OF_ITEM = 50
export const MIN_QUALITY_VALUE_OF_ITEM = 0
export const DEFAULT_QUALITY_INCREMENT = 1
export const DEFAULT_QUALITY_DECREMENT = 1
export const DEFAULT_SELLIN_DECREMENT = 1

export abstract class Item {
  sellIn: number
  quality: number

  constructor (sellIn: number, quality: number) {
    this.sellIn = sellIn
    this.quality = quality
  }

  updateQuality (): void {
    this.decreaseQuality()
    this.decreaseSellIn()
    if (this.sellIn < 0) {
      this.decreaseQuality()
    }
  }

  increaseQuality (): void {
    if (this.quality < MAX_QUALITY_VALUE_OF_ITEM) {
      this.quality += DEFAULT_QUALITY_INCREMENT
    }
  }

  decreaseQuality (): void {
    if (this.quality > MIN_QUALITY_VALUE_OF_ITEM) {
      this.quality -= DEFAULT_QUALITY_DECREMENT
    }
  }

  decreaseSellIn (): void {
    this.sellIn -= DEFAULT_SELLIN_DECREMENT
  }
}
