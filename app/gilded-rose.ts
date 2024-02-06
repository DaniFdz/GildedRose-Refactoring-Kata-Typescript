const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const AGED_BRIE = 'Aged Brie'
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
const MAX_QUALITY = 50
const MIN_QUALITY = 0
const NO_ITEMS_LEFT = 0
const LOW_SELLIN = 6
const MED_SELLIN = 11

export class Item {
  name: string
  sellIn: number
  quality: number

  constructor (name: string, sellIn: number, quality: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }

  increaseQuality (): void {
    if (this.quality < MAX_QUALITY) {
      this.quality += 1
    }
  }

  decreaseQuality (): void {
    if (this.quality > MIN_QUALITY) {
      this.quality += -1
    }
  }

  decreaseSellIn (): void {
    if (this.name !== SULFURAS) {
      this.sellIn += -1
    }
  }

  updateQuality (): void {
    if (this.name === SULFURAS) {
      return
    }

    switch (this.name) {
      case AGED_BRIE:
        this.increaseQuality()
        break
      case BACKSTAGE_PASSES:
        this.increaseQuality()
        if (this.sellIn < MED_SELLIN) {
          this.increaseQuality()
        }
        if (this.sellIn < LOW_SELLIN) {
          this.increaseQuality()
        }
        break
      default:
        this.decreaseQuality()
    }

    this.decreaseSellIn()

    if (this.sellIn < NO_ITEMS_LEFT) {
      switch (this.name) {
        case AGED_BRIE:
          this.increaseQuality()
          break
        case BACKSTAGE_PASSES:
          this.quality = 0
          break
        default:
          this.decreaseQuality()
      }
    }
  }
}

export class GildedRose {
  items: Item[]

  constructor (items = [] as Item[]) {
    this.items = items
  }

  updateQuality (): Item[] {
    this.items.forEach(item => { item.updateQuality() })
    return this.items
  }
}
