import { defineComponent, Fragment } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    console.log(slots)

    return () => (
      <Fragment>
        <div>
          <h2>test2</h2>
          匿名插槽:{slots.default && slots.default()}
          具名插槽:{slots.testTwo && slots.testTwo()}
          作用域插槽:{slots.scope && slots.scope({ name: 'ljl' })}
        </div>
      </Fragment>
    )
  }
})
