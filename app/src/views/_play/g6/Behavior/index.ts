import { Graph, IG6GraphEvent, Item, registerBehavior } from '@antv/g6'

export function initBehavior () {
  // let lastItem: Item

  // registerBehavior('mousedown-highlight', {
  //   getEvents () {
  //     return {
  //       mousedown: 'onMouseDown',
        
  //     }
  //   },
  //   onMouseDown (ev: IG6GraphEvent) {
  //     const graph = this.graph as Graph
  //     if (ev.item && lastItem !== ev.item) {
  //       lastItem = ev.item
  //       graph.setItemState(ev.item, 'active', true)
  //     }
  //     if (lastItem && !ev.item){
  //       graph.setItemState(lastItem, 'active', true)
  //     } else {
  //       graph.setItemState(lastItem, 'active', true)
  //     }
  //   },
  // })
}
