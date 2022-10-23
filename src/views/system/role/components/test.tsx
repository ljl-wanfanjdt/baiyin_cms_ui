const renderDom = (props: any, context: any) => {
  // 注意点：在tsx之中 不会自动读写 X.value
  const handleClick = () => {
    // emit?.value('changeTest', 6)
    context.emit('changeTest', 'test')
  }
  return (
    <div>
      <div>我是hahha</div>
      <button onClick={handleClick}>发送</button>
    </div>
  )
}
export default renderDom
