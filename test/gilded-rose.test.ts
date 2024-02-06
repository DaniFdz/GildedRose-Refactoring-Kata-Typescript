/*
# Gilded Rose Requirements Specification
-------------------
Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location
in a prominent city ran by a friendly innkeeper named Allison. We also buy and sell only
the finest goods. Unfortunately, our goods are constantly degrading in Quality as they
approach their sell by date.

We have a system in place that updates our inventory for us. It was developed by a
no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add
the new feature to our system so that we can begin selling a new category of items.

## First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the items
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

## Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
- Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less
but Quality drops to 0 after the concert

## We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items
- Feel free to make any changes to the UpdateQuality method and add any new code as long as
everything still works correctly. However, do not alter the Item class or Items property as
those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn't
believe in shared code ownership (you can make the UpdateQuality method and Items property static
if you like, we'll cover for you).

- Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras"
is a legendary item and as such its Quality is 80 and it never alters.
*/

import { GildedRose } from '@/GildedRose'
import { AgedBrie } from '@/AgedBrie'
import { Sulfuras } from '@/Sulfuras'
import { BackstagePasses } from '@/BackstagePasses'

describe('Gilded Rose', () => {
  describe('Instantiation', () => {
    describe('Aged Brie', () => {
      it('should instantiate with a sellIn and quality', () => {
        const agedBrie = new AgedBrie(1, 1)
        expect(agedBrie.sellIn).toEqual(1)
        expect(agedBrie.quality).toEqual(1)
      })
    })
    describe('Sulfuras', () => {
      it('should instantiate with a sellIn and 80 as default quality', () => {
        const sulfuras = new Sulfuras()
        expect(sulfuras.quality).toEqual(80)
      })
    })
    describe('Backstage Passes', () => {
      it('should instantiate with a sellIn and quality', () => {
        const backstagePasses = new BackstagePasses(1, 1)
        expect(backstagePasses.sellIn).toEqual(1)
        expect(backstagePasses.quality).toEqual(1)
      })
    })

    describe('Gilded Rose', () => {
      it('should instantiate with an empty array of items', () => {
        const gildedRose = new GildedRose()
        expect(gildedRose.items).toEqual([])
      })
      it('should instantiate with an array of items', () => {
        const items = [new AgedBrie(1, 1), new Sulfuras(), new BackstagePasses(1, 1)]
        const gildedRose = new GildedRose(items)
        expect(gildedRose.items).toEqual(items)
      })
    })
  })

  describe('Increase quality of an item', () => {
    describe('Aged Brie', () => {
      it('should increase quality by 1', () => {
        const agedBrie = new AgedBrie(1, 1)
        agedBrie.increaseQuality()
        expect(agedBrie.quality).toEqual(2)
      })
      it('should not increase quality beyond 50', () => {
        const agedBrie = new AgedBrie(1, 50)
        agedBrie.increaseQuality()
        expect(agedBrie.quality).toEqual(50)
      })
    })
    describe('Sulfuras', () => {
      it('should not increase quality', () => {
        const sulfuras = new Sulfuras()
        sulfuras.increaseQuality()
        expect(sulfuras.quality).toEqual(80)
      })
    })
    describe('Backstage Passes', () => {
      it('should increase quality by 1 when sellIn is greater than 10', () => {
        const backstagePasses = new BackstagePasses(11, 1)
        backstagePasses.increaseQuality()
        expect(backstagePasses.quality).toEqual(2)
      })
      it('should increase quality by 2 when sellIn is between 6 and 10', () => {
        const backstagePasses = new BackstagePasses(10, 1)
        backstagePasses.increaseQuality()
        expect(backstagePasses.quality).toEqual(3)
      })
      it('should increase quality by 3 when sellIn is lower than 5', () => {
        const backstagePasses = new BackstagePasses(5, 1)
        backstagePasses.increaseQuality()
        expect(backstagePasses.quality).toEqual(4)
      })
      it('should not increase quality beyond 50', () => {
        const backstagePasses = new BackstagePasses(1, 50)
        backstagePasses.increaseQuality()
        expect(backstagePasses.quality).toEqual(50)
      })
    })
  })

  describe('Decrease quality of an item', () => {
    describe('Aged Brie', () => {
      it('should decrease quality by 1', () => {
        const agedBrie = new AgedBrie(1, 1)
        agedBrie.decreaseQuality()
        expect(agedBrie.quality).toEqual(0)
      })
      it('should not decrease quality beyond 0', () => {
        const agedBrie = new AgedBrie(1, 0)
        agedBrie.decreaseQuality()
        expect(agedBrie.quality).toEqual(0)
      })
    })
    describe('Sulfuras', () => {
      it('should not decrease quality', () => {
        const sulfuras = new Sulfuras()
        sulfuras.decreaseQuality()
        expect(sulfuras.quality).toEqual(80)
      })
    })
    describe('Backstage Passes', () => {
      it('should decrease quality by 1', () => {
        const backstagePasses = new BackstagePasses(1, 1)
        backstagePasses.decreaseQuality()
        expect(backstagePasses.quality).toEqual(0)
      })
      it('should not decrease quality beyond 0', () => {
        const backstagePasses = new BackstagePasses(1, 0)
        backstagePasses.decreaseQuality()
        expect(backstagePasses.quality).toEqual(0)
      })
    })
  })

  describe('Decrease sellIn of an item', () => {
    describe('Aged Brie', () => {
      it('should decrease sellIn by 1', () => {
        const agedBrie = new AgedBrie(1, 1)
        agedBrie.decreaseSellIn()
        expect(agedBrie.sellIn).toEqual(0)
      })
    })
    describe('Sulfuras', () => {
      it('should not decrease sellIn', () => {
        const sulfuras = new Sulfuras()
        sulfuras.decreaseSellIn()
        expect(sulfuras.sellIn).toEqual(0)
      })
    })
    describe('Backstage Passes', () => {
      it('should decrease sellIn by 1', () => {
        const backstagePasses = new BackstagePasses(1, 1)
        backstagePasses.decreaseSellIn()
        expect(backstagePasses.sellIn).toEqual(0)
      })
    })
  })

  describe('Update quality of an item', () => {
    describe('Aged Brie', () => {
      it('should increase quality by 1 and decrease sellIn by 1', () => {
        const agedBrie = new AgedBrie(1, 1)
        agedBrie.updateQuality()
        expect(agedBrie.quality).toEqual(2)
        expect(agedBrie.sellIn).toEqual(0)
      })
      it('should increase quality by 2 when sellIn is less than 0', () => {
        const agedBrie = new AgedBrie(0, 1)
        agedBrie.updateQuality()
        expect(agedBrie.quality).toEqual(3)
      })
    })
    describe('Sulfuras', () => {
      it('should not change either quality or sellIn', () => {
        const sulfuras = new Sulfuras()
        sulfuras.updateQuality()
        expect(sulfuras.quality).toEqual(80)
        expect(sulfuras.sellIn).toEqual(0)
      })
    })
    describe('Backstage Passes', () => {
      it('should increase quality by 1 and decrease sellIn by 1', () => {
        const backstagePasses = new BackstagePasses(11, 1)
        backstagePasses.updateQuality()
        expect(backstagePasses.quality).toEqual(2)
        expect(backstagePasses.sellIn).toEqual(10)
      })
      it('should increase quality by 2 and decrease sellIn by 1 when sellIn is between 6 and 10', () => {
        const backstagePasses = new BackstagePasses(10, 1)
        backstagePasses.updateQuality()
        expect(backstagePasses.quality).toEqual(3)
        expect(backstagePasses.sellIn).toEqual(9)
      })
      it('should increase quality by 3 and decrease sellIn by 1 when sellIn is between 1 and 5', () => {
        const backstagePasses = new BackstagePasses(5, 1)
        backstagePasses.updateQuality()
        expect(backstagePasses.quality).toEqual(4)
        expect(backstagePasses.sellIn).toEqual(4)
      })
      it('should set quality to 0 and decrease sellIn by 1 when sellIn is 0', () => {
        const backstagePasses = new BackstagePasses(0, 1)
        backstagePasses.updateQuality()
        expect(backstagePasses.quality).toEqual(0)
        expect(backstagePasses.sellIn).toEqual(-1)
      })
    })
    describe('Gilded Rose', () => {
      it('should update the quality of each item in the items array', () => {
        const items = [new AgedBrie(1, 1), new Sulfuras(), new BackstagePasses(1, 1)]
        const expectedItems = [new AgedBrie(0, 2), new Sulfuras(), new BackstagePasses(0, 0)]
        const gildedRose = new GildedRose(items)
        gildedRose.updateQuality()
        expect(gildedRose.items).toEqual(expectedItems)
      })
    })
  })
})
