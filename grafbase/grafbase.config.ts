import { g, config } from '@grafbase/sdk'

g.query('instruct', {
  args: {
    prompt: g.string()
  },
  returns: g.string(),
  resolver: 'query/instruct'
})

export default config({
  schema: g,
  // experimental: {
  //   kv: true
  // }
})
